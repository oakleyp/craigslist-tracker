FROM python:3.7-alpine
RUN adduser -D craigslist-scraper
WORKDIR /home/craigslist-scraper

COPY requirements.txt requirements.txt
RUN python -m venv venv

RUN apk --update add python py-pip openssl ca-certificates py-openssl wget
RUN apk --update add --virtual build-dependencies libffi-dev openssl-dev python-dev py-pip build-base \
  && venv/bin/pip install --upgrade pip \
  && venv/bin/pip install -r requirements.txt \
  && apk del build-dependencies

COPY craigslist-scraper.py craigslist-scraper.py
COPY cronscript.sh cronscript.sh
COPY scraper-cron.txt scraper-cron.txt
COPY entry.sh entry.sh
RUN /usr/bin/crontab scraper-cron.txt

RUN chown -R craigslist-scraper:craigslist-scraper ./
RUN touch /var/log/scraper-cron.log
RUN chown craigslist-scraper:craigslist-scraper /var/log/scraper-cron.log
RUN chmod a+x entry.sh cronscript.sh craigslist-scraper.py

CMD [ "./entry.sh" ]