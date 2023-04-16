#!/bin/bash

sudo curl -s -L https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/2%20-%20Hardware/2%20-%20GHI/1%20-%20Source/4%20-%20Scripts/install-node-linux.sh | bash
sudo npm install -g ghi-server

if [$1 == "enable"]
	then
		sudo ghi enable
	fi