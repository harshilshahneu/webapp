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

#make and folder unzip the project
sudo mkdir webapp
sudo unzip webapp.zip -d webapp

cd webapp/ || exit

#create the .env
# cat<<EOL > .env
# PORT=8080
# DB_HOST=127.0.0.1
# DB_NAME=HealthConnectDB
# DB_USER=admin
# DB_PASSWORD=password
# DB_DIALECT=mysql
# NODE_ENV=prod
# USER_CSV_PATH=/opt/users.csv
# EOL

#setup db
echo "GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;" | sudo mariadb
echo "FLUSH PRIVILEGES;" | sudo mariadb
echo "CREATE DATABASE HealthConnectDB;" | sudo mariadb

#install the npm dependencies
npm install

#@IMP the .env creation and setting up mariadb should be done in githubactions or somewhere else
