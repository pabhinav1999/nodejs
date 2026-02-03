const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req)
})

console.log(server);
server.listen(3000);
