FROM nginx:latest

RUN apt-get update -y \
    && apt-get install -y python-pip \
    && pip install j2cli

COPY nginx.tmpl /nginx.tmpl
COPY run.sh /run.sh
RUN chmod +x /run.sh

CMD /run.sh

EXPOSE 80