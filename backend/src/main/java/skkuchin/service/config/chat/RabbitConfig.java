package skkuchin.service.config.chat;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.SimpleRoutingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import software.amazon.awssdk.regions.Region;

@Configuration
@RequiredArgsConstructor
@EnableRabbit
public class RabbitConfig {

    private static final String CHAT_QUEUE_NAME = "chat.queue";
    private static final String CHAT_EXCHANGE_NAME = "chat.exchange";
    private static final String ROUTING_KEY = "room.*";

    @Value("${rabbitmq.host}")
    private String host;
    @Value("${rabbitmq.port}")
    private int port;
    @Value("${rabbitmq.username}")
    private String username;
    @Value("${rabbitmq.password}")
    private String password;

    @Bean
    public Queue queue(){ return new Queue(CHAT_QUEUE_NAME, true); }


    @Bean
    public TopicExchange exchange(){ return new TopicExchange(CHAT_EXCHANGE_NAME); }


    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }


    @Bean
    public RabbitTemplate rabbitTemplate(){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        rabbitTemplate.setRoutingKey(CHAT_QUEUE_NAME);
        return rabbitTemplate;
    }

    @Bean
    public SimpleMessageListenerContainer container(){
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory());
        container.setQueueNames(CHAT_QUEUE_NAME);
        /*container.setMessageListener(null);*/
        return container;
    }


    @Bean
    public ConnectionFactory connectionFactory(){
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setHost(host);
        factory.setPort(port);
        factory.setUsername(username);
        factory.setPassword(password);
        return factory;
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter(){
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
        objectMapper.registerModule(dateTimeModule());

        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter(objectMapper);

        return converter;
    }

    @Bean
    public Module dateTimeModule(){
        return new JavaTimeModule();
    }
}