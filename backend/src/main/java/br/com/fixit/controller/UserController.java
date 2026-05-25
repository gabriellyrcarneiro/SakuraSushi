package br.com.fixit.controller;

import br.com.fixit.dto.UserSummary;
import br.com.fixit.model.AppUser;
import br.com.fixit.service.AuthService;
import br.com.fixit.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping
    public List<UserSummary> listAll(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization
    ) {
        AppUser user = authService.requireUser(authorization);
        return userService.listAll(user);
    }
}
