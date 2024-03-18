const net = require('net');

function makeHttpRequest(url) {
    return new Promise((resolve, reject) => {
        // Simplified URL parsing. For a real application, consider a more robust solution.
        const [_, host, path] = url.match(/https?:\/\/([^\/]+)(\/.*)?/);
        const options = {
            host: host,
            port: 80,
            path: path || '/',
        };

        const client = net.connect(options, () => {
            client.write(`GET ${options.path} HTTP/1.1\r\n`);
            client.write(`Host: ${options.host}\r\n`);
            client.write(`Connection: close\r\n\r\n`);
        });

        let data = '';
        client.on('data', (chunk) => {
            data += chunk;
        });

        client.on('end', () => {
            // Simple response parsing to remove headers
            const responseBody = data.substring(data.indexOf("\r\n\r\n") + 4);
            resolve(responseBody);
        });

        client.on('error', (err) => reject(err));
    });
}

function search(searchTerm) {
    return new Promise((resolve, reject) => {
        const searchUrl = `http://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;

        // Simplified URL parsing.
        const [_, host, path] = searchUrl.match(/https?:\/\/([^\/]+)(\/.*)?/);
        const options = {
            host: host,
            port: 80,
            path: path || '/',
        };

        const client = net.connect(options, () => {
            client.write(`GET ${options.path} HTTP/1.1\r\n`);
            client.write(`Host: ${options.host}\r\n`);
            client.write(`Connection: close\r\n\r\n`);
        });

        let data = '';
        client.on('data', (chunk) => {
            data += chunk;
        });

        client.on('end', () => {
            // Here you'd need to parse the HTML response to extract the search results.
            // This is non-trivial without a library and may violate Google's Terms of Service.
            // For demonstration purposes, we'll just return a placeholder response.
            resolve(`Search results for "${searchTerm}" (parsed results would go here)`);
        });

        client.on('error', (err) => reject(err));
    });
}


module.exports = { makeHttpRequest, search };
