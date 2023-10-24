#!/bin/bash

# initial commands
echo "initializing apt-get"
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean

echo "install unzip"
# install unzip
sudo apt install unzip
unzip -v

#install node
echo "installing node"
sudo apt-get install -y nodejs
node -v

#install npm
echo "installing npm"
sudo apt-get install -y npm
npm -v

#make and folder unzip the project
cd /opt || exit
sudo mkdir webapp
sudo unzip webapp.zip -d webapp

#remove .git
sudo apt-get remove -y git

# go in the webapp
cd webapp/ || exit

#install the npm dependencies
sudo npm install
