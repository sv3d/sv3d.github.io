#!/usr/bin/env python3

import sys
import re

print(sys.argv)

file = sys.argv[1]

with open(file, 'r') as f:
    lines = f.readlines()

# Find elements which match the regex \/(?=\s) and replace them with nothing
with open(file, 'w') as f:
    for line in lines:
        f.write(re.sub(r'\/(?=\s)', '', line))