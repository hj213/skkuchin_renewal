FROM redis:alpine

LABEL name="redis"
LABEL mode="standalone"

# Enable memory overcommit
RUN echo "vm.overcommit_memory = 1" >> /etc/sysctl.conf

# Increase maximum number of open files
RUN ulimit -n 10032

EXPOSE 6379

ENTRYPOINT ["redis-server", "--port", "6379"]