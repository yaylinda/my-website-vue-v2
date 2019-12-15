# Deployment Instructions (in case I forget)

### Setting up a new EC2
```
sudo su

yum update -y
yum install -y git
yum install -y docker

systemctl start docker
```

### Deploying first time on new EC2
```
git clone https://github.com/yaylinda/my-website-vue-v2.git
cd my-website-vue-v2
git checkout master
docker build ./ -t my-website
docker run -d -p 8080:80 my-website

OR

docker build https://github.com/yaylinda/my-website-vue-v2.git -t my-website
docker run -d -p 8080:80 my-website
```

### Building/Deploying/Updating
```
cd my website-vue-v2
git checkout master
git pull

docker ps
# if currently running, kill it 
# docker kill <containerId>

docker build ./ -t my-website
docker run -d -p 8080:80 my-website 

OR

docker build https://github.com/yaylinda/my-website-vue-v2.git -t my-website
docker run -d -p 8080:80 my-website
```

### TODO
Automate this. 
