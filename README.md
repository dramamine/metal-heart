# Hey there, stranger.
This is the repo I use to run metal-heart.org. Mostly I handle blog administration using this repo. 

If you want to run my personal blog yourself (weirdo), you can run this page by cloning Ghost, cloning this repo, copying everything from the blog/ directory here into your Ghost install and running ghost normally.

Besides the `blog` directory, most of these folders contain Markdown copies of my blog content. Some of the code I wrote here deals with importing and exporting these files according to my own filing system. My workflow was generally this:
- copy text from whatever source to Markdown files
- upload Markdown files using the batch upload tool in Labs
- make small edits in Ghost
- export files from Ghost back to Markdown

Small things you might be interested in:

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

## Make changes locally, deploy on ocean
### Git-committed changes
```
ocean
cd /var/www
git pull
```

### Assets
`scp blog/content/images/* root@metal-heart.org:/var/www/blog/content/images/`
