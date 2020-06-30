const http = require('http');
const fs = require('fs')

const PORT = 3000;

const rqListener = (req, res) => {
    const url = req.url
    const method = req.method
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Second Nodejs page</title></head>')
        res.write('<body>')

        res.write('<form action="/message" method="POST">')
        res.write('<input type="text" name="msg"/>')
        res.write('<button type="submit">Wyślij</button>')
        res.write('</form>')

        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST'){
        const body = []

        req.on('data', (chunk)=>{
            console.log('chunk: ', chunk);
            body.push(chunk)
            console.log('body :', body);
        })

        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString()
            console.log('parsedBody: ', parsedBody);
            const msg = parsedBody.split('=')[1]
            console.log('msg: ', msg);
            fs.writeFileSync('msg.txt', msg)
        })

        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>First Nodejs page</title></head>')
    res.write('<body>')

    res.write('<h1>Hello world</h1>')

    res.write('</body>')
    res.write('</html>')
    return res.end()

}

const server = http.createServer(rqListener);

server.listen(PORT);