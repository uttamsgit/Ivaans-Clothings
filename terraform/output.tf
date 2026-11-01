output "ecr_repository_name" {
  description = "name of ECR repo"
  value       = aws_ecr_repository.ivaans.name
}

output "ecr_repo_URL" {
  description = "URL of ECR Repo"
  value       = aws_ecr_repository.ivaans.repository_url
}
