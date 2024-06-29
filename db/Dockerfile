FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=PublicationDB
ENV MYSQL_DATABASE=PublicationDB

COPY PublicationDB.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
