FROM node:latest

RUN apt-get update

# Note: npm is v2.7.6
RUN npm install -g ember-cli@0.2.7
RUN npm install -g bower@1.4.1

RUN apt-get install -y libgtk-3-dev \
  && wget --no-verbose https://ftp.mozilla.org/pub/firefox/releases/56.0/linux-x86_64/en-US/firefox-56.0.tar.bz2 \
  && tar -xjf firefox-56.0.tar.bz2 \
  && mv firefox /opt/firefox56 \
  && ln -s /opt/firefox56/firefox /usr/bin/firefox

# install watchman
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.1 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

ADD . /app

WORKDIR /app

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN npm install
RUN bower install --allow-root

EXPOSE "35729" "4200"
