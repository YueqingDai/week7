let express = require('express'); // include the express module here, and store in the variable "express"
let app = express();
app.use(express.json());

let datastore = require('nedb');
let userDB = new datastore('db/data.db');
userDB.loadDatabase();

let ContentDB = new datastore('db/content.db');
ContentDB.loadDatabase();

app.use("/", express.static("login"));
app.use("/island", express.static("island"));

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log('listening at ', port);
});


//POST route for message
app.post("/user", (req,res) => {
  console.log(req.body);
  let NowDate = Date();
  let obj = {
    userid: req.body.Userid,
    pwd: req.body.pwd,
    date: NowDate
  }

  userDB.insert(obj,(err,nweDocs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      res.json({status: "success"});
    }
    console.log('new info insert');
    
  })
  
})

app.get('/user',(req,res)=>{

  userDB.find({},(err,docs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      let objq = {users:docs};
      res.json(objq);
    }
    //console.log(docs);
  
  })
})

//POST route for message
app.post("/Content", (req,res) => {
  console.log(req.body);
  let NowDate = Date();
  let obj = {
    w_id:req.body.W_id,
    r_id:req.body.R_id,
    praise:req.body.praise,
    date: NowDate
  }

  ContentDB.insert(obj,(err,nweDocs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      res.json({status: "success"});
    }
    console.log('new info insert');
    
  })
  
})

app.get('/Content',(req,res)=>{

  ContentDB.find({},(err,docs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      let objq = {praise:docs};
      res.json(objq);
    }
    //console.log(docs);
  
  })
})
