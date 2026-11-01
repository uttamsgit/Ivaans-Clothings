resource "aws_ecr_repository" "ivaans" {
  name                 = var.repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    project     = "Ivaans-Clothings"
    Enviornment = "Learning"
    Managedby   = "Terraform"
  }
}
