
resource "aws_key_pair" "terraform_key" {
  key_name   = "terraform-key"
  public_key = file("${path.module}/terraform-key.pub")
}

resource "aws_instance" "web_server" {
  ami                    = "ami-0dd60a46ecc6eac16" # Amazon Linux 2023 (ap-southeast-2)
  instance_type          = "t3.small"
  vpc_security_group_ids = [aws_security_group.prd-ec2_sg.id]
  key_name               = aws_key_pair.terraform_key.key_name


  tags = {
    Name        = "Ivaans-terraform-ec2"
    Environment = "dev"
  }
}


resource "aws_security_group" "prd-ec2_sg" {
  name = "prd-ec2-sg"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Website"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
