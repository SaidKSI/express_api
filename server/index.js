const express=require("express");
const cors=require("cors"); 

const {  } = require("./params/patients");
const { usersList } = require("./params/users");
const { generateAccessToken } = require("./utils");
const { authenticateToken } = require("./middleware/auth");

//database
const db = require("./models");

const { listPatients, deletePatient, addPatient,detailsPatient } = require("./controllers/patients.controller");
const { addRdv, listRdv } = require("./controllers/rdv.controller");



//config express
const app=express();
app.use(express.json()) 
//access nested objects
app.use(express.urlencoded(true)) 
 app.use(cors({origin: "http://localhost:3000"}))

 


// Endpoint, Route, web service, 
app.get("/patients", authenticateToken,listPatients(db))

//add patient
app.post("/patients", authenticateToken,addPatient(db))

app.get("/patients/:id", authenticateToken,detailsPatient(db))

app.delete("/patients/:id", authenticateToken,deletePatient(db))


app.get("/rdvs", authenticateToken,listRdv(db))

app.post("/rdv", authenticateToken,addRdv(db))

 // Endpoint, Route, web service, 
app.get("/users", async function(request, response){
     
    let users= await db.User.findAll({
        order:[ ['id', 'DESC']],
    });

    return response.json(users)

    //200 ok , 400 invalid data, 500 internal, 404 not found 
 })

 
 
 app.post("/login", async function(request, response){
     
    let email=request.body.email;
    let password=request.body.password; 
 
    
    let user=await db.User.findOne({
        where:{
            email: email,
            password: password
        }
    }) 

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
 

