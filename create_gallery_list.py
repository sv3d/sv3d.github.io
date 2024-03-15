#!/usr/bin/env python3

import os

# get all folders in models/ dir
files = [f for f in os.listdir('static/models') if 
         os.path.isdir(os.path.join('static/models', f)) and 
         os.path.exists(os.path.join('static/models', f, "model.obj"))]

# write to file
with open('static/gallery_list.txt', 'w') as f:
    for i, file in enumerate(files):
        f.write(file)
        if i < len(files) - 1:
            f.write('\n')
