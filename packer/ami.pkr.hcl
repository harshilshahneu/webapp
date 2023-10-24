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

variable "source_ami_filter" {
  type    = string
  default = "debian-12-amd64-*" # Debian 12
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "ami_description" {
  type    = string
  default = "ami"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "profile" {
  type    = string
  default = "dev"
}

variable "root_device_type" {
  type    = string
  default = "ebs"
}

variable "virtualization_type" {
  type    = string
  default = "hvm"
}

variable "device_name" {
  type    = string
  default = "/dev/xvda"
}

variable "volume_size" {
  type    = number
  default = 25
}

variable "volume_type" {
  type    = string
  default = "gp2"
}

variable "dev_id" {
  type    = string
  default = null
}

variable "demo_id" {
  type    = string
  default = null
}

// Add default vpc


# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  profile         = "${var.profile}"
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "${var.ami_description}"
  ami_users = [
    "${var.dev_id}",  # dev account ID 
    "${var.demo_id}", # prod account ID
  ]
  instance_type = "${var.instance_type}"
  ssh_username  = "${var.ssh_username}"

  source_ami_filter {
    filters = {
      name                = "${var.source_ami_filter}"
      root-device-type    = "${var.root_device_type}"
      virtualization-type = "${var.virtualization_type}"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "${var.device_name}"
    volume_size           = "${var.volume_size}"
    volume_type           = "${var.volume_type}"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/webapp.zip"
  }

  provisioner "file" {
    source      = "./packer/bootup.service"
    destination = "/tmp/bootup.service"
  }

  provisioner "shell" {
    scripts      = [
      "./packer/init.sh",
      "./packer/setup.sh",
    ]
    pause_before = "10s"
    timeout      = "10s"
  }
}
