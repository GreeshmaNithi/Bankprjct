//import express
const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const dataService = require('./services/data.service')

//impot token
const jwt = require('jsonwebtoken')

//import cors
const cors = require('cors')

//create an server application using express

const app = express() 

// use cors to specify origin
app.use(cors({
    origin:'http://localhost:4200'
}))


//to parse json 
app.use(express.json())

//resolve http request from client

//GET http request is used to read data
app.get('/', (req,res)=>{
    res.status(401). send(" it's a get method....")
})

//POST http request used to create data
app.post('/',(req,res)=>{
    res.send("it's a post method")
})

//PUT request used to modify or update data
app.put('/',(req,res)=>{
    res.send("it's a put method")
})

//PATCH request used to update  partially data
app.patch('/',(req,res)=>{
    res.send("it's a patch method")
})

//DELETE request used to delete data from server
app.delete('/',(req,res)=>{
    res.send("it's a delete method")
})


//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log("application specific middleware");
    next()
}
app.use(appMiddleware)




//BANK App API


//to verify token middleware creation (router specific middleware)
const jwtMiddleware = (req,res,next) =>
{
try
   { const token = req.headers["x-access-token"]
    //verify token
  const data =  jwt.verify(token, 'supersecretkey')
    req.currentAcno = data.currentAcno
    next()}

catch{
    res.status(422). json({
        status : false,
        message : "please login"
    })
    }
}




//register api
app.post('/register',(req,res)=>{
    //asynchronous
    dataService.register(req.body.acno,req.body.password,req.body.uname)
    .then(result=>
        {
            res.status(result.statusCode).json(result)

        })
    })
    


//login api
app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.password)
    .then(result=>
        {
            res.status(result.statusCode).json(result)
        })
    
    })



//deposit api
app.post('/deposit',jwtMiddleware,(req,res)=>{
    //asynchronous
    dataService.deposit(req.body.acno,req.body.password,req.body.amt)
    .then(result=>
        {
            res.status(result.statusCode).json(result)
        })
    
    })


//withdrow api
app.post('/withdraw',jwtMiddleware, (req,res)=>{
    dataService.withdraw(req,req.body.acno,req.body.password,req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
    })



//get transaction api
app.post('/transaction',jwtMiddleware, (req,res)=>{
    dataService.getTransaction(req.body.acno)
    .then(result=>
        {
            res.status(result.statusCode).json(result)

        })
    })



//delete api
app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res)=>
{
    //asynchronous
    dataService.deleteAcc(req.params.acno)
    .then(result=>
        {
            res.status(result.statusCode).json(result);
        })
})














//set up the port number
app.listen(3000,()=>{
    console.log("run at 3000");
})


