

function listPatients(db){

   
    return async function (req,res) {

        let patients= await db.Patient.findAll(
            {
                where:{},
            include:[
                { model: db.Rdv }
            ],
            order:[ ['id', 'DESC']]
           }
        );

        return res.json(patients) 
    }
}



function addPatient(db){

   
 
    return async function (req,res) {
        try{ 
        let errors=[];
        if(!req.body.firstName) errors.push("no first name")
        if(!req.body.lastName) errors.push("no last name")

        if(errors.length>0)
        return res.status(400).json({status:"failed",error: errors.join(", ")})


       
        let newPatient={
            firstName:req.body.firstName,
            lastName:req.body.lastName
        }

        let patient=await db.Patient.create(newPatient)


        return res.status(201).json({status:"success",payload: patient});

    }
    catch(err){
        return res.status(500).json(err);
    }
    }
    
}

function updatePatient(db){

   
 
    return function (req,res) {

        return response.json('') 
    }
}

function deletePatient(db){
 
    return  async function (req,res) {

        try{ 
            let id=parseInt(req.params.id)

            let deleted= await db.Patient.destroy(
                {
                    where:{id: id} 
               }
            ); 
             return res.json(deleted) 
            
        }
        catch(err){
            return res.status(500).json(err);
        }
 
}
}

module.exports={listPatients,deletePatient,updatePatient,addPatient}
