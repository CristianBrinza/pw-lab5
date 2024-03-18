const process = require('process');
const { makeHttpRequest, search } = require('./http');

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case '-h':
        console.log('Usage:');
        console.log('go2web -u <URL>         # make an HTTP request to the specified URL and print the response');
        console.log('go2web -s <search-term> # make an HTTP request to search the term using your favorite search engine and print top 10 results');
        console.log('go2web -h               # show this help');
        break;
    case '-u':
        const url = args[1];
        if (!url) {
            console.error('URL is required');
            process.exit(1);
        }
        makeHttpRequest(url).then(console.log).catch(console.error);
        break;
    case '-s':
        const searchTerm = args.slice(1).join(' ');
        if (!searchTerm) {
            console.error('Search term is required');
            process.exit(1);
        }
        search(searchTerm).then(console.log).catch(console.error);
        break;
    default:
        console.error('Invalid command. Use go2web -h for help.');
        process.exit(1);
}
