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

RUN chown -R craigslist-scraper:craigslist-scraper ./
COPY cronscript.sh /etc/periodic/15min/craigslist-scraper
RUN chown -R craigslist-scraper:craigslist-scraper /etc/periodic/15min/
RUN touch /var/log/scraper-cron.log
RUN chown craigslist-scraper:craigslist-scraper /var/log/scraper-cron.log

USER craigslist-scraper

RUN chmod +x /etc/periodic/15min/craigslist-scraper

CMD [ "crond", "-l", "2", "-f" ]