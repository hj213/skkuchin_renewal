# A helpful link to understand the difference between ':=' and ':' :D
# https://blog.jgc.org/2016/07/lazy-gnu-make-variables.html

build-mac:
	@echo "Build spring boot ..."
	@cd backend && ./gradlew clean build -x test
.PHONY: build-mac

build-win:
	@echo "Build spring boot ..."
	@cd backend && ./gradlew clean build -x test
.PHONY: build-win

run:
	@echo "Check the container with following hash is running properly:"
	@docker-compose -f docker-compose/dev/docker-compose.yml up --build
.PHONY: run

stop:
	@echo "Stop and remove the containers ..."
	@docker-compose -f docker-compose/dev/docker-compose.yml down
.PHONY: stop

run-client:
	@echo "Check the container with following hash is running properly:"
	@docker-compose -f docker-compose/dev/docker-compose.yml up client --build -d
.PHONY: restart-client

stop-client:
	@echo "Stop and remove the container ..."
	@docker-compose -f docker-compose/dev/docker-compose.yml down client
.PHONY: restart-client

connect:
	@echo "Kafka connect is running ..."
	@curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mysql.json
.PHONY: connect
