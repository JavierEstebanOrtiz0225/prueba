FROM node:10.16.0
WORKDIR /opt/app
RUN npm install
COPY . .
EXPOSE  3001:3001
CMD tail -f /dev/null