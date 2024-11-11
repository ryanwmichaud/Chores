

import os
import subprocess
import sys




args = []

args.append("flask")

if  (os.getenv("FLASK_APP") == None):
    args.append("--app")
    args.append("server")

args.append("run")

args.append("--host=0.0.0.0")

#args.append("--port=5001")

if len(sys.argv) ==2:
    if sys.argv[1] == "--debug":
        args.append("--debug")


subprocess.run(args)