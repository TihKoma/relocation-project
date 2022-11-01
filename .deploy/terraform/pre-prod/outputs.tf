output "task_definitions" {
  value = flatten(
    [for key, value in local.services : module.service[key].task_definitions]
  )
}
