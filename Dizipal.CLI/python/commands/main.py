from .config import Metadata

def version():
    print(Metadata()["version"])