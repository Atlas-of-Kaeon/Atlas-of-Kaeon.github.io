#!/bin/bash

ARM=$(uname -m)

if which node > /dev/null
	then
		echo "node is installed, skipping..."
	else
		if [ $ARM == "armv6l" ]
			then
				wget https://nodejs.org/dist/v11.15.0/node-v11.15.0-linux-armv6l.tar.xz
				tar -xJf node-v11.15.0-linux-armv6l.tar.xz
				sudo cp -r node-v11.15.0-linux-armv6l/* /usr/local/
				rm -r node-v11.15.0-linux-armv6l
				rm node-v11.15.0-linux-armv6l.tar.xz
			else
				sudo apt-get update
				sudo apt-get install nodejs
			fi
	fi