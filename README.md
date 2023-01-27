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