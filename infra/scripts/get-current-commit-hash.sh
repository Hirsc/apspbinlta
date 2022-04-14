#!/bin/bash

echo $(git log --pretty=format:'%H' -n 1)