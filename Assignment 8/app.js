
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');
var mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const e = require('express');
var port = process.env.PORT || 8080;
mongoose.connect('mongodb+srv://reetesh:79894656@cluster0.1myllkn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

// mongoose.connect('mongodb://localhost:27017/mynewdb',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true},(err)=>{
//     if(!err)
//     {console.log('connected to db')
//  }
//  else{
//     console.log('error')
//  } });

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.listen(port);
// shoutout to the user
console.log('App started at port ' + port);
// expose app
exports = module.exports = app;


app.get('/',function(req,res){
    res.status(400).send("Hello please use postman for getting response. ");
});




const userSchema ={
    name: String,
    email: String,
    password: String
 };

 const userModel = mongoose.model('Users', userSchema);


 app.post('/user/create', async(req,res)=>{

    console.log("inside post function ");
    const data=new userModel({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    if(validateEmail(data.email) && checkPassword(data.password) && validateName(data.name))
    {
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(req.body.password,salt)
        data.password=hashedPassword
        const val=await data.save();
        res.json(val);
    }
    else{
        if(validateEmail(data.email)==false && checkPassword(data.password)==true && validateName(data.name)==true)
        {
            res.json("Enter the correct values for  email")
        }
        if(checkPassword(data.password)==false && validateEmail(data.email)==true && validateName(data.name)==true)
        {
            res.json("Enter the correct values for  password")
        }
        if(checkPassword(data.password)==true && validateEmail(data.email)==true && validateName(data.name)==false)
        {
            res.json("Enter the correct values for  Name")
        }
        else
        {
            res.json("Enter the correct values for  name ,email and password ")
        }
    }
 })

 
//PUT

app.put("/user/edit",async(req,res)=>{

    let upname=req.body.name;
    var uppassword=req.body.password;

    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(uppassword,salt)
    uppassword=hashedPassword

    //find id and Update
    if(checkPassword(req.body.password) && validateName(req.body.name) )
    {
    userModel.findOneAndUpdate({email:req.body.email},{$set:{name:upname,password:uppassword}},
        {new:true},(err,data)=>{
            if(data==null)
            {
                res.send("nothing founds")
            }
            else{
                res.send(data)
            }
        })
    }
    else
    {
        if(checkPassword(req.body.password)==false)
        {
            res.json("Enter the correct values for password")
        }
        if(validateName(req.body.name)==false)
        {
            res.json("Enter the correct values for Name")
        }
       else
        {
            res.json("Enter the correct values for password and name")
        }
        
    }
})


//FETCH GET USING NAME

app.get('/user/fetch',function(req,res){

    fetchname=req.body.name;
    userModel.find(({name:fetchname}),function(err,val){

        if(err)
        {
            res.send("Error is there")
        }
        else
        {
            if(val.length==0)
            {
                res.send("data does not exists")
            }
            else
            {
                res.send(val);
            }

        }

    })

})


//FETCH ALL
app.get("/user/getall",(req,res)=>{

    userModel.find((err,val)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.json(val)
        }
    })
})


//DELETE
app.delete('/user/delete',function(req,res){

      let email=req.body.email;

    if(validateEmail(email))
    {

        userModel.findOneAndDelete(({email:email}),function(err,data){
                res.send(data);
        })
    }
    else{
        res.send("Email id is not valid and Data input is wrong")
    }
   

}

)


const validateEmail = (mail)  =>
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }

  return (false)
}

const checkPassword = (inputtxt) => { 
  var passw=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if(inputtxt.match(passw)) 
  { 
    return true;
  } else { 
    return false;
  }
}

const validateName = (inputtxt) => { 
    var passw= /^([a-zA-Z ]){2,30}$/;
    if(inputtxt.match(passw)) 
    { 
      return true;
    } else { 
      return false;
    }
  }