# Dizipal CLI

A CLI tool to find the most up-to-date address of Dizipal directly from the terminal.

<br>


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Find the latest Dizipal address using the API](#find-the-latest-dizipal-address-using-the-api)
  - [Start searching for the latest address from a specific URL](#start-searching-for-the-latest-address-from-httpsdizipal730com-and-continue-sequentially-eg-httpsdizipal731com)
  - [Find the latest address using a custom API endpoint](#find-the-latest-address-using-a-custom-api-endpoint-and-look-for-the-currentsiteurl-key-in-the-json-response)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<br>

## Features
- Find the latest Dizipal address with a simple command: `dizipal find --latest`.
- Save the latest Dizipal address as an environment variable: `$DIZIPAL`.

<br>

## Installation
> [!IMPORTANT]  
> You must have the latest LTS version of [Node.js](https://nodejs.org) installed on your system. To check if it is installed, enter the following command in your terminal:
> ```bash
> node --version
> ```
> If you see a version number, then Node.js is installed on your system (e.g., `v20.17.0`).

<br>

Open your terminal and enter the following command to install `dizipal-cli` globally:
```bash
npm install --global dizipal-cli
```

## Usage

> [!NOTE]   
> Version `v0.0.1` contains a single utility command: `find`.   
> The `find` command searches for the latest Dizipal address and saves it as an environment variable (`$DIZIPAL`) if you are not using a Windows device.

<br>

#### Find the latest Dizipal address using the API.

```bash
dizipal find --latest
```

or 
```bash
dizipal find -l
```

<br>

#### Start searching for the latest address from <https://dizipal730.com> and continue sequentially, e.g., <https://dizipal731.com>.

```bash
dizipal find --url https://dizipal730.com
```

or
```bash
dizipal find -u https://dizipal730.com
```

<br>

#### Find the latest address using a custom API endpoint and look for the currentSiteURL key in the JSON response.

```bash
dizipal find --api https://example.com/api --latest
```

or
```bash
dizipal find -a https://example.com/api -l
```

<br>

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to your branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

<br>

## License
This project is licensed under the MIT License.

<br>

## Contact
For questions or suggestions, please email us at dizipaltv@gmail.com.