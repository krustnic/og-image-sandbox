const path = require('path');

const express = require('express')

const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/og', (req, res) => {
    console.log('ACCESS: ', JSON.stringify(req.url), JSON.stringify(req.headers));
    
    if (req.query.type === '2' && req.query.temp === '1') {
        return res.sendFile(path.join(__dirname, './assets/og2.png'));
    }
    
    res.sendFile(path.join(__dirname, './assets/og1.png'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})