package br.com.fixit.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(max = 80) String name,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank @Size(min = 6, max = 80) String password
) {
}
