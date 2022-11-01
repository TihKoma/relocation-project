data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  vpc    = "vpc-70c2a41a"
  vpn_sg = "sg-0a7505a48365e1df4"
  private_subnets = [
    "subnet-0a5396b045dce8c21",
    "subnet-03755e94617b38d40",
    "subnet-005a9e099bd28fb04",
  ]
  tags = {
    "Terraform" : true
    "Environment" : var.env
  }

  services = {
    "storybook" : {
      "lb_sg" : data.terraform_remote_state.infra.outputs.security_group
      "listener" : data.terraform_remote_state.infra.outputs.http_listener_arn
      "subnets" : local.private_subnets
      "path" : ""
      "health_path" : "/"
      "cpu" : 256
      "mem" : 512
      "max_capacity" : 1
      "envs" : []
    }
  }
}

module "service" {
  for_each = local.services

  source = "../modules/service"

  name                    = each.key
  image_app               = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/nicity/front/comm-platform/storybook:${var.storybook_tag}"
  vpc                     = local.vpc
  vpn_sg                  = local.vpn_sg
  cluster                 = var.env
  subnets                 = each.value.subnets
  lb_sg                   = each.value.lb_sg
  lb_priority             = index(keys(local.services), each.key) * 10 + 1000
  lb_deregistration_delay = 5
  listener                = each.value.listener
  path                    = each.value.path
  health_path             = each.value.health_path
  cpu                     = each.value.cpu
  mem                     = each.value.mem
  envs                    = each.value.envs
  ecs_role                = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/ecsTaskExecutionRole"
  container_port          = 80

  ecs_service_min_capacity = try(each.value.min_capacity, 1)
  ecs_service_max_capacity = try(each.value.max_capacity, 5)

  tags = local.tags
}
