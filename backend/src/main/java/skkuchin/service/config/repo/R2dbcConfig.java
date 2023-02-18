package skkuchin.service.config.repo;

import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.ConnectionFactoryOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
import org.springframework.r2dbc.connection.R2dbcTransactionManager;
import org.springframework.transaction.ReactiveTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableR2dbcRepositories(basePackages = "skkuchin.service.r2dbcRepo")
public class R2dbcConfig {

    @Autowired
    private Environment env;

    @Bean
    public ConnectionFactory connectionFactory() {
        ConnectionFactoryOptions options = ConnectionFactoryOptions.builder()
                .option(ConnectionFactoryOptions.DRIVER, "mysql")
                .option(ConnectionFactoryOptions.HOST, env.getProperty("spring.r2dbc.host"))
                .option(ConnectionFactoryOptions.PORT, 3306)
                .option(ConnectionFactoryOptions.USER, env.getProperty("spring.r2dbc.username"))
                .option(ConnectionFactoryOptions.PASSWORD, env.getProperty("spring.r2dbc.password"))
                .option(ConnectionFactoryOptions.DATABASE, env.getProperty("spring.r2dbc.database"))
                .build();
        return ConnectionFactories.get(options);
    }

    @Bean
    ReactiveTransactionManager r2dbcTransactionManager(ConnectionFactory connectionFactory) {
        return new R2dbcTransactionManager(connectionFactory);
    }
}
