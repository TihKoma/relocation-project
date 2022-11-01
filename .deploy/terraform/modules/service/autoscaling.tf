resource "aws_appautoscaling_target" "this" {
  max_capacity       = var.ecs_service_max_capacity
  min_capacity       = var.ecs_service_min_capacity
  resource_id        = "service/${var.cluster}/${var.name}-${random_pet.this.id}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"

  lifecycle {
    replace_triggered_by = [
      aws_ecs_service.this.id
    ]
  }
}

resource "aws_appautoscaling_policy" "cpu" {
  name               = "${aws_appautoscaling_target.this.resource_id}-cpu"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.this.resource_id
  scalable_dimension = aws_appautoscaling_target.this.scalable_dimension
  service_namespace  = aws_appautoscaling_target.this.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    scale_in_cooldown  = 60
    scale_out_cooldown = 60
    target_value       = 50
  }
}

resource "aws_appautoscaling_policy" "memory" {
  name               = "${aws_appautoscaling_target.this.resource_id}-memory"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.this.resource_id
  scalable_dimension = aws_appautoscaling_target.this.scalable_dimension
  service_namespace  = aws_appautoscaling_target.this.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    scale_in_cooldown  = 60
    scale_out_cooldown = 60
    target_value       = 70
  }
}
