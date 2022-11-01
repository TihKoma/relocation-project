resource "aws_ecs_task_definition" "this" {
  family = "${var.name}-${var.cluster}"
  container_definitions = jsonencode(concat([
    {
      name              = var.name
      image             = var.image_app
      cpu               = var.cpu - ((var.image_nginx != null ? 32 : 0) + (var.xray_image != null ? 32 : 0))
      memoryReservation = var.mem - ((var.image_nginx != null ? 128 : 0) + (var.xray_image != null ? 128 : 0))
      essential         = true
      portMappings = [
        {
          protocol      = "tcp"
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.main.name
          awslogs-region        = data.aws_region.current.name
          awslogs-stream-prefix = "ecs"
        }
      }
      environment = var.envs
      mountPoints = []
      volumesFrom = []
    }],
    var.xray_image != null ? [{
      name              = "xray-daemon"
      image             = var.xray_image
      cpu               = 32
      memoryReservation = 128
      essential         = true
      portMappings = [
        {
          containerPort = 2000
          hostPort      = 2000
          protocol      = "udp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.xray[0].name
          awslogs-region        = data.aws_region.current.name
          awslogs-stream-prefix = "ecs"
        }
      }

      environment = []
      mountPoints = []
      volumesFrom = []
    }] : [],
    var.image_nginx != null ? [{
      name              = "nginx"
      image             = var.image_nginx
      cpu               = 32
      memoryReservation = 128
      essential         = true
      ulimits = [
        {
          name      = "nofile"
          softLimit = 4096
          hardLimit = 16384
        }
      ]
      portMappings = [
        {
          protocol      = "tcp"
          containerPort = 80
          hostPort      = 80
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.nginx.name
          awslogs-region        = data.aws_region.current.name
          awslogs-stream-prefix = "ecs"
        }
      }
      environment = var.envs
      mountPoints = []
      volumesFrom = []
    }] : []
  ))

  requires_compatibilities = ["EC2", "FARGATE"]
  execution_role_arn       = var.ecs_role
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.mem
  task_role_arn            = var.ecs_role

  tags = local.tags
}

resource "random_pet" "this" {
  length = 1

  keepers = {
    app_image_tag      = var.image_app
    nginx_image_tag    = var.image_nginx
    fargate_weight     = var.fargate_weight
    task_definition_id = aws_ecs_task_definition.this.id
  }
}

resource "aws_ecs_service" "this" {
  name                   = "${var.name}-${random_pet.this.id}"
  cluster                = var.cluster
  task_definition        = aws_ecs_task_definition.this.arn
  desired_count          = 1
  propagate_tags         = "SERVICE"
  wait_for_steady_state  = true
  enable_execute_command = true

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  capacity_provider_strategy {
    base              = var.fargate_weight > 0 ? 1 : 0
    capacity_provider = "FARGATE"
    weight            = var.fargate_weight
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 4
  }

  deployment_controller {
    type = "ECS"
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = var.image_nginx != null ? "nginx" : var.name
    container_port   = 80
  }

  network_configuration {
    assign_public_ip = false
    security_groups  = [aws_security_group.main.id]
    subnets          = var.subnets
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [desired_count]
  }

  tags = local.tags
}
