data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  vpc    = "vpc-70c2a41a"
  vpn_sg = "sg-0a7505a48365e1df4"
  private_subnets = [
    "subnet-082d6b281a9fe037f",
    "subnet-0b30abba0dd3f20d5",
    "subnet-0e2e9023449d650b7",
  ]
  tags = {
    "Terraform" : true
    "Environment" : var.env
  }

  services = {
    "comm-platform" : {
      "lb_sg" : data.terraform_remote_state.infra.outputs.security_group
      "listener" : data.terraform_remote_state.infra.outputs.http_listener_arn
      "subnets" : local.private_subnets
      "path" : ""
      "health_path" : "/api/healthcheck"
      "cpu" : 256
      "mem" : 512
      "envs" : [
        {
          "name" : "NEXT_PUBLIC_API_HOST",
          "value" : var.NEXT_PUBLIC_API_HOST
        },
        {
          "name" : "NEXT_PUBLIC_SSR_API_HOST",
          "value" : var.NEXT_PUBLIC_SSR_API_HOST
        },
        {
          "name" : "NEXT_PUBLIC_WITH_ANALYTICS",
          "value" : var.NEXT_PUBLIC_WITH_ANALYTICS
        },
        {
          "name" : "NEXT_PUBLIC_CAPTCHA_V3_KEY",
          "value" : var.NEXT_PUBLIC_CAPTCHA_V3_KEY
        },
        {
          "name" : "NEXT_PUBLIC_WITH_SENTRY",
          "value" : var.NEXT_PUBLIC_WITH_SENTRY
        },
        {
          "name" : "NEXT_PUBLIC_SENTRY_DSN",
          "value" : var.NEXT_PUBLIC_SENTRY_DSN
        },
        {
          "name" : "NICITY_ENV",
          "value" : var.env
        },
        {
          "name" : "AWS_REGION",
          "value" : var.aws_region
        },
        {
          "name" : "NGINX_RESOLVER",
          "value" : "172.31.0.2"
        }
      ]
    }
  }
}

module "service" {
  for_each = local.services

  source = "../modules/service"

  name        = each.key
  image_app   = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/nicity/front/comm-platform:${var.image_tag}"
  image_nginx = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/nicity/front/comm-platform/nginx:${var.nginx_tag}"
  vpc         = local.vpc
  vpn_sg      = local.vpn_sg
  cluster     = var.env
  subnets     = each.value.subnets
  lb_sg       = each.value.lb_sg
  lb_priority = index(keys(local.services), each.key) * 10 + 1000
  listener    = each.value.listener
  path        = each.value.path
  health_path = each.value.health_path
  cpu         = each.value.cpu
  mem         = each.value.mem
  envs        = each.value.envs
  ecs_role    = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/ecsTaskExecutionRole"
  xray_image  = "701347834014.dkr.ecr.eu-central-1.amazonaws.com/aws-xray:3.3.3"

  ecs_service_min_capacity = try(each.value.min_capacity, 1)
  ecs_service_max_capacity = try(each.value.max_capacity, 5)

  tags = local.tags
}
