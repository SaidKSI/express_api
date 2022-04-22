 


function addRdv(db){

    return async function (req,res) {
        try{ 
        let errors=[];
        if(!req.body.motif) errors.push("no motif")
        if(!req.body.patientId) errors.push("no patient Id")
        if(!req.body.date) errors.push("no date")

        if(errors.length>0)
        return res.status(400).json({status:"failed",error: errors.join(", ")})

        let patientId=parseInt(req.body.patientId)

        let date=new Date(req.body.date);
 
        let newRdv={
            motif:req.body.motif,
            
            daterdv: date,
            patientId:patientId
        }
      
        let rdv= await db.Rdv.create(newRdv)


        return res.status(201).json({status:"success",payload: rdv});

    }
    catch(err){
        return res.status(500).json(err);
    }
    }
    
} 


function listRdv(db){

   
    return async function (req,res) {

        let rdvs= await db.Rdv.findAll(
            {
                where:{},
            include:[
                { model: db.Patient }
            ],
            order:[ ['id', 'DESC']]
           }
        );

        return res.json(rdvs) 
    }
}

module.exports={addRdv,listRdv}
