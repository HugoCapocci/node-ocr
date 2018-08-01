FROM ubuntu:18.04

COPY . /code

RUN apt-get update -y
RUN apt-get install -y tesseract-ocr && apt-get install -y libtesseract-dev && apt-get install -y tesseract-ocr-fra

RUN apt-get install -y nodejs

WORKDIR /code
