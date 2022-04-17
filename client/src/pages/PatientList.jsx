import React, { useEffect, useState } from "react";
import axios from "axios";
export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    
    async function getPatient(){

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
    
    getPatient()
  }, []); 

  return (
    <div className="">
      <table className="w-full">
        <tr className="flex justify-between">
          <th>Nom</th>
          <th>Prenom</th>
        </tr>
        {patients.map((patient, index) => (
          <tr className="flex justify-between">
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
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
