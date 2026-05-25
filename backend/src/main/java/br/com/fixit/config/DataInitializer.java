package br.com.fixit.config;

import br.com.fixit.model.AppUser;
import br.com.fixit.model.Role;
import br.com.fixit.model.Ticket;
import br.com.fixit.repository.AppUserRepository;
import br.com.fixit.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDatabase(
            AppUserRepository userRepository,
            TicketRepository ticketRepository,
            BCryptPasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (userRepository.count() > 0) {
                return;
            }

            AppUser user = createUser("Usuario Demo", "usuario@fixit.com", "usuario123", Role.USER, passwordEncoder);
            AppUser technician = createUser("Tecnico Demo", "tecnico@fixit.com", "tecnico123", Role.TECHNICIAN, passwordEncoder);
            AppUser admin = createUser("Admin FixIt", "admin@fixit.com", "admin123", Role.ADMIN, passwordEncoder);

            userRepository.save(user);
            userRepository.save(technician);
            userRepository.save(admin);

            Ticket firstTicket = new Ticket();
            firstTicket.setTitle("Notebook nao liga");
            firstTicket.setCategory("Hardware");
            firstTicket.setDescription("O equipamento nao liga apos queda de energia.");
            firstTicket.setRequester(user);

            Ticket secondTicket = new Ticket();
            secondTicket.setTitle("Erro ao acessar sistema financeiro");
            secondTicket.setCategory("Software");
            secondTicket.setDescription("Usuario recebe mensagem de credenciais invalidas mesmo apos redefinir a senha.");
            secondTicket.setRequester(user);
            secondTicket.setTechnician(technician);

            ticketRepository.save(firstTicket);
            ticketRepository.save(secondTicket);
        };
    }

    private AppUser createUser(
            String name,
            String email,
            String password,
            Role role,
            BCryptPasswordEncoder passwordEncoder
    ) {
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(role);
        return user;
    }
}
