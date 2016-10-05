FROM node:latest

# Note: npm is v2.7.6
RUN npm install -g ember-cli@0.2.7
RUN npm install -g bower@1.4.1
RUN npm install -g phantomjs@1.9.16

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
