FROM lpicanco/java11-alpine
CMD ["./gradlew", "clean", "build", "-x", "test"]
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]