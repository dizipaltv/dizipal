import os
import json
import requests

def dirname(filepath = __file__):
    return os.path.dirname(os.path.abspath(filepath))

THIS_FILE_DIR = dirname(__file__)

def Metadata():
    with open(os.path.join(THIS_FILE_DIR, "..", "metadata.json"), 'r', encoding="utf-8") as file:
        return json.load(file)

METADATA = Metadata()
BASEAPI = "https://raw.githubusercontent.com/dizipaltv/api/main/dizipal.json"
HOMEDIR = os.path.expanduser("~")
CONFIGDIR = os.path.abspath(os.path.join(HOMEDIR, ".config"))
CONFIGFILE = os.path.abspath(os.path.join(CONFIGDIR, "dizipal.json"))

BASECONFIG = {
    "latestCLI": METADATA["version"],
    "currentSiteURL": "https://dizipal738.com",
    "firstProcess": 0
}


def check_config_dir():
    if os.access(CONFIGDIR, os.F_OK):
        pass
    else:
        try:
            os.makedirs(CONFIGDIR)
        except Exception as e:
            print(f"Something went wrong on the making config dirs! {e}")


def check_config_file():
    if os.access(CONFIGFILE, os.F_OK):
        return True
    
    config = Config()
    config.update()
    return False


def check_first_process():
    if BASECONFIG["firstProcess"] == 0:
        response = requests.get(BASEAPI)

        if response.status_code == 200:
            inner = response.json()

            if inner:
                BASECONFIG["currentSiteURL"] = inner["currentSiteURL"]
                BASECONFIG["latestCLI"] = inner["latestCLI"]

        BASECONFIG["firstProcess"] = 1

class Config:
    def __init__(self):
        self.control()

    # Expected exclude values
    # config_file: exluding check_config_file() method
    # config_dir: excluding check_config_dir() method
    # first_process: exluding check_first_process()
    def control(self, exclude: str):
        controlling = []
        expected_exclude_values = [
            {
                "value": "config_file",
                "exec": check_config_file
            },
            {
                "value": "config_dir",
                "exec": check_config_dir
            },
            {
                "value": "first_process",
                "exec": check_first_process
            }
        ]

        for eev in expected_exclude_values:
            if exclude != eev["value"]:
                controlling.append(eev["exec"])

        for execfn in controlling:
            execfn()

    def read(self):
        self.control()

        try:
            with open(CONFIGFILE, 'r', encoding="utf-8") as file:
                return json.load(file)
        except Exception as e:
            print(f"Something went wrong on reading config file! {e}")

    def update(self, content: object = BASECONFIG):
        try:
            self.control(exclude="config_file")

            with open(CONFIGFILE, 'w', encoding="utf-8") as file:
                file.write(json.dumps(BASECONFIG, ensure_ascii=False, indent=2))
        except Exception as e:
            print(f"Something went wrong on updating config file! {e}")

    def init(self):
        check_first_process()
        if check_config_file():
            return
        else:
            self.update()
            
    @property
    def get_config():
        return BASECONFIG