#!/bin/bash

#create folder in /etc
mkdir /etc/xjs

#create folder in /etc
mkdir /usr/lib/xjs

#copy template folder for etc
cp -r src/templates/ /etc/xjs

#
cp src/xjs_bash.js /usr/bin

#rename xjs.px to xjs
mv /usr/bin/xjs_bash.js /usr/bin/xjs

#add permission to xjs script
chmod 755 /usr/bin/xjs
chmod -R 755 /etc/xjs/

#download necessary node modules 
cd /etc/xjs/templates/project/lib
npm install express
npm install socket.io
npm install mongodb
npm install mongoose
npm install --save fs-extra

#remove extracted files
rm -rf src/
#rm -rf templates/
#rm xjs_bash.js

echo "Installed with succesfull"
