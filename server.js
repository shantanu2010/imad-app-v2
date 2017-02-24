var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne = {
    
    title: 'Article One | Shantanu',
    heading: 'Article-One',
    date: 'Feb 22,2017',
    content: `    
        <p>
            
            This is the content for my first article..This is the content for my first article..
            This is the content for my first article..
            This is the content for my first article..This is the content for my first article..
        </p>
        
         <p>
            
            This is the content for my first article..This is the content for my first article..
            This is the content for my first article..
            This is the content for my first article..This is the content for my first article..
        </p>
        
         <p>
            
            This is the content for my first article..This is the content for my first article..
            This is the content for my first article..
            This is the content for my first article..This is the content for my first article..
        </p> `
        
    
}


var articleTwo = {
    
    title: 'Article Two | Shantanu',
    heading: 'Article-Two',
    date: 'Feb 22,2017',
    content: `    
        <p>
            This is the content for my two article..
        </p> `
        
    
}

var articleThree = {
    
    title: 'Article Three | Shantanu',
    heading: 'Article-Three',
    date: 'Feb 22,2017',
    content: `    
        <p>
            This is the content for my third article..
         
        </p> `
        
    
}

function createTemplate(data){
    
    
    var heading=data.heading;
    var date = data.date;
    var title=data.title;
    var content = data.content;
    


    var htmlTemplate =`
    <html>
        <!DOCTYPE html>
        
        <head>
            
            <title>
                ${title} 
                </title>
            <meta name = "viewport" contents ="width=device-width, initial-scale=1" />
            
            <link href="/ui/style.css" rel="stylesheet" />
            
            
    </head>
    
    <body>
        
        <div class = "container">
        
        <div>
            
            <a href ="/">Home</a>
            
        </div>
        
        <h3>
            
            ${heading}
            
        </h3>
        
        <div>
            ${date}
            
        </div>
        
        <div>
            
            ${content}
            
        </div>
        </div>
    </body>
    </html>
    
    
    `;
    
    return htmlTemplate;
    
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req , res){
    
  res.send(createTemplate(articleOne));
});

app.get('/article-two',function(req , res){
    
    res.send(createTemplate(articleTwo));
});

app.get('/article-three',function(req , res){
    
    res.send(createTemplate(articleThree));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
