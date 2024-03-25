const net = require('net'); // Include the net module for TCP network operations.
const process = require('process'); // Include the process module to work with the process (the running instance of Node.js).

const parseArgs = () => { // Define a function to parse command-line arguments.
    const args = process.argv.slice(2); // Get command-line arguments, excluding the first two.
    let options = {}; // Create an empty object to store options.

    for (let i = 0; i < args.length; i += 2) { // Loop through the arguments.
        const arg = args[i]; // The argument name (e.g., '-u').
        const value = args[i + 1]; // The argument value.
        if (arg === '-u') options.url = value; // If the argument is '-u', store its value in the options object.
    }

    return options; // Return the parsed options.
};

const fetchUrl = (hostname, path = '/') => { // Define a function to fetch content from a URL.
    const client = new net.Socket(); // Create a new socket.
    client.connect(80, hostname, () => { // Connect to the server on port 80.
        console.log('Connected to ' + hostname); // Log a message once connected.
        client.write(`GET ${path} HTTP/1.1\r\nHost: ${hostname}\r\n\r\n`); // Send an HTTP GET request.
    });

    client.on('data', (data) => { // Handle the response data from the server.
        console.log(data.toString()); // Convert the response data to a string and log it.
        client.destroy(); // Close the connection after receiving the response.
    });

    client.on('close', () => { // Handle the connection closing.
        console.log('Connection closed'); // Log a message once the connection is closed.
    });
};

const options = parseArgs(); // Parse the command-line arguments.

if (options.url) { // If a URL was provided,
    const url = new URL(options.url); // Create a URL object from the provided URL string.
    fetchUrl(url.hostname, url.pathname); // Fetch content from the URL.
} else { // If no URL was provided,
    console.log('Usage: node go2web.js -u <URL>'); // Print usage instructions.
}
