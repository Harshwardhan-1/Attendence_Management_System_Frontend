import { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
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
        <h1>This Is Teacher Page</h1>
                <p>{data?.name}</p>
                <p>{data?.gmail}</p>
                <p>{data?.teacherId}</p>
                <p>{data?.subject}</p>
                <p>{data?.department}</p>
                <p>{data?.section}</p>
    
        </>
    );
}