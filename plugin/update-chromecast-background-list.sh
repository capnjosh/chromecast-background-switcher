#!/bin/bash

LIST="chromecast-background-list"

if [ -f $LIST ]; then
    rm $LIST
fi

curl -o $LIST https://raw.githubusercontent.com/dconnolly/chromecast-backgrounds/master/README.md
