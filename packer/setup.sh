#!/bin/bash
# Move the service file to systemd
sudo cp /tmp/bootup.service /lib/systemd/system/bootup.service

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable bootup
sudo systemctl start bootup
sudo systemctl status bootup