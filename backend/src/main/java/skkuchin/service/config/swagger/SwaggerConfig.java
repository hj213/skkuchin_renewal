package skkuchin.service.config.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.*;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket apiV0(){
        return new Docket(DocumentationType.OAS_30)
                .useDefaultResponseMessages(false)
                .ignoredParameterTypes(AuthenticationPrincipal.class)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .securityContexts(Arrays.asList(securityContext())) // swagger에서 jwt 토큰값 넣기위한 설정
                .securitySchemes(Arrays.asList(apiKey())) // swagger에서 jwt 토큰값 넣기위한 설정
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .groupName("user")
                .select()
                .apis(RequestHandlerSelectors.
                        basePackage("skkuchin.service.api.controller"))
                .paths(PathSelectors.ant("/api/user/**"))
                .build();
    }

    @Bean
    public Docket apiV1(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .securityContexts(Arrays.asList(securityContext())) // swagger에서 jwt 토큰값 넣기위한 설정
            .securitySchemes(Arrays.asList(apiKey())) // swagger에서 jwt 토큰값 넣기위한 설정
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("email")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/email/**"))
            .build();
    }

    @Bean
    public Docket apiV2(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("review")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/review/**")).build();
    }

    @Bean
    public Docket apiV3(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("place")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/place/**")).build();
    }

    @Bean
    public Docket apiV4(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("menu")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/menu/**")).build();
    }

    @Bean
    public Docket apiV5(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("image")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/image/**")).build();
    }

    @Bean
    public Docket apiV6(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("favorite")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/favorite/**")).build();
    }

    @Bean
    public Docket apiV7(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("tag")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/tag/**")).build();
    }

    @Bean
    public Docket apiV8(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("matching")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/matching/**")).build();
    }

    @Bean
    public Docket apiV9(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("candidate")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/api/candidate/**")).build();
    }

    @Bean
    public Docket apiV10(){
        return new Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .groupName("chat")
            .select()
            .apis(RequestHandlerSelectors.
                    basePackage("skkuchin.service.api.controller"))
            .paths(PathSelectors.ant("/chat/**")).build();
    }

    @Bean
    public Docket apiV11(){
        return new Docket(DocumentationType.OAS_30)
                .useDefaultResponseMessages(false)
                .ignoredParameterTypes(AuthenticationPrincipal.class)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .groupName("report")
                .select()
                .apis(RequestHandlerSelectors.
                        basePackage("skkuchin.service.api.controller"))
                .paths(PathSelectors.ant("/api/report/**")).build();
    }

        @Bean
    public Docket apiV12(){
        return new Docket(DocumentationType.OAS_30)
                .useDefaultResponseMessages(false)
                .ignoredParameterTypes(AuthenticationPrincipal.class)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .groupName("appointment")
                .select()
                .apis(RequestHandlerSelectors.
                        basePackage("skkuchin.service.api.controller"))
                .paths(PathSelectors.ant("/api/appointment/**")).build();
    }

    // swagger에서 jwt 토큰값 넣기위한 설정
    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("multipart/form-data");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }
}

