# Deployment Instructions (in case I forget)

### Setting up a new EC2
```
sudo su

sudo yum update -y

sudo yum install -y git

sudo yum install -y docker
```

### Building/Deploying/Updating
```
docker ps

# if currently running, kill it 
# docker kill <containerId>

docker build https://github.com/yaylinda/my-website-vue-v2.git -t my-website

docker run -d -p 8080:80 my-website 

```

### TODO
Automate this. 
