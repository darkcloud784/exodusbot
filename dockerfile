FROM node:16-alpine
RUN apk update && apk add make g++ git
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN mkdir -p /app/exodusbot
WORKDIR /app/exodusbot
COPY package.json /app/exodusbot
RUN npm install
COPY . /app/exodusbot
CMD ["node", "index.js"]