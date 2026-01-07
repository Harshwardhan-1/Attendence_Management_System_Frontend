import { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import './TeacherPage.css';
export default function TeacherPage(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
        const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/Teacher/getTeacher',{withCredentials:true});
        if(response.data.message=== 'ProfileFind'){
            setData(response.data.data);
        }
            }catch(err){
                if(err.response?.data?.message=== 'Teacher Not Found'){
                    alert('please enter correct Detail');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
          <div className="teacher-page">
        <h1>This Is Teacher Page</h1>
        <div className="teacher-card">
                <p><span>Name:</span>{data?.name}</p>
                <p><span>Email:</span>{data?.gmail}</p>
                <p><span>Teacher ID</span>{data?.teacherId}</p>
                <p><span>Subject:</span>{data?.subject}</p>
                <p><span>Department:</span>{data?.department}</p>
                <p><span>Section:</span>{data?.section}</p>
                </div>   
                </div>
        </>
    );
}