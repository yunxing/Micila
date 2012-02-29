#!/bin/bash
erl -noshell -sname webserver_stopper \
           -s stop master@$HOSTNAME