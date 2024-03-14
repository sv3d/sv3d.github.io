#!/usr/bin/env python3

import os

# get all folders in models/ dir
files = [f for f in os.listdir('models') if os.path.isdir(os.path.join('models', f))]

# write to file
with open('gallery_list.txt', 'w') as f:
    for i, file in enumerate(files):
        f.write(file)
        if i < len(files) - 1:
            f.write('\n')
