FROM registry01.idc-sginfra.net/public-images/node:16.20.0

LABEL EMAIL=sgvn_fe_dev_t@smilegate.com

USER root

RUN mkdir -p /stove/deploy/{project} /stove/logs /stove/apps

ADD .output/ /stove/deploy/{project}

WORKDIR /stove/deploy/{project}

CMD [ "node", "server/index.mjs" ]
