package br.com.fixit.controller;

import br.com.fixit.dto.AuthResponse;
import br.com.fixit.dto.LoginRequest;
import br.com.fixit.dto.RegisterRequest;
import br.com.fixit.dto.UserSummary;
import br.com.fixit.model.AppUser;
import br.com.fixit.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserSummary me(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
        AppUser user = authService.requireUser(authorization);
        return UserSummary.from(user);
    }
}
