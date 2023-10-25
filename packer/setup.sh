#!/bin/bash
#change ownership
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 750  /opt/csye6225/webapp

# Move the service file to systemd
sudo cp /tmp/bootup.service /lib/systemd/system/bootup.service

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable bootup
sudo systemctl start bootup
sudo systemctl status bootup