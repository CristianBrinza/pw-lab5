const net = require('net'); // Include the net module for TCP network operations.
const process = require('process'); // Include the process module to work with the process (the running instance of Node.js).


// Display Help Information
const displayHelp = () => {
    console.log(`
    go2web CLI Usage:
      -h                  Display this help message.
      -u <URL>            Make an HTTP request to the specified URL and print the response.
      -s <search-term>    Search the term using a simplified search and print top results. [Feature Not Implemented]
    `);
};


const parseArgs = () => { // Define a function to parse command-line arguments.
    const args = process.argv.slice(2); // Get command-line arguments, excluding the first two.
    let options = {}; // Create an empty object to store options.

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case '-u':
                options.url = args[++i];
                break;
            case '-s':
                options.search = args[++i];
                break;
            case '-h':
                options.help = true;
                break;
        }
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

if (options.help) {
    displayHelp();
} else if (options.url) { // If a URL was provided,
    const url = new URL(options.url); // Create a URL object from the provided URL string.
    fetchUrl(url.hostname, url.pathname); // Fetch content from the URL.
} else if (options.search) {
    console.log('Search functionality not implemented.');
    // Implement search functionality here.
} else {
    console.log('Usage: node go2web.js -h for help.');
}
