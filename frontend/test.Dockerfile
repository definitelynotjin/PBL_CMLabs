FROM alpine
WORKDIR /app
COPY package.json ./
RUN ls -l /app
RUN cat package.json
