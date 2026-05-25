package br.com.fixit.service;

import br.com.fixit.dto.CreateTicketRequest;
import br.com.fixit.dto.TicketResponse;
import br.com.fixit.dto.UpdateTicketStatusRequest;
import br.com.fixit.exception.ApiException;
import br.com.fixit.model.AppUser;
import br.com.fixit.model.Role;
import br.com.fixit.model.Ticket;
import br.com.fixit.model.TicketStatus;
import br.com.fixit.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> list(AppUser user) {
        List<Ticket> tickets = user.getRole() == Role.USER
                ? ticketRepository.findByRequesterOrderByCreatedAtDesc(user)
                : ticketRepository.findAllByOrderByCreatedAtDesc();

        return tickets.stream().map(TicketResponse::from).toList();
    }

    @Transactional
    public TicketResponse create(AppUser requester, CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.title().trim());
        ticket.setCategory(request.category().trim());
        ticket.setDescription(request.description().trim());
        ticket.setRequester(requester);
        ticket.setStatus(TicketStatus.OPEN);

        return TicketResponse.from(ticketRepository.save(ticket));
    }

    @Transactional
    public void delete(AppUser user, Long id) {
        Ticket ticket = findTicket(id);
        boolean ownsTicket = ticket.getRequester().getId().equals(user.getId());

        if (!ownsTicket && !user.isAdmin()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Apenas o solicitante ou admin pode excluir este chamado.");
        }

        ticketRepository.delete(ticket);
    }

    @Transactional
    public TicketResponse assignToSelf(AppUser user, Long id) {
        requireSupportStaff(user);
        Ticket ticket = findTicket(id);

        if (ticket.getTechnician() != null && !ticket.getTechnician().getId().equals(user.getId()) && !user.isAdmin()) {
            throw new ApiException(HttpStatus.CONFLICT, "Chamado ja atribuido a outro tecnico.");
        }

        ticket.setTechnician(user);
        if (ticket.getStatus() == TicketStatus.OPEN) {
            ticket.setStatus(TicketStatus.IN_PROGRESS);
        }

        return TicketResponse.from(ticket);
    }

    @Transactional
    public TicketResponse updateStatus(AppUser user, Long id, UpdateTicketStatusRequest request) {
        requireSupportStaff(user);
        Ticket ticket = findTicket(id);

        if (!user.isAdmin() && (ticket.getTechnician() == null || !ticket.getTechnician().getId().equals(user.getId()))) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Autoatribua o chamado antes de alterar o status.");
        }

        ticket.setStatus(request.status());
        return TicketResponse.from(ticket);
    }

    private Ticket findTicket(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Chamado nao encontrado."));
    }

    private void requireSupportStaff(AppUser user) {
        if (!user.isSupportStaff()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Apenas tecnico ou admin pode executar esta acao.");
        }
    }
}
