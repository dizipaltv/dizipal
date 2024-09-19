#!/usr/bin/env python
import typer

def main(name: str, lastname: str = "", formal: bool = False):
    """
    find latest Dizipal adress
    """
    if formal:
        print(f"Good day Ms. {name} {lastname}.")
    else:
        print(f"Hello {name} {lastname}!")
        

if __name__ == "__main__":
    typer.run(main)
    