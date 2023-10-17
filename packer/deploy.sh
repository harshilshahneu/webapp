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

#install mariadb
echo "installing mariadb"
sudo apt install -y mariadb-server

#unzip the project
unzip webapp.zip

cd webapp/ || exit

#install the npm dependencies
npm install
