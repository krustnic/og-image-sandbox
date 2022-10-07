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
        content = getContent('http://og.repo.su/page', 'https://arenda.yandex.ru/og-image/?type=landing-calculator-arenda&address=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C+%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C+%D0%9A%D1%83%D1%88%D0%B5%D0%BB%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B0&numberOfRooms=0&area=64&floor=6&renovation=RENOVATION_DESIGNER_RENOVATION');
    } else {
        content = getContent('http://og.repo.su/page', 'https://arenda.yandex.ru/og-image/?type=landing-calculator-arenda&address=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C+%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C+%D0%9A%D1%83%D1%88%D0%B5%D0%BB%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B0&numberOfRooms=4&area=200&floor=6&renovation=RENOVATION_DESIGNER_RENOVATION');
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