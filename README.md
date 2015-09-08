# Hey there, stranger.
This is the repo I use to run metal-heart.org. Mostly I handle blog administration using this repo. 

If you want to run my personal blog yourself (weirdo), you can run this page by cloning Ghost, cloning this repo, copying everything from the blog/ directory here into your Ghost install and running ghost normally.

Besides the `blog` directory, most of these folders contain Markdown copies of my blog content. Some of the code I wrote here deals with importing and exporting these files according to my own filing system. My workflow was generally this:
- copy text from whatever source to Markdown files
- upload Markdown files using the batch upload tool in Labs
- make small edits in Ghost
- export files from Ghost back to Markdown

Small things you might be interested in:

## Reasons Ghost Sucks, or Ways I'm Doing It Wrong
**ASSETS**. Ghost has two places you can place static content:
- `/content/images/`: if you upload via a zip file and include an 'images' folder, yr images end up here. Serve from /content/images.
- `/content/themes/{themename}/assets/(css|js|img|whatever)`: you can serve these files with the HTML syntax `src="{{asset "css/style.css"}}"`. Maybe this is meant strictly for theme resources...
- I added a third thing, a `static` folder served via magic.

Breaking out theme files seems fine, but I ran into trouble when I wanted to upload a custom JS file. I wanted to use the static asset directory feature, but then I was putting my JS into the theme's folder.

`content` would be nice as the source of static content, but it also includes folders like `data` that absolutely shouldn't be served like that...

Unfortunately, Ghost recommends nginx configuration to hanlde static files:
https://allaboutghost.com/serving-static-files-alongside-ghost/

I'd like to handle this stuff consistently, but I'm still puzzling on what to do.

**REQUEST ENTITY TOO LARGE**: I can import some files (guides for Serious Sam & Dreamcast Demos) that are too large to be edited and saved through the Ghost frontend!

## Shortcuts taken:
- assets all over the place; some things in git, some not
- images are poorly organized; in retrospect, folders by tag would've been better
- bad build scripts. this is actually a longcut since my client/server are never in sync. server makefile pulls new files and restarts the server, but so many tasks need to be automated, like updating ghost versions, syncing static assets and (maybe) installing local edits to the server
- weird git structure. `blog` should be a submodule...or maybe this whole thing should be a fork of `ghost`...this would make updates clearer and less prone to breakage
- this theme kinda sucks and part of me knows I should write my own theme from scratch and really learn CSS architecture

# ghost-export Modifications
blog/ghost-export/
Run `ghost-export` to see help screen.
- Create folders for posts tagged with user-specified tags, for better organization.
- Downloaded files start with 'published', if they were.
- md files include a line for the # Title.

# Theme Modifications
blog/content/themes/CodeIonic
- Touching as little as possible.

---

## Running Live: You're Using PM2 To Run Ghost
`su - ghost`
`pm2 restart ghost`

## Running Locally
- Get up-to-date ghost.db from git please!
- If you really need the live site, then `scp root@metal-heart.org:/var/www/blog/content/data/ghost.db content/data/`
- Save to devel and work there: `cp content/data/ghost.db content/data/ghost-dev.db`
- `npm start`

The `blog` folder is not really tracked (just changes I made), so to get up and running from scratch after you've cloned this repo:

### initialize
git clone https://github.com/TryGhost/Ghost.git blog
cd blog
npm install
grunt init
### pull in my own changes
git reset --hard HEAD

### Soundmanager2 for playing mp3s on mylifeismetal posts
bower install soundmanager2
cp bower_components/soundmanager2/script/soundmanager2-nodebug-jsmin.js assets/js/soundmanager2.js
cp bower_components/soundmanager2/swf/soundmanager2_flash9.swf assets/swf/
cp bower_components/soundmanager2/swf/soundmanager2.swf assets/swf/

### theme I'm using
cd blog/content/themes
git clone https://github.com/sumitjaju/GhostThemes.git
mv GhostThemes/CodeIonic ./
rm GhostThemes

### copy your production content over
scp root@metal-heart.org:/var/www/blog/content/data/ghost.db content/data/
cp content/data/ghost.db content/data/ghost-dev.db
npm start


## Make changes locally, deploy on ocean
### Git-committed changes
```
ocean
cd /var/www
git pull
```

### Random changes
```
rsync -a blog/content/themes/* root@metal-heart.org:/var/www/blog/content/themes
rsync -a assets/* root@metal-heart.org:/var/www/blog/static

### Assets
rsync -a --ignore-existing blog/content/images/* root@metal-heart.org:/var/www/blog/content/images/

