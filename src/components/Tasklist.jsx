import { AiFillDelete } from "react-icons/ai";
import Navbar from "./Navbar";
import {deleteDoc, doc, getFirestore } from 'firebase/firestore'
import {app} from '../firebase.config'
import { useEffect, useState } from "react";

import {  getAllTask } from "../utils/getData";
import { useParams } from "react-router-dom";

const Tasklist = ({ user }) => {
  const {userId} = useParams()
  const firestoreDb = getFirestore(app)
  const [task , setTask] = useState(null)

  
  const deleteTheTask = async (taskId) => {
    try {
      const taskdel = doc(firestoreDb,"taskDet",taskId)
      await deleteDoc(taskdel)

      setTask((prev) => prev.filter((task) => task.id !== taskId))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(userId){
      getAllTask(firestoreDb,userId).then((data) => {
        setTask(data)
       
        
      })
    }
  },[userId,firestoreDb])

 

  return (
    <>
      <Navbar user={user} />

      <div className="box_task">
        {task && task.map((data) => (
          <div className="box" key={data.id}>
            <div className="boxFlex">
              <div>
                <h2>{data.task_name}</h2>
              </div>
              <div>
                <AiFillDelete style={{cursor:'pointer', fontSize: "24px", color:'white' }} onClick={() => deleteTheTask(data.id)} />
              </div>
            </div>
            <div className="row">

            <p>{data.task_description}</p>
            <span>{data.task_due_date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasklist;
