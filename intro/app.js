const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    
    const url = req.url
    const method = req.method 



    if( url === '/') {
        res.write('<html><body><form action="/message" method="post"><input type="text" name="message" /><button type="submit">Submit</button></form></body></html>')
        return res.end()
    }

    if( url === '/message' && method === 'POST'){
            const chunks = []
    req.on('data',(chunk) => {
        chunks.push(chunk)
        console.log(chunk);
    })

    req.on('end',()=>{
        const parsedBody = Buffer.concat(chunks).toString();
        const message = parsedBody.split('=')[1]
        fs.writeFileSync('message.txt', message)
        res.statusCode = 302
        res.setHeader('Location','/')
        return res.end()
        
    })
        res.statusCode = 200
        res.write('<html><h1> Node js executed before end event</h1></html>')
        return res.end()
    }

   
})

console.log(server);
server.listen(3000);
