const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let file = 'index'
    switch (req.url) {
        case '/':
            file = 'index';
            break;
        case '/about':
            file = 'about';
            break;
        case '/contact':
            file = 'contact';
            break;

    }
    fs.readFile(`./views/${file}.html`, 'utf-8', (err, data) => {
        res.write(data);
        res.end();
    })
})

server.listen(process.argv[2], () => {
        console.log(`Server started on port ${process.argv[2]}`);
        console.log(`http://localhost:${process.argv[2]}`)
    }
);