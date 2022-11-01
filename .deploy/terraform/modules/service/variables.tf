variable "name" {}
variable "cluster" {}
variable "vpc" {}
variable "subnets" {}
variable "cpu" {}
variable "mem" {}
variable "envs" {}
variable "lb_sg" {}
variable "listener" {}
variable "lb_priority" {}
variable "path" {}
variable "health_path" {}
variable "vpn_sg" {}
variable "ecs_role" {}

variable "image_app" {
  type = string
}

variable "image_nginx" {
  type    = string
  default = null
}

variable "tags" {}

variable "lb_deregistration_delay" {
  description = "AWS LB deregistration delay"
  type        = number
  default     = 60
}

variable "container_port" {
  type    = number
  default = 3000
}

variable "xray_image" {
  type    = string
  default = null
}

variable "fargate_weight" {
  type    = number
  default = 0
}

variable "ecs_service_min_capacity" {
  type    = number
  default = 1
}

variable "ecs_service_max_capacity" {
  type    = number
  default = 5
}
