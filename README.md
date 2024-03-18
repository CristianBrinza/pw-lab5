# Lab 5 - Websockets CLI Tool
## Description
This project is a command-line interface (CLI) tool named go2web designed for educational purposes to understand the workings of HTTP requests and web scraping at a low level. The tool allows users to make direct HTTP requests to specified URLs, search the web using a built-in command, and parse the response to be human-readable, all without relying on external HTTP request libraries.

## Features
- HTTP Requests: Make direct HTTP requests to specified URLs and display the response.
- Web Search: Perform web searches using a specified search term and display the top 10 results.
- Help: Display usage information.


## Special Conditions
No use of built-in/third-party libraries for making HTTP requests.
Focus on CLI functionality; GUI applications are not within the scope of this project.

## Prerequisites
Node.js installed on your machine.
Setup
Clone the repository to your local machine:

```
git clone CristianBrinza/pw-lab5
```


### Navigate to the project directory:


## Usage
The go2web tool can be executed with the following commands:

### Display help:

```
node go2web.js -h
```
Make an HTTP request to a specified URL:

```
node go2web.js -u <URL>
```
Search the web with a specified term and display the top 10 results:

```
node go2web.js -s "<search-term>"
```

## Implementation Details
The project is implemented in JavaScript, utilizing Node.js for its execution. It makes use of TCP sockets for sending and receiving HTTP requests, adhering to the restrictions of not using external HTTP request libraries. The CLI parsing is handled using Node.js's process.argv for simplicity and directness.

## Files
- go2web.js: The main script file that parses command-line arguments and invokes the appropriate actions.
- http.js: Contains utility functions for making HTTP requests and handling responses.
### Points System
- Executable with -h, (-u or -s) options: +5 points
- Executable with -h, (-u and -s) options: +6 points
- Accessible results/links from the search engine via CLI: +1 extra point
- Implementing HTTP request redirects: +1 extra point
- Implementing an HTTP cache mechanism: +2 extra points
- Implementing content negotiation: +2 extra points

## Contributions
This project is open to contributions. If you wish to contribute, please fork the repository and submit a pull request with your proposed changes.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.