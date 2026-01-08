import { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import './TeacherPage.css';
export default function TeacherPage(){
    const [data,setData]=useState([]);
    const [student,setStudent]=useState([]);
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
    

    const handleStudents=async(department,section)=>{
        const send={department,section};
        try{
        const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/Student/getParticularStudent',send,{withCredentials:true});
        if(response.data.message=== 'Got ALL Student'){
            setStudent(response.data.data);
        }
        }catch(err){
            if(err.response?.data?.message=== 'no student found'){
                alert('No Student Found');
            }else if(err.response?.data?.message=== 'provide department and section and gmail'){
                alert('provide proper detail');
            }
        }
    }
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
    <button onClick={()=>handleStudents(data?.department,data?.section)}>Show All Students of this class</button>
                </div>   
                </div>

                {student.map((all,index)=>(
                    <div key={index}>
                        <p>{all?.userId?.name}</p>
                        <p>{all?.userId?.gmail}</p>
                        <p>{all?.rollNo}</p>
                        <p>{all?.branch}</p>
                        <p>{all.section}</p>
                        <p>{all.semester}</p>
                    </div>
                ))}
        </>
    );
}