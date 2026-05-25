package br.com.fixit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateTicketRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 60) String category,
        @NotBlank @Size(max = 1200) String description
) {
}
