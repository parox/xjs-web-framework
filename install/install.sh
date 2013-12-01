#!/bin/bash

echo "----------------------------------------------"
echo "-- Creating XJS folders structure           --"
echo "----------------------------------------------"
#create folder in /etc
mkdir /etc/xjs
#copy template folder for etc
cp -r src/templates/ /etc/xjs
#create folder in /etc
mkdir /usr/lib/xjs
echo "-------------------------------------20%-DONE!"

echo "----------------------------------------------"
echo "-- Creating bash commands                   --"
echo "----------------------------------------------"
#create bash commands
cp src/xjs_bash.js /usr/bin
#rename xjs.px to xjs
mv /usr/bin/xjs_bash.js /usr/bin/xjs
echo "-------------------------------------40%-DONE!"

echo "----------------------------------------------"
echo "-- Applying permission for all users        --"
echo "----------------------------------------------"
#add permission to xjs script
chmod 755 /usr/bin/xjs
chmod -R 755 /etc/xjs/
echo "-------------------------------------60%-DONE!"

#download necessary node modules 
echo "----------------------------------------------"
echo "-- Downloading and installing node Packages --"
echo "----------------------------------------------"
cd /etc/xjs/templates/project/lib

echo "#1 Express.JS Node Package            ########"
npm install express
echo "#2 Socket.IO Node Package             ########"
npm install socket.io
echo "#3 Mongo.DB Node Package              ########"
npm install mongodb
echo "#4 Mongoose Mongo.DB ORM Node Package ########"
npm install mongoose
echo "#5 Save FS extra manager Node Package ########"
npm install --save fs-extra
echo "-------------------------------------80%-DONE!"

echo "----------------------------------------------"
echo "-- Cleaning up temporary files              --"
echo "----------------------------------------------"
#remove extracted files
rm -rf src/
echo "-------------------------------------99%-DONE!"
echo "Done!!!"
