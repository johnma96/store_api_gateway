sudo heroku login
sudo heroku create p43-sport-api-gateway
sudo heroku container:login
sudo heroku container:push web --app p43-sport-api-gateway
sudo heroku container:release web --app p43-sport-api-gateway