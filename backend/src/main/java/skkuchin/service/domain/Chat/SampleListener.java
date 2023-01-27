package skkuchin.service.domain.Chat;

import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.amqp.core.Message;


import java.util.logging.Logger;

@Component
public class SampleListener {

    @RabbitListener(queues = "sample.queue")
    public void reciveMessage(ChatMessage message) {
        /*System.out.println("message.getMessage() = " + message.getMessageProperties());
        System.out.println("message.hashCode() = " + message.hashCode());*/
        System.out.println("message.getMessage() = " + message.getMessage());

    }
}
