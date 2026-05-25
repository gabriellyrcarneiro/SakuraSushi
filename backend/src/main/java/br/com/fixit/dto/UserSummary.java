package br.com.fixit.dto;

import br.com.fixit.model.AppUser;
import br.com.fixit.model.Role;

public record UserSummary(Long id, String name, String email, Role role) {
    public static UserSummary from(AppUser user) {
        return new UserSummary(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
