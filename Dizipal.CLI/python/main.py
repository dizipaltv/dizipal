#!/usr/bin/env python
from typing import Optional
from rich import print
import typer
from typing_extensions import Annotated
import commands

def main(url: Annotated[Optional[str], typer.Argument()] = None, version: bool = False):
    """
    find latest Dizipal adress
    """
    if version:
        commands.main.version()
        raise typer.Exit()

if __name__ == "__main__":
    typer.run(main)
    