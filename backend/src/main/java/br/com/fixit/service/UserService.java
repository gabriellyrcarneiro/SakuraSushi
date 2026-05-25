package br.com.fixit.service;

import br.com.fixit.dto.UserSummary;
import br.com.fixit.exception.ApiException;
import br.com.fixit.model.AppUser;
import br.com.fixit.repository.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final AppUserRepository userRepository;

    public UserService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserSummary> listAll(AppUser currentUser) {
        if (!currentUser.isAdmin()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Apenas admins podem listar usuarios.");
        }

        return userRepository.findAll().stream()
                .map(UserSummary::from)
                .toList();
    }
}
