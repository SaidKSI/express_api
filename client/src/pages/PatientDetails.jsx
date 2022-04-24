import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  async function getPatient(patientId) {
    try {
      setLoading(true);
      let response = await axios.get(
        "http://localhost:8000/patients/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );

      let { payload } = response.data;
      setPatient(payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      let pid = parseInt(id);

      getPatient(pid)
    } catch (err) {

        alert("not found")
    }
  }, []);

  return loading ? <div>loading...</div> : 
  <div>
 {
     patient?
     <div> {patient.firstName}</div>
     :
     ''
 }
  </div>
}
