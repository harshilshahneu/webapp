packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9" # Ubuntu 22.04 LTS
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "ami_description" {
  type    = string
  default = "Assignment 5 AMI"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "accessible_regions" {
  type    = list(string)
  default = ["us-east-1"]
}

variable "accessible_users" {
  type    = list(string)
  default = ["962114538522"] # share with demo
}

variable "profile" {
  type    = string
  default = "dev"
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  profile         = "${var.profile}"
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "${var.ami_description}"
  ami_regions     = "${var.accessible_regions}"
  ami_users       = "${var.accessible_users}"
  instance_type   = "${var.instance_type}"
  source_ami      = "${var.source_ami}"
  ssh_username    = "${var.ssh_username}"
  vpc_id          = "vpc-0304e2b2fce84451c"

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "./application/webapp.zip"
    destination = "/home/admin/webapp.zip"
  }

  provisioner "file" {
    source      = "./application/users.csv"
    destination = "/home/admin/users.csv"
  }

  provisioner "shell" {
    scripts      = ["./packer/deploy.sh"]
    pause_before = "10s"
    timeout      = "10s"
  }
}
