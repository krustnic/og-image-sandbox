const fs = require('fs');
const path = require('path');

const express = require('express')

const app = express()
const port = 80

const getContent = (pageName, ogImagePath) => {
    return`
<html>
<head>
    <title>Title</title>
    <meta property="og:url" content="${pageName}">
    <meta property="og:title" content="og image server">
    <meta property="og:description" content="Owner">
    <meta property="og:image" content="${ogImagePath}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${ogImagePath}">
</head>
<body>
Boobs for everyone
</body>
</html>`
}

app.use((req, res, next) => {
    const filename = path.basename(req.url);
    const extension = path.extname(filename);
    if (extension === '.html') {
        console.log("ACCESS: ", JSON.stringify(req.url), JSON.stringify(req.headers));
    }
    
    next();
});

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/page', (req, res) => {
    console.log('ACCESS: ', JSON.stringify(req.url), JSON.stringify(req.headers));
    
    let content;
    
    if (req.query.type === '2') {
        content = getContent('http://og.repo.su/page', 'http://og.repo.su/og?type=2&amp;temp=1&amp;v=1');
    } else {
        content = getContent('http://og.repo.su/page', 'http://og.repo.su/og?type=1&amp;temp=1&amp;v=1');
    }
    
    res.send(content);
});

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