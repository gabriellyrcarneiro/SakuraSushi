package br.com.fixit.dto;

public record AuthResponse(String token, UserSummary user) {
}
