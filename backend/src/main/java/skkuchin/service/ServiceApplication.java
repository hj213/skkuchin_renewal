package skkuchin.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Role;
import skkuchin.service.service.*;


@EnableScheduling
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
	CommandLineRunner run(UserService userService,
						  TagService tagService,
						  PlaceService placeService,
						  ImageService imageService,
						  MenuService menuService,
						  KeywordService keywordService,
						  ReviewService reviewService) {
		return args -> {

			//userService.saveRole(new Role(null, "ROLE_USER"));
			//userService.saveRole(new Role(null, "ROLE_ADMIN"));
			userService.saveRole(Role.builder().name("ROLE_USER").build());
			userService.saveRole(Role.builder().name("ROLE_ADMIN").build());

			//admin 계정 생성
			userService.saveAdmin(new UserDto.SignUpForm("스꾸친관리자", "admin", "12341234", "12341234",  16, Major.경영학과));

			//test 계정 생성
			userService.saveTestUser(new UserDto.SignUpForm("테스트", "test", "12341234", "12341234", 20, Major.건축학과));
			//데이터 자동 주입
			//String path = System.getProperty("user.dir") + "\\src\\main\\java\\skkuchin\\service\\data\\";
			String path = System.getProperty("user.dir") + "/src/main/java/skkuchin/service/data/"; //Mac 공통 경로

			//tagService.insertData(path);
			//placeService.insertData(path);
			//imageService.insertData(path);
			//menuService.insertData(path);
			//keywordService.insertData(path);


			try {
				tagService.insertData(path);
				placeService.insertData(path);
				imageService.insertData();
				menuService.insertData(path);
				keywordService.insertData(path);
				reviewService.insertData(path);
			} catch (Exception e) {
				System.out.println(e);
			}

		};
	}
}
