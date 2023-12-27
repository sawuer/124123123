FROM nginx
RUN rm -rf /docker-entrypoint.sh && \
    mkdir -p /opt/dit/web/front/ /etc/nginx
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY dist /opt/dit/docs/api-docs/
RUN chown -R nginx:nginx /opt
WORKDIR /opt/dit/web/front/
ENTRYPOINT ["nginx", "-g", "daemon off;"]