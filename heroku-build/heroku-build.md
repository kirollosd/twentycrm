# NAVIGATION

cd packages/twenty-docker/

---

# FRONT: twenty-front

make prod-front-build
docker tag twenty-front registry.heroku.com/apperate/twenty-front
docker push registry.heroku.com/apperate/twenty-front

---

# SERVER: twenty-server

make prod-server-build
docker tag twenty-server registry.heroku.com/apperate/twenty-server
docker push registry.heroku.com/apperate/twenty-server

---

# DEPLOY HEROKU

heroku container:release twenty-front -a apperate
heroku container:release twenty-server -a apperate
