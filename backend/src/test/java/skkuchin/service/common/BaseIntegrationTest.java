package skkuchin.service.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Ignore;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

@SpringBootTest
//@Disabled
@AutoConfigureMockMvc
@Transactional
@Ignore
public class BaseIntegrationTest { //통합 테스트의 부모 클래스
    @Autowired
    protected MockMvc mvc;
    @Autowired
    protected ObjectMapper objectMapper;
}
