const express=require("express");
const cors=require("cors"); 

const { patientList } = require("./params/patients");
const { usersList } = require("./params/users");
const { generateAccessToken } = require("./utils");
const { authenticateToken } = require("./middleware/auth");
const db = require("./models");



//config express
const app=express();
app.use(express.json()) 
//access nested objects
app.use(express.urlencoded(true)) 
 app.use(cors({origin: "http://localhost:3000"}))

 


// Endpoint, Route, web service, 
app.get("/patients", authenticateToken,function(request, response){
     
    let patients= await db.Patient.findAll({
        order:[ ['id', 'DESC']],
    });

    return response.json(patients)
    //200 ok , 400 invalid data, 500 internal, 404 not found 
 })

 // Endpoint, Route, web service, 
app.get("/users", async function(request, response){
     
    let users= await db.User.findAll({
        order:[ ['id', 'DESC']],
    });

    return response.json(users)

    //200 ok , 400 invalid data, 500 internal, 404 not found 
 })

 // add patient
app.post("/patient", authenticateToken,function(request, response){
    let firstName=request.body.firstName;
    
    let patient={
        firstName:firstName
    }

    //db.Patient.create(patient);
    
    return response.json({status:"success",payload: patient})

    //200 ok , 400 invalid data, 500 internal, 404 not found 
 })

 
 app.post("/login", function(request, response){
     
    let email=request.body.email;
    let password=request.body.password; 
 
    let users=usersList(); 
    //find return element or undefind
    
    let user= users.find(x=>x.email===email && x.password===password) 

    if(user){
        let token=generateAccessToken({email: user.email})
        return response.json({status: 'success',token: token})
    }
    else{
        return response.status(404).json({status: "failed", error: "user not found"})
    } 
    //200 ok , 400 invalid data, 500 internal, 404 not found 
 }) 

app.listen(8000,function(){
console.log("the server is listening to port 8000")
})
 

