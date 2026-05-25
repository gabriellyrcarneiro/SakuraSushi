package br.com.fixit;

import br.com.fixit.dto.AuthResponse;
import br.com.fixit.dto.CreateTicketRequest;
import br.com.fixit.dto.LoginRequest;
import br.com.fixit.dto.TicketResponse;
import br.com.fixit.dto.UpdateTicketStatusRequest;
import br.com.fixit.model.TicketStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class FixitApplicationTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @LocalServerPort
    private int port;

    @Test
    void contextLoads() {
    }

    @Test
    void userCreatesTicketAndTechnicianHandlesIt() throws Exception {
        AuthResponse userAuth = login("usuario@fixit.com", "usuario123");
        HttpHeaders userHeaders = bearerHeaders(userAuth.token());

        CreateTicketRequest createRequest = new CreateTicketRequest(
                "Impressora sem papel",
                "Hardware",
                "A impressora do financeiro nao reconhece a bandeja."
        );

        ResponseEntity<TicketResponse> createResponse = restTemplate.exchange(
                "/api/tickets",
                HttpMethod.POST,
                new HttpEntity<>(createRequest, userHeaders),
                TicketResponse.class
        );

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(createResponse.getBody()).isNotNull();
        assertThat(createResponse.getBody().status()).isEqualTo(TicketStatus.OPEN);

        Long ticketId = createResponse.getBody().id();
        HttpResponse<String> forbiddenAssign = patch("/api/tickets/" + ticketId + "/assign", userAuth.token(), null);

        assertThat(forbiddenAssign.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());

        AuthResponse technicianAuth = login("tecnico@fixit.com", "tecnico123");
        HttpResponse<String> assignResponse = patch("/api/tickets/" + ticketId + "/assign", technicianAuth.token(), null);

        assertThat(assignResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
        TicketResponse assignedTicket = objectMapper.readValue(assignResponse.body(), TicketResponse.class);
        assertThat(assignedTicket.technician().email()).isEqualTo("tecnico@fixit.com");
        assertThat(assignedTicket.status()).isEqualTo(TicketStatus.IN_PROGRESS);

        UpdateTicketStatusRequest statusRequest = new UpdateTicketStatusRequest(TicketStatus.RESOLVED);
        HttpResponse<String> statusResponse = patch("/api/tickets/" + ticketId + "/status", technicianAuth.token(), statusRequest);

        assertThat(statusResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
        TicketResponse resolvedTicket = objectMapper.readValue(statusResponse.body(), TicketResponse.class);
        assertThat(resolvedTicket.status()).isEqualTo(TicketStatus.RESOLVED);
    }

    private AuthResponse login(String email, String password) {
        ResponseEntity<AuthResponse> response = restTemplate.postForEntity(
                "/api/auth/login",
                new LoginRequest(email, password),
                AuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        return response.getBody();
    }

    private HttpHeaders bearerHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return headers;
    }

    private HttpResponse<String> patch(String path, String token, Object body) {
        try {
            String jsonBody = body == null ? "" : objectMapper.writeValueAsString(body);
            HttpRequest.BodyPublisher bodyPublisher = body == null
                    ? HttpRequest.BodyPublishers.noBody()
                    : HttpRequest.BodyPublishers.ofString(jsonBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:" + port + path))
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .header(HttpHeaders.CONTENT_TYPE, "application/json")
                    .method("PATCH", bodyPublisher)
                    .build();

            return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception exception) {
            throw new IllegalStateException("Falha ao executar PATCH no teste.", exception);
        }
    }
}
