import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);  
  
  async function getPatients(){

      try{
        setLoading(true)
        let response=await axios.get("http://localhost:8000/patients",{headers: {Authorization: "Bearer "+localStorage.getItem("user_token")}}); 

        let list=response.data; 
        setPatients(list) 
        setLoading(false)
      }
      catch(err){
 
        setLoading(false)
      }
    
    }


  useEffect(() => {
    
    getPatients()
  }, []); 

  return (
    <div className="">
      <table className="w-full">
        <tr className="flex justify-between">
          <th>Nom</th>
          <th>Prenom</th>
        </tr>
        {patients.map((patient, index) => (
        
          <tr id={patient.id} className="flex justify-between"> 
           <Link to={"/patients/"+patient.id}>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td> 
             </Link>
          </tr>
        
        ))}
      </table>

      <div>
        {
          loading ? 
          <p>Chargement...</p> :
          ''
        }
      </div>
    </div>
  );
}
