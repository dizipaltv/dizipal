from typing import Optional
from typing_extensions import Annotated
import typer

def find(url: Annotated[Optional[str], typer.Argument()] = None, latest: Annotated[Optional[bool], typer.Option()] = False, api: Annotated[Optional[str], typer.Option()] = None):
    if url is not None:
        print("url")