# skkuchin_renewal

## 스프링 빌드
1. backend 폴더로 이동
2. 맥의 경우 ./gradlew clean build -x test 입력
3. 윈도우의 경우 gradlew.bat clean build -x test 입력

<br>

## 도커 실행
1. root 위치
2. docker-compose -f docker-compose.chat.yml up --build

<br>

## 실시간 감지 켜기
1. 백엔드 초기 데이터 주입 시작됐을 때
2. root 위치에서
3. curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mysql.json 실행

<br>

## 도커 종료
1. root 위치
2. docker volume prune -f && docker image prune -f && docker-compose -f docker-compose.chat.yml down

<br>

## 백엔드 스프링 따로 실행시 도커 실행
1. root 위치
2. docker-compose -f docker-compose.spring.yml up --build

<br>

## 백엔드 스프링 따로 실행시 실시간 감지 켜기
1. 백엔드 초기 데이터 주입 시작됐을 때
2. root 위치에서
3. curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mysql-backend.json 실행

<br>

## 백엔드 스프링 따로 실행시 도커 종료
1. root 위치
2. docker volume prune -f && docker image prune -f && docker-compose -f docker-compose.spring.yml down