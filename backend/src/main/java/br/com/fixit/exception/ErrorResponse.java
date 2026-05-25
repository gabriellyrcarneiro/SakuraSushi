package br.com.fixit.exception;

import java.time.Instant;
import java.util.Map;

public record ErrorResponse(
        int status,
        String message,
        Instant timestamp,
        Map<String, String> fields
) {
    public static ErrorResponse of(int status, String message) {
        return new ErrorResponse(status, message, Instant.now(), Map.of());
    }
}
