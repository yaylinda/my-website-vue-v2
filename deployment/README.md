# Deployment Instructions (in case I forget)

### Setting up a new EC2
```
// setup.sh

sudo su

yum update -y
yum install -y docker
yum install -y git

systemctl start docker
```

### Updating code

Every push to dev branch will trigger build and dist update.

Every PR from dev -> master will trigger push to docker hub.

### Building/Deploying
```
docker ps
# if currently running, kill it 
# docker kill <containerId>

docker build https://github.com/yaylinda/my-website-vue-v2.git -t my-website
docker run -d -p 8080:80 my-website
```

### TODO
Automate stuff. 
