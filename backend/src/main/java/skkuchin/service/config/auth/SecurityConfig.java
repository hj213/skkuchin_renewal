package skkuchin.service.config.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import skkuchin.service.filter.CustomAuthenticationFilter;
import skkuchin.service.filter.CustomAuthorizationFilter;
import skkuchin.service.repo.UserRepo;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private static final String[] PERMIT_API_URL_ARRAY = {
            "/api/user/login",
            "/api/user/save",
            "/api/user/token/**",
            "/api/user/check/**",
            "/api/user/find/**",
            "/api/user/password/reset",
            "/api/email/**",
    };
    private static final String[] PERMIT_CHAT_URL_ARRAY = {
            "/chat/**",
            "/ws/**"
    };
    private static final String[] PERMIT_SWAGGER_URL_ARRAY = {
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };
    private final UserRepo userRepo;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests()
                .antMatchers(PERMIT_API_URL_ARRAY).permitAll()
                .antMatchers(PERMIT_CHAT_URL_ARRAY).permitAll()
                .antMatchers(PERMIT_SWAGGER_URL_ARRAY).permitAll()
                .anyRequest().authenticated();
        http.apply(new MyCustomDsl());
        return http.build();
    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            CustomAuthenticationFilter authenticationFilter = new CustomAuthenticationFilter(authenticationManager);
            authenticationFilter.setFilterProcessesUrl("/api/user/login");
            builder
                    .addFilter(authenticationFilter)
                    .addFilterBefore(new CustomAuthorizationFilter(userRepo), UsernamePasswordAuthenticationFilter.class);
        }
    }
}
