#!/bin/sh

REPOSITORY=<repo>-$(node -e "console.log(require('./package.json').name)")
TAG=$(git describe --tags $(git rev-list --tags --max-count=1))

docker login -e $DOCKER_EMAIL -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t $REPOSITORY:$TAG .
docker push $REPOSITORY:$TAG
