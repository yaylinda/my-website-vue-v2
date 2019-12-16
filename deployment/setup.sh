sudo su

yum update -y
yum install -y docker
yum install -y git

systemctl start docker
