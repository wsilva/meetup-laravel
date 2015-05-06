FROM debian:wheezy

RUN dpkg-divert --local --rename --add /sbin/initctl && ln -sf /bin/true /sbin/initctl

ENV DEBIAN_FRONTEND noninteractive

RUN useradd -u 1000 docker && apt-get update && apt-get install -y wget && mkdir /src && chown docker:docker /src

RUN echo "deb http://packages.dotdeb.org wheezy-php55 all" > /etc/apt/sources.list.d/dotdeb.list \
    && echo "deb-src http://packages.dotdeb.org wheezy-php55 all" >> /etc/apt/sources.list.d/dotdeb.list \
    && wget -O - http://www.dotdeb.org/dotdeb.gpg |apt-key add -

RUN apt-get update && apt-get install -y git whiptail mlocate net-tools curl procps \
    php5-cli php5-fpm php5-mysql php5-intl php5-xdebug php5-recode \
    php5-snmp php5-mcrypt php5-memcache php5-imagick php5-curl php5-xsl php5-snmp \
    php5-dev php5-tidy php5-xmlrpc php5-gd php5-pspell php-pear nginx pkg-config

RUN sed -i "s/;date.timezone =/date.timezone = America\/Sao_Paulo/" /etc/php5/cli/php.ini \
    && sed -i "s/;date.timezone =/date.timezone = America\/Sao_Paulo/" /etc/php5/fpm/php.ini \
    && sed -i "s/short_open_tag = On/short_open_tag = Off/" /etc/php5/cli/php.ini \
    && sed -i "s/short_open_tag = On/short_open_tag = Off/" /etc/php5/fpm/php.ini \
    && sed -i "s/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = E_ALL/" /etc/php5/cli/php.ini \
    && sed -i "s/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = E_ALL/" /etc/php5/fpm/php.ini \
    && sed -i "s/display_errors = Off/display_errors = On/" /etc/php5/cli/php.ini \
    && sed -i "s/display_errors = Off/display_errors = On/" /etc/php5/fpm/php.ini \
    && sed -i "s/display_startup_errors = Off/display_startup_errors = On/" /etc/php5/cli/php.ini \
    && sed -i "s/display_startup_errors = Off/display_startup_errors = On/" /etc/php5/fpm/php.ini \
    && sed -i "s/www-data/docker/g" /etc/php5/fpm/pool.d/www.conf \
    && sed -i "s/www-data;/docker;\\ndaemon off;/g" /etc/nginx/nginx.conf \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/bin/composer

COPY run.sh /run.sh
RUN chmod a+x /run.sh

COPY meetup.inet.conf /etc/nginx/sites-available/meetup.inet.conf

RUN ln -sf /etc/nginx/sites-available/meetup.inet.conf /etc/nginx/sites-enabled/meetup.inet.conf

RUN apt-get clean

VOLUME ["/src"]

WORKDIR /src

EXPOSE 80

ENTRYPOINT ["/run.sh"]
