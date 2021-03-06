var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Pool = require('pg').Pool;


var config = {
    
    user: 'shantanu2010',
    database: 'shantanu2010',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password:'db-shantanu2010-62827'//process.env.DB_PASSWORD
     
};


var articles = {

     'article-one':{
        
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
            
        
    },
     'article-two' : {
        
         title: 'Article Two | Shantanu',
         heading: 'Article-Two',
        date: 'Feb 22,2017',
        content: `    
            <p>
                This is the content for my two article..
            </p> `
            
        
    },
     'article-three' : {
        
        title: 'Article Three | Shantanu',
        heading: 'Article-Three',
        date: 'Feb 22,2017',
        content: `    
            <p>
                This is the content for my third article..
             
            </p> `
    },       
        
};

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

var pool = new Pool(config);

app.get('/test-db', function(req,res){
    
  // make a select request and get a response  
  
  pool.query('SELECT * FROM test',function(err,result){
      
      if(err){
          
          res.status(500).send(err.toString());
          
      }
      else{
          
          res.SEND(JSON.stringify(result));
      }
      
  });
    
});

var  counter = 0;
app.get('/counter',function (req, res){
    
   counter = counter + 1;
    res.send(counter.toString());   
});
app.get('/articles/:articleName',function(req , res){
   
   var articleName = req.params.articleName; 
   
   pool.query("SELECT * FROM article WHERE title= '"+req.params.articleName+"'",function(err,result){
       
       if(err){
          
          res.status(500).send(err.toString());
          
      }
      else{
          if(result.rows.length===0){
              res.status(404).send('Article Not Found');
          }
          
          else{
              
              var articleData = result.rows[0];
              res.send(createTemplate(articlesData));
          }
      }
  
       
   }); 
  
});



/* app.get('/:article-two',function(req , res){
    
    res.send(createTemplate(articleTwo));
});

app.get('/:article-three',function(req , res){
    
    res.send(createTemplate(articleThree));
});
*/
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
