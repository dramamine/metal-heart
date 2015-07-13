## making this

grunt build
scp dist/assets/main.js root@metal-heart.org:/var/www/blog/static

cp -R dist/assets ../
git add ../assets/main.js