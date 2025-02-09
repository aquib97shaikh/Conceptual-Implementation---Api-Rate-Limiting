const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const post = require("./initialData");
const port = 3000
app.use(express.urlencoded());
let cache = {id:null,maxId:10,count:5};
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const clearCache = () =>{
    cache.count = 5;
    cache.id = null;
}
// your code goes here
app.get("/api/posts",async (req,res) =>{
    let limit = req.query.max == undefined ? 10 : req.query.max;
    limit = limit>20 ? 10 : limit;
    console.log(limit);
    if(cache.count >0){
        if(cache.id===null){
            cache.id = setTimeout(clearCache,30*1000);
            cache.maxId = limit;
        }
        limit = Math.min(cache.maxId,limit);
        res.send(post.slice(0,limit));
        cache.count = cache.count - 1;
    }else{
        res.status(429).send({
            message:"Exceed Number of API Calls",
        })
    }
    
    
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
