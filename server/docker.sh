#!/usr/bin/env sh

read -p 'Port where the server will be listening on (default: 3333): ' port
port=${port:-3333} 

read -p 'Docker image name (default: note-app-server): ' image_name
image_name=${image_name:-note-app-server} 

winpty docker build -t $image_name "." &&
winpty docker run -d -p $port:4000 $image_name