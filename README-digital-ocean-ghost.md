# Setting Up Ghost on DigitalOcean

## What I Really Do


# Install local db to remote
scp content/data/ghost-dev.db root@metal-heart.org:/var/www/blog/content/data/ghost.db

# Sync assets
rsync -vr content/themes/CodeIonic/assets/ root@metal-heart.org:/var/www/blog/content/themes/CodeIonic/assets/


## Manual Install

https://www.howtoinstallghost.com/how-to-install-ghost-on-ubuntu-server-12-04/

Don't forget lib6-dev to avoid sqlite3 errors.
Service runs on port 2368 until we do this:

https://allaboutghost.com/how-to-proxy-port-80-to-2368-for-ghost-with-nginx/

Let's add this to `/etc/nginx/conf.d/metal-heart.conf`

```
server {
    listen 80;
    server_name metal-heart.org;

    location ~ /static {
        root /var/www/;
        expires 1y;

    }
    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:2368;
    }
}

server {
    listen 80;
    server_name karaoke.metal-heart.org;
    location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://karaoke.metal-heart.org:2266;
    }
}
```


`service nginx restart`

# You're Using PM2 To Run Ghost
`su - ghost`
`pm2 restart ghost`

# Email Forwarding
http://www.andreagrandi.it/2014/08/31/getting-started-with-digital-ocean-vps-configuring-dns-and-postfix-for-email-forwarding/
- Installed using `sudo apt-get install postfix`
- Use metal-heart.org as domain name
- Add virtual_maps as the article describes
- Edit `/etc/postfix/virtual` file with content like this
    martin@metal-heart.org masilbiger@gmail.com
    marten@metal-heart.org masilbiger@gmail.com

# Running Locally
- Copy your current install by zipping everything* on the server and using `scp root@metal-heart.org:/var/www/blog/ghosty.zip ./`
- `cp content/data/ghost.db content/data/ghost-dev.db`
- `npm start`
Installing your shit:
```
cd blog
for f in $(git ls-tree -r master --name-only); do 
  scp $f root@metal-heart.org:/var/www/blog/$f
done
```


