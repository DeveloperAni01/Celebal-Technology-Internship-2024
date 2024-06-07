const http = require('http');

const port = 8000;
const address = '127.1.1.1';


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});


server.listen(port, address, (err) => {
  if (err) {
    console.log('Something went wrong! Please try again later.');
  } else {
    console.log(`The server is running at http://${address}:${port}/`);
  }
});
