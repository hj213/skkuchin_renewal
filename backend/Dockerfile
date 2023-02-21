FROM openjdk:11.0.11-jre-slim

# RUN apt-get update && apt-get install -y locales
# RUN dpkg-reconfigure locales && echo "ko_KR.UTF-8 UTF-8" >> /etc/locale.gen && locale-gen ko_KR.UTF-8 && update-locale LANG=ko_KR.UTF-8

# ENV LANG ko_KR.UTF-8
# ENV LANGUAGE ko_KR.UTF-8

ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]