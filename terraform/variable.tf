variable "aws_region" {
  description = "aws region for ivaans-clothings"
  type        = string
  default     = "ap-southeast-2"
}

variable "repository_name" {
  description = "AWS ECR name"
  type        = string
  default     = "ivaans-clothings"
}
variable "github_owner" {
  description = "github_username"
  type        = string
  default     = "uttamsgit"
}

variable "github_repo" {
  description = "github Repo name"
  type        = string
  default     = "Ivaans-Clothings"
}
