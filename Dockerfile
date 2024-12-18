FROM node:22.11.0-alpine3.20@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e

WORKDIR /workspace/

# cache dependencies
COPY ./package.json ./package-lock.json /workspace/
RUN npm ci --ignore-scripts

COPY ./main.js ./esbuild.mjs /workspace/
COPY ./src/ /workspace/src/
COPY ./test/ /workspace/test/
RUN node --test
RUN node esbuild.mjs