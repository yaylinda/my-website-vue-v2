
sudo su

sudo yum update -y

sudo yum install -y git

sudo yum install -y docker

sudo wget http://nodejs.org/dist/latest/node-v12.12.0-linux-x64.tar.xz

tar -xf node-v12.12.0-linux-x64.tar.xz

export PATH=/home/ec2-user/node-v12.12.0-linux-x64/bin:$PATH

npm install -g npm

npm install vue

git clone https://github.com/yaylinda/my-website-vue-v2

cd my-website-vue-v2

npm install

npm run build