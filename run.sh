docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# for /f "tokens=*" %i in ('docker ps -aq') do docker rm -f %i

docker-compose build
docker-compose up