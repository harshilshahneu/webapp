#!/bin/bash
# Add user and group
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

# Move the service file to systemd
sudo cp /tmp/bootup.service /lib/systemd/system/bootup.service

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable bootup
sudo systemctl start bootup
sudo systemctl status bootup