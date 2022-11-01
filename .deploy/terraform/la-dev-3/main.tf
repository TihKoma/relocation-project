provider "aws" {
  region = var.aws_region
}

terraform {
  backend "http" {
    address        = "https://gitlab.com/api/v4/projects/30413421/terraform/state/la-dev-3-frontend"
    lock_address   = "https://gitlab.com/api/v4/projects/30413421/terraform/state/la-dev-3-frontend/lock"
    unlock_address = "https://gitlab.com/api/v4/projects/30413421/terraform/state/la-dev-3-frontend/lock"
    lock_method    = "POST"
    unlock_method  = "DELETE"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.27.0"
    }
  }
}

data "terraform_remote_state" "infra" {
  backend = "http"

  config = {
    address  = "https://gitlab.com/api/v4/projects/30413421/terraform/state/la-dev-3"
    username = var.gitlab_username
    password = var.gitlab_access_token
  }
}
