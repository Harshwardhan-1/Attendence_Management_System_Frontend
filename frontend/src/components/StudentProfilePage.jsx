import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';

import './StudentProfilePage.css';
export default function StudentProfilePage({newUserData}){
    const [profileData,setProfileData]=useState('');
    const [attendence,setAttendence]=useState('');
    const [subject,setSubject]=useState('');
    const[teacher,setTeacher]=useState('');
    useEffect(()=>{
        const fetch=async()=>{
            try{
    const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/Student/CheckProfileExist',{withCredentials:true});
    setProfileData(response.data.data);
            }catch(err){
                console.log("profile not found",err);
            }
        };
        fetch();
    },[])
    console.log(newUserData?.rollNo);
    const handle=async(e)=>{
        e.preventDefault();
        const send={attendence,subject,teacher};
        try{
const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/StudentAttendence/markAttendence',send,{withCredentials:true});
if(response.data.message=== 'user attendence mark successfully'){
    alert('Attendence marked for current subject');
}
    }catch(err){
        if(err.response?.data?.message=== 'Attendence already marked for today'){
            alert('your attendence for this subject for today has been marked successfully');
        }
    }
    }
    return(
        <>
         <div className="student-profile">
        <h1>Welcome to your profile </h1>
        <p>Name:  {profileData.userId?.name}</p>
        <p>Email: {profileData.userId?.gmail}</p>
        <p>RollNo: {profileData?.rollNo}</p>
        <p>Section: {profileData?.section}</p>
        <p>Semester: {profileData?.semester}</p>
        <p>Branch: {profileData?.branch}</p>
        </div>

        
        <form onSubmit={handle}>
            <select onChange={(e)=>setSubject(e.target.value)}>
                <option value="Select Subject">Select Subject</option>
                <option value="C++">C++</option>
                <option value="java">java</option>
                <option value="rust">rust</option>
                <option value="golang">golang</option>
            </select>
            <select onChange={(e)=>setAttendence(e.target.value)}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
            </select>
            <select onChange={(e)=>setTeacher(e.target.value)}>
                <option value="Harsh">Harsh</option>
                <option value="Jay">Jay</option>
                <option value="Yadav">Yadav</option>
                <option value="Rathore">Rathore</option>
            </select>
            <button type='submit'>Submit</button>
        </form>
        </>
    );
}