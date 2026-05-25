package br.com.fixit.dto;

import br.com.fixit.model.Ticket;
import br.com.fixit.model.TicketStatus;

import java.time.Instant;

public record TicketResponse(
        Long id,
        String title,
        String description,
        String category,
        TicketStatus status,
        UserSummary requester,
        UserSummary technician,
        Instant createdAt,
        Instant updatedAt
) {
    public static TicketResponse from(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getStatus(),
                UserSummary.from(ticket.getRequester()),
                ticket.getTechnician() == null ? null : UserSummary.from(ticket.getTechnician()),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt()
        );
    }
}
