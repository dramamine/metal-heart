### How to get this running on Ghost

* Zip published files using `zip welovedc.zip published*we-love-music*.md`
* Upload that zip file using the Labs->Import tool
* Upload all images using `scp images/* root@metal-heart.org:/var/www/blog/content/images`
* Tag all the articles with 'welovemusic' or 'hotticket'
* Tag favorites with...something(?)


### Things I'm Still Workin On
* CSS: 
    - http://stackoverflow.com/questions/14675913/how-to-change-image-size-markdown
    - Using 'welovedc' as alt tag
    - need img[alt=welovedc] { width: 375px; }

### Tasks
+ copy all text over
+ copy over comments
- header-ize the top row
- put in dummy image tags: ![welovedc](/images/.jpg "")
- drop in the image file names
- update links and formatting
