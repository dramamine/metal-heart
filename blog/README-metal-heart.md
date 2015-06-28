# MODIFICATIONS I MADE TO GHOST

## Exporter
## Add support for 'dev' CLI option
## Add support for tags CLI option

### To develop (bc this needs to be installed globally):
```
cd /usr/local/lib/node_modules 
sudo ln -s ~/Dropbox/metal-heart/blog/node_modules/ghost-export ghost-export
```

sudo npm install --save-dev -g ghost-export
## Sample usage
`ghost-export ./ ./export/ --dev --tags welovedc,pinnastorm,mlim`
