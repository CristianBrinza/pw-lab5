const { sendHttpRequest } = require('./httpRequest');
const { getCached, cacheResponse } = require('./cacheManager');

// Helper function to display usage information
function displayHelp() {
    console.log(`Usage:
    -h                  Display this help message.
    -u <URL>            Make an HTTP request to the specified URL and display the response.`);
}

// Function to process the HTTP request and handle caching
function processRequest(url) {
    // Check if the URL is already cached
    const cachedResponse = getCached(url);
    if (cachedResponse) {
        console.log('Cached Response:\n', cachedResponse);
        return;
    }

    // If not cached, send a new HTTP request
    sendHttpRequest(url, (err, response) => {
        if (err) {
            console.error('Request Error:', err);
            return;
        }

        // Cache the new response
        cacheResponse(url, response);

        // Display the response
        console.log('Response:\n', response);
    });
}

// Main function to parse arguments and execute commands
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('-h')) {
        displayHelp();
        return;
    }

    const urlIndex = args.indexOf('-u');
    if (urlIndex !== -1 && args.length > urlIndex + 1) {
        const url = args[urlIndex + 1];
        processRequest(url);
    } else {
        console.log('Invalid command. Use -h for help.');
    }
}

main();
