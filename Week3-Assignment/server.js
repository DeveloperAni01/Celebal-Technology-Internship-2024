//Celebal-Technology Summer Internship 2024, Week3 Assignment- "Refactor Week2 Assignment Code Using Async/Await and proper error handling"

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 3000;
const FILE_DIR = path.join('./files');
const filePath = path.join(FILE_DIR, 'test.txt');

const myServer = http.createServer(async (req, res) => {
    const requestUrl = req.url;

    if (requestUrl === '/create') {
        try {
            await fs.writeFile(filePath, `Hello World! ${Date.now()}`);
            console.log('File Created!');
            res.end('File Created Successfully!');
        } catch (err) {
            console.error(`Error creating file: ${err}`);
            res.end('Error creating file!');
        }
    } else if (requestUrl === '/read') {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            console.log('Data: ', data);
            res.end(`File Content: ${data}`);
        } catch (err) {
            console.error(`Error reading file: ${err}`);
            res.end('Error reading file!');
        }
    } else if (requestUrl === '/delete') {
        try {
            await fs.unlink(filePath);
            console.log('File Deleted!');
            res.end('File successfully deleted!');
        } catch (err) {
            console.error(`Error deleting file: ${err}`);
            res.end('Error deleting file!');
        }
    } else {
        res.end('Route not found!');
    }
});

myServer.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));

