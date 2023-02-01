package skkuchin.admin.config;

import de.codecentric.boot.admin.server.config.AdminServerProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AdminServerProperties adminServer;

    public SecurityConfig(AdminServerProperties adminServer) {
        this.adminServer = adminServer;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
        successHandler.setTargetUrlParameter("redirectTo");
        successHandler.setDefaultTargetUrl(this.adminServer.path("/"));

        http.authorizeRequests()
                // 모든 로그인 페이지에 대한 권한을 부여한다.
                .antMatchers(this.adminServer.path("/assets/**")).permitAll()
                .antMatchers(this.adminServer.path("/login")).permitAll()
                // 권한이 부여되지 않으면 인증을 요청 한다.
                .anyRequest().authenticated()
                .and()
                // 로그인 및 로그 아웃을 구성한다.
                .formLogin().loginPage(this.adminServer.path("/login")).successHandler(successHandler).and()
                .logout().logoutUrl(this.adminServer.path("/logout")).and()
                // Spring Boot Admin 클라이언트를 등록하기 위해 HTTP-Basic 지원을 사용한다.
                .httpBasic().and()
                .csrf()
                // 쿠키를 사용하여 CSRF 보호 기능 구현
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringAntMatchers(
                        // CRSF를 비활성화한다.
                        this.adminServer.path("/instances"),
                        // actuator EndPoint 대한 CRSF 보호를 비활성화한다.
                        this.adminServer.path("/actuator/**")
                );

    }
}
