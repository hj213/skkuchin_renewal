package skkuchin.service.config.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailAuthConfig {
    @Value("${mail.smtp.port}")
    private int port;
    @Value("${mail.transport.protocol}")
    private String protocol;
    @Value("${mail.smtp.auth}")
    private boolean auth;
    @Value("${mail.smtp.starttls.enable}")
    private boolean starttls;
    @Value("${mail.smtp.starttls.required}")
    private boolean startlls_required;
    @Value("${admin-mail.id}")
    private String id;
    @Value("${admin-mail.password}")
    private String password;

    @Bean
    public JavaMailSenderImpl getJavaMailSender() {
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", auth);
        properties.put("mail.transport.protocol", protocol);
        properties.put("mail.smtp.starttls.enable", starttls);
        properties.put("mail.smtp.starttls.required", startlls_required);
        properties.put("mail.debug", true);

        JavaMailSenderImpl emailSender = new JavaMailSenderImpl();
        emailSender.setHost("smtp.gmail.com");
        emailSender.setPort(port);
        emailSender.setUsername(id);
        emailSender.setPassword(password);
        emailSender.setDefaultEncoding("utf-8");
        emailSender.setJavaMailProperties(properties);

        return emailSender;

    }

}
