FROM python:3.7-alpine
RUN adduser -D craigslist-tracker-api
WORKDIR /home/craigslist-tracker-api

COPY requirements.txt requirements.txt
RUN python -m venv venv

RUN apk --update add python py-pip openssl ca-certificates py-openssl wget
RUN apk --update add --virtual build-dependencies libffi-dev openssl-dev python-dev py-pip build-base \
  && venv/bin/pip install --upgrade pip \
  && venv/bin/pip install -r requirements.txt \
  && apk del build-dependencies

COPY app app
COPY trackerapi.py config.py mongoflask.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP trackerapi.py

RUN chown -R craigslist-tracker-api:craigslist-tracker-api ./
USER craigslist-tracker-api

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]