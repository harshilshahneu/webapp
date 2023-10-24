#!/bin/bash
sudo cp /tmp/bootup.service /lib/systemd/system/bootup.service
sudo systemctl enable bootup
sudo systemctl start bootup
# sudo systemctl restart bootup
sudo systemctl status bootup