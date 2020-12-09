const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const post = require("./initialData");
const port = 3000
app.use(express.urlencoded());
let cache = {id:null,maxId:10,count:5,start:0};
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const clearCache = () =>{
    cache.count = 5;
}
// your code goes here
app.get("/api/posts",async (req,res) =>{
    let limit = req.query.max == undefined ? 10 : req.query.max;
    console.log(limit);
    if(cache.count >0){
        if(cache.id===null){
            cache.id = setTimeout(clearCache,30*1000);
            cache.maxId = limit;
        }
        limit = Math.min(cache.maxId,limit);
        start = cache.start;
        res.send(post.slice(start,limit+start));
        cache.start = limit + start;
        cache.count = cache.count - 1;
    }else{
        res.status(429).send({
            message:"Exceed Number of API Calls",
        })
    }
    
    
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
