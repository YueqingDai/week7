let express = require('express'); // include the express module here, and store in the variable "express"
let app = express();
app.use(express.json());

let datastore = require('nedb');
let db = new datastore('data.db');
db.loadDatabase();

app.use("/", express.static("public"));


//POST route for message
app.post("/message", (req,res) => {
  console.log(req.body);
  let NowDate = Date();
  let t = new Date();
  let Nowmonth = t.getMonth();
  let obj = {
    date: NowDate,
    month: Nowmonth,
    msg: req.body.msg,
    userid: req.body.Userid
  }

  db.insert(obj,(err,nweDocs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      res.json({status: "success"});
    }
    //console.log('new info insert');
    
  })
  
})

//Where can we see the app running
/*app.listen(3000, () => {
  console.log("app is running at localhost:3000");
})*/

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log('listening at ', port);
});


app.get('/getmessage',(req,res)=>{

  db.find({},(err,docs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      let objq = {inspiration:docs};
      res.json(objq);
    }
    //console.log(docs);
   
  
  })
  
})