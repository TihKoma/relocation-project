data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  tags = merge(
    { "Name" : "${var.name}-${var.cluster}-ecs" },
    var.tags
  )
}

resource "aws_security_group" "main" {
  name        = "${var.name}-${var.cluster}-ecs"
  description = "${var.name}-${var.cluster}-ecs"
  vpc_id      = var.vpc

  ingress {
    description     = "VPN TO HTTP"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [var.vpn_sg]
  }

  ingress {
    description     = "VPN TO TLS"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [var.vpn_sg]
  }

  ingress {
    description     = "LB TO HTTP"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [var.lb_sg]
  }

  ingress {
    description     = "LB TO TLS"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [var.lb_sg]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = local.tags
}

resource "aws_lb_listener_rule" "main" {
  listener_arn = var.listener
  priority     = var.lb_priority

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }

  condition {
    path_pattern {
      values = ["${var.path}*"]
    }
  }
}

resource "aws_lb_target_group" "main" {
  name                 = "${var.name}-${var.cluster}"
  port                 = 80
  protocol             = "HTTP"
  vpc_id               = var.vpc
  target_type          = "ip"
  deregistration_delay = var.lb_deregistration_delay

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 5
    matcher             = "200"
    path                = var.health_path
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 4
    unhealthy_threshold = 2
  }

  tags = local.tags
}

resource "aws_cloudwatch_log_group" "main" {
  name = "/ecs/${var.name}-${var.cluster}"

  retention_in_days = 7

  tags = local.tags
}

resource "aws_cloudwatch_log_group" "nginx" {
  name = "/ecs/${var.name}-${var.cluster}-nginx"

  retention_in_days = 7

  tags = local.tags
}

resource "aws_cloudwatch_log_group" "xray" {
  count = var.xray_image != null ? 1 : 0

  name = "/ecs/${var.name}-${var.cluster}-xray"

  retention_in_days = 7

  tags = local.tags
}
