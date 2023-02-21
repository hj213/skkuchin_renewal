FROM nginx:1.13.9-alpine

COPY ./config/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]