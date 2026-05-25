package br.com.fixit.controller;

import br.com.fixit.dto.CreateTicketRequest;
import br.com.fixit.dto.TicketResponse;
import br.com.fixit.dto.UpdateTicketStatusRequest;
import br.com.fixit.model.AppUser;
import br.com.fixit.service.AuthService;
import br.com.fixit.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final AuthService authService;
    private final TicketService ticketService;

    public TicketController(AuthService authService, TicketService ticketService) {
        this.authService = authService;
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<TicketResponse> list(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization
    ) {
        AppUser user = authService.requireUser(authorization);
        return ticketService.list(user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TicketResponse create(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @Valid @RequestBody CreateTicketRequest request
    ) {
        AppUser user = authService.requireUser(authorization);
        return ticketService.create(user, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @PathVariable Long id
    ) {
        AppUser user = authService.requireUser(authorization);
        ticketService.delete(user, id);
    }

    @PatchMapping("/{id}/assign")
    public TicketResponse assignToSelf(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @PathVariable Long id
    ) {
        AppUser user = authService.requireUser(authorization);
        return ticketService.assignToSelf(user, id);
    }

    @PatchMapping("/{id}/status")
    public TicketResponse updateStatus(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @PathVariable Long id,
            @Valid @RequestBody UpdateTicketStatusRequest request
    ) {
        AppUser user = authService.requireUser(authorization);
        return ticketService.updateStatus(user, id, request);
    }
}
