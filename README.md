# webapp

## Prerequisites for building and deploying your application locally
1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [npm](https://www.npmjs.com/get-npm)
3. Install [MariaDB](https://mariadb.org/download/)
4. Setup .env file in the root directory of the project with the following variables: 
```
PORT=8080
DB_HOST=127.0.0.1
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DIALECT=your_db_dialect
NODE_ENV=your_node_env
USER_CSV_PATH=path/to/user.csv
```
5. Run `npm install` to install all dependencies
6. Run `npm run start` to start the application

## Build and Deploy instructions for the web application
1. SSH into the server
2. Run the following commands:
```
sudo apt update
sudo apt upgrade
sudo apt install nodejs
sudo apt install npm
sudo apt install mariadb-server
sudo apt install unzip
```
3. Add a user to MariaDB (https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-debian-11)
4. SCP the project zip to the server - scp -i ~/.ssh/your_key ./webapp.zip user@your_public_ip:/directory
5. SCP the user.csv to /opt : scp -i ~/.ssh/your_key local_csv_path root@your_public_ip:/opt
6. Unzip the project zip - `unzip webapp.zip`
7. cd into the project directory
8. Setup .env file in the root directory of the project with the following variables:
```
PORT=8080
DB_HOST=127.0.0.1
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DIALECT=your_db_dialect
NODE_ENV=your_node_env
USER_CSV_PATH=path/to/user.csv
```
1. Run `npm install` to install all dependencies
2. Run `npm run start` to start the application

## Packer Configuration for creating an AMI

To create an Amazon Machine Image (AMI) for the web application using Packer, define the following variables in your Packer configuration file:
```
aws_region          = 
source_ami_filter   =
ssh_username        = 
ami_description     = 
instance_type       =
dev_id              = 
demo_id             =
profile             = 
root_device_type    = 
virtualization_type =
device_name         = 
volume_size         = 
volume_type         = 
```