
const express = require("express");
const app = express();
const path = require('path');
app.listen('5030',function(){
    console.log("server listening at 5030");
})

app.use(express.static('public'));
app.use(express.json());

let user=[]

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/auth",authRouter);

authRouter
.route('/signup')
.get(getsignup)
.post(singupUser)

authRouter
.route('/login')
.get(getloginPage)
.post(validateUser)

function getloginPage(req,res){
    res.sendFile(path.join(__dirname,"./public/login.html"));
}

function validateUser(req,res){
    console.log("validate");
    // console.log(user);
    let {email,password}=req.body;
    for(let i=0;i<user.length;i++){
        let obj = user[i];
        if(obj.email===email && obj.password===password){
            res.send(" user signed in")
        }
    }
    res.send("please sign up");
}

function getsignup(req,res){
    res.sendFile(path.join(__dirname,"./public/signup.html"));
}

function singupUser(req,res){
    let {email,password}=req.body;
    user.push({email,password});
    // console.log("user backend",req.body);\
    console.log(user);
    res.json({
        message: 'user singedup',
        user:req.body
        // user:user
    })
}

