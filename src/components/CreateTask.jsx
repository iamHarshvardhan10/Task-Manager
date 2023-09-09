import { useState } from "react";
import Navbar from "./Navbar";

import Alert from "react-bootstrap/Alert";

import { app } from "../firebase.config";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/getUser";

const CreateTask = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState("");

  const [userInfo] = fetchUser();

  const firestoreDB = getFirestore(app);

  const navigate = useNavigate();

  const uploadDetails = async () => {
    try {
      if (!title && !desc) {
        setShow("All field Required");
      } else {
        const data = {
          id: `${Date.now()}`,
          task_name: title,
          task_description: desc,
          task_due_date: date,
          userId: userInfo.uid,
        };
        await setDoc(doc(firestoreDB, "taskDet", `${Date.now()}`), data);
        navigate(`/Tasklist/${user?.uid}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar user={user} />

      <div className="createTask">
        <div className="form">
          <h2
            style={{
              textAlign: "center",
              fontSize: "18px",
              backgroundColor: "red",
              width: "350px",
              borderRadius: "25px",
              marginBottom: "30px",
            }}
          >
            {show}
          </h2>
          <h1>Create Your Task Here!</h1>
          <input
            type="text"
            placeholder="Enter Your Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Task"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn" onClick={() => uploadDetails()}>
            Create Task
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
