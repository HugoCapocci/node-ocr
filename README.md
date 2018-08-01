OCR using nodeJS
================

Requirements
------------

Before anything, you need the following software installed on your machine:

  * [Node](https://nodejs.org/en/download/current/) >= 8 && < 9
  * [Docker](https://docs.docker.com/engine/installation/)
  * [Docker Compose](https://docs.docker.com/compose/install/) >= 1.8
  * [Yarn](https://yarnpkg.com/en/docs/install)


If you encounter sudo issue with docker, please refer to this link: https://github.com/sindresorhus/guides/blob/master/docker-without-sudo.md.


Project installation
--------------------
To install the project, you must at first clone the code repository:

```bash
  git clone git@github.com:HugoCapocci/node-ocr.git
```

Then, build docker image containing [tesseract](https://github.com/tesseract-ocr/tesseract), an Open Source OCR Engine

```bash
  cd node-ocr
  docker-compose up
```

While docker is running, in another terminal tab you can run the tests

```bash
  yarn test
```

