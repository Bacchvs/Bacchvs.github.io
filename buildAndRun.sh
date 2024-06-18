#!/bin/bash
git add .
git commit -m "Mise en service du $(date +%d/%m/%Y-%H:%M:%S)"
git push
