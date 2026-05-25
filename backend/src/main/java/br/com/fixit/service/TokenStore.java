package br.com.fixit.service;

import br.com.fixit.model.AppUser;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenStore {

    private final Map<String, SessionData> sessions = new ConcurrentHashMap<>();

    public String create(AppUser user) {
        String token = UUID.randomUUID().toString();
        sessions.put(token, new SessionData(user.getId(), Instant.now()));
        return token;
    }

    public Optional<Long> findUserId(String token) {
        return Optional.ofNullable(sessions.get(token)).map(SessionData::userId);
    }

    private record SessionData(Long userId, Instant createdAt) {
    }
}
