docker ps
# if currently running, kill it 
# docker kill <containerId>

docker build https://github.com/yaylinda/my-website-vue-v2.git -t my-website
docker run -d -p 8080:80 my-website