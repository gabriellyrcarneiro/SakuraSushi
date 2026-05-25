package br.com.fixit.service;

import br.com.fixit.dto.AuthResponse;
import br.com.fixit.dto.LoginRequest;
import br.com.fixit.dto.RegisterRequest;
import br.com.fixit.dto.UserSummary;
import br.com.fixit.exception.ApiException;
import br.com.fixit.model.AppUser;
import br.com.fixit.model.Role;
import br.com.fixit.repository.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {

    private final AppUserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final TokenStore tokenStore;

    public AuthService(
            AppUserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            TokenStore tokenStore
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenStore = tokenStore;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "Ja existe um usuario com este email.");
        }

        AppUser user = new AppUser();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);

        AppUser savedUser = userRepository.save(user);
        return createSession(savedUser);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        AppUser user = userRepository.findByEmailIgnoreCase(normalizeEmail(request.email()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Email ou senha invalidos."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Email ou senha invalidos.");
        }

        return createSession(user);
    }

    @Transactional(readOnly = true)
    public AppUser requireUser(String authorizationHeader) {
        String token = readBearerToken(authorizationHeader);
        Long userId = tokenStore.findUserId(token)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Sessao invalida ou expirada."));

        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Usuario da sessao nao encontrado."));
    }

    private AuthResponse createSession(AppUser user) {
        String token = tokenStore.create(user);
        return new AuthResponse(token, UserSummary.from(user));
    }

    private String readBearerToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Informe o token de autenticacao.");
        }
        return authorizationHeader.substring("Bearer ".length()).trim();
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
