import os
import glob

elements = glob.glob("**/*model.obj", recursive=True)
elem_filtered = [f for f in elements if os.path.basename(f) != "model.obj"]

for e in elem_filtered:
    prefix = os.path.basename(e).replace("model.obj","")
    dir = os.path.dirname(e)
    print(e, os.path.join(dir, "model.obj"))
    os.rename(e, os.path.join(dir, "model.obj"))
    print(os.path.join(dir, prefix + "texture_kd.jpg"), os.path.join(dir, "texture_kd.jpg"))
    os.rename(os.path.join(dir, prefix + "texture_kd.jpg"), os.path.join(dir, "texture_kd.jpg"))
    print(os.path.join(dir, prefix + "model.mtl"), os.path.join(dir, "model.mtl"))
    os.rename(os.path.join(dir, prefix + "model.mtl"), os.path.join(dir, "model.mtl"))