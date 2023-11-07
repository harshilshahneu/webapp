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

#install cloudwatch
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

sudo rm ./amazon-cloudwatch-agent.deb

#install node
echo "installing node"
sudo apt-get install -y nodejs
node -v

#install npm
echo "installing npm"
sudo apt-get install -y npm
npm -v

#remove .git
sudo apt-get remove -y git

# Add user and group
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

#move the zip
sudo cp /tmp/webapp.zip /opt/csye6225/webapp.zip

#make and folder unzip the project
cd /opt/csye6225 || exit
sudo mkdir webapp
sudo unzip webapp.zip -d webapp

# go in the webapp
cd webapp/ || exit

#install the npm dependencies
sudo npm install
