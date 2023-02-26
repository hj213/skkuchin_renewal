# skkuchin_renewal

## 도커 실행 (도커 설치 전제)
1. root 위치
2. docker-compose up --build 입력

<br>

## 도커 종료
1. 다른 터미널 창 켜기
2. docker volume prune -f && docker image prune -f && docker-compose down 입력

<br>

## 도커 DB 데이터 유지
1. docker-compose.yml 파일로 이동
2. 15 - 16번째 줄 주석 풀기

<br>

## 백엔드 컨테이너만 빌드 후 재시작
- docker-compose stop server && docker-compose rm server -f && docker-compose up server -d --build && docker volume prune -f && docker image prune -f

<br>

## 프론트 컨테이너만 빌드 후 재시작
- docker-compose stop client && docker-compose rm client -f && docker-compose up client -d --build && docker volume prune -f && docker image prune -f

<br>

## 스프링 빌드
1. backend 폴더로 이동
2. ./gradlew clean build -x test 입력

<br>

## 로컬에서 실행 후 모바일 접속 원할 시
1. reducers/auth.js 주석 뒤바꾸기
2. docker-compose -f docker-compose.mobile.yml up --build

<br>

## Skkuchin API 사이트
  http://localhost:8080/swagger-ui/index.html
1. 우측 상단 원하는 카테고리 선택 (login만 지원 안 함)
2. 외부에서 획득한 토큰 복사
3. Authorize 클릭
4. Bearer 앞에 붙이고 공백과 함께 복사한 토큰 붙여넣기
    - ex) Bearer access_token
5. 원하는 api 클릭
6. try it out 클릭
7. 필요 조건 채워넣고 Execute 클릭