FROM openjdk:11.0.11-jre-slim
ARG JAR_FILE=./build/libs/service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENV TZ=Asia/Seoul
EXPOSE 8080
ENTRYPOINT ["java", "-Duser.timezone=${TZ}", "-jar", "/app.jar"]