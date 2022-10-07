package skkuchin.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import skkuchin.service.domain.AppUser;
import skkuchin.service.domain.Role;
import skkuchin.service.service.UserService;

import java.util.ArrayList;

@SpringBootApplication
public class ServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceApplication.class, args);
	}


	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {

			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));
/*
			userService.saveUser(new AppUser(null, "yejin", "syj0396", "1234", new ArrayList<>()));
			userService.saveUser(new AppUser(null, "admin", "admin", "1234", new ArrayList<>()));


			userService.addRoleToUser("syj0396", "ROLE_USER");
			userService.addRoleToUser("admin", "ROLE_USER");
			userService.addRoleToUser("admin", "ROLE_ADMIN");*/
		};
	}
}
