# MODIFICATIONS I MADE TO GHOST

## Ghost Exporter
### Add support for 'dev' CLI option
### Add support for tags CLI option

### To develop (bc this needs to be installed globally):
```
cd /usr/local/lib/node_modules 
sudo ln -s ~/Dropbox/metal-heart/blog/node_modules/ghost-export ghost-export
```

sudo npm install --save-dev -g ghost-export
### Sample usage
`ghost-export ./ ./export/ --dev --tags welovedc,pinnastorm,mlim`

## Markdown/Showdown Extensions

Ghost ships with `showdown-table`, but it's not used anywhere. To get this one working in both the editor and the post renderer, I had to modify the following files:

`core/client/Brocfile.js` - import your extension source
`core/client/app/helpers/gh-format-markdown.js` - add to extensions list
`core/server/models/post.js` - add to extensions list

