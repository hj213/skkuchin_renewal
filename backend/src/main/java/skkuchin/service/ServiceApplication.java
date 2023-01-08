package skkuchin.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import skkuchin.service.api.dto.SignUpForm;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;
import skkuchin.service.domain.User.Role;
import skkuchin.service.service.ReviewKeywordService;
import skkuchin.service.service.UserService;

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
	CommandLineRunner run(UserService userService, ReviewKeywordService reviewKeywordService) {
		return args -> {

			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));

			//admin 계정 생성
			userService.saveAdmin(new SignUpForm("admin", "admin", "12341234", "12341234", "test@test", "0000000000", Major.건축학과, "img", true, Mbti.ENTP));

			//데이터 자동 주입
			String path = System.getProperty("user.dir") + "\\src\\main\\java\\skkuchin\\service\\data\\"; //공통 경로
			reviewKeywordService.insertData(path);

		};
	}
}
