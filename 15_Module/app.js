const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const defaultfilename = 'index.html'; 

http.createServer(function(req,res){
    let filename = url.parse(req.url).pathname;
    console.log(filename)
    if(filename==="/"){
        filename+=defaultfilename;
    }
    filename = path.join(__dirname,filename);
    console.log(filename);
    fs.stat(filename,function(err,stats){
        if(!err&&stats.isFile()){
            res.writeHead(200,{'Content-type':mime.getType(filename)});
            fs.createReadStream(filename,{encoding:'utf-8'}).pipe(res);
        }else{
            res.writeHead(404);
            res.write('404. Not Found.');
        }
    })
    
}).listen(5000);

console.log("http listening on 5000.");