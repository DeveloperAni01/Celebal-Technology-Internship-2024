const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 3000
const FILE_DIR = path.join('./files');


const myServer = http.createServer((req, res)=> {
    const url = req.url
    const filePath = path.join(FILE_DIR, 'test.txt')

    if(url === '/create'){
        //Creation of File
        fs.writeFile(filePath, `Hello World ! ${Date.now()}`, (err, data) => {
            if(err){
                return res.end('Error, to create file');
            }
            console.log('File Created !')
             return res.end('File Created Successfully !')
        })
    } else if (url === '/read'){
        //Reading a file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err){
                console.log(`error: ${err}`);
                return res.end('Error to read file !')
            }
            console.log('Data: ', data);
           return  res.end(`File Content: ${data}`)
           
        })
    } else if (url === '/delete'){
        //Delete file
        fs.unlink(filePath, (err) => {
            if(err){
                console.log(`error: ${err}`);
                return res.end("Error to delete file !")
            }
            console.log('File Deleted!');
            return res.end('File successfully deleted !')

        })
    } else {
        res.end('Route not found !!')
    }
    
})


myServer.listen(PORT,() => console.log(`Server is listening at port ${PORT} `))

