var express = require('express');

// start the app / server
var app = express();
var server = app.listen(process.env.PORT || 3000 , function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

// serve static files
app.use(express.static(__dirname + '/public/'));

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// home
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Chair',
        home: 'active',
        navHide: 'hide'
    });
});

// products
app.get('/products', function(req, res) {
    res.render('products', {
        title: 'Products',
        products: 'active'
    });
});


// our story
app.get('/our-story', function(req, res) {
    res.render('our-story', {
        title: 'Our Story',
        ourStory: 'active'
    });
});


// their story
app.get('/their-story', function(req, res) {
    res.render('their-story', {
        title: 'Their Stories',
        theirStory: 'active'
    });
});


// press
app.get('/press', function(req, res) {
    res.render('press', {
        title: 'Press',
        press: 'active'
    });
});
