FROM nginx:alpine


## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*


ADD . /usr/share/nginx/html
RUN cp /usr/share/nginx/html/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
