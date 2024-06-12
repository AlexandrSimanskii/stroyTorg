server {
  listen 80 default_server;
    listen [::]:80 default_server;


        root /var/www/dist;



          index index.html index.htm index.nginx-debian.html;

            server_name simankiimebel.ru www.simankiimebel.ru;

              location /api/ {
                                proxy_pass http://localhost:3004;
                                          proxy_set_header Host $host;
                                          proxy_set_header X-Real-IP $remote_addr;
                                          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                                          proxy_set_header X-Forwarded-Proto $scheme;
                             }

              location /   {
                           try_files $uri $uri/ /index.html;
                           }

                                                                                                                }

server {


        root /var/www/dist;



          index index.html index.htm index.nginx-debian.html;
server_name simankiimebel.ru; # managed by Certbot


              location /api/ {
                                proxy_pass http://localhost:3004;
                                proxy_set_header Host $host;
                                proxy_set_header X-Real-IP $remote_addr;
                                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                                proxy_set_header X-Forwarded-Proto $scheme;
                                                                          }

                 location / {

                                try_files $uri $uri/ /index.html;
                        }



listen [::]:443 ssl ipv6only=on; # managed by Certbot
listen 443 ssl; # managed by Certbot
ssl_certificate /etc/letsencrypt/live/simankiimebel.ru/fullchain.pem; # managed by Certbot
ssl_certificate_key /etc/letsencrypt/live/simankiimebel.ru/privkey.pem; # managed by Certbot
-
