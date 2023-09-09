import { Routes , Route, useNavigate } from "react-router-dom"
import "./index.scss";

import Tasklist from './components/Tasklist'
import CreateTask from './components/CreateTask'
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { fetchUser, userAccessToken } from "./utils/getUser";

function App() {
  

  const [user , setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = userAccessToken()
    if (!accessToken) {
      navigate('/' , {replace:true})
    }else{
      const [userInfo] = fetchUser()
      setUser(userInfo)
    }
  },[])

  return (
    <div className="app">
      
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="Tasklist/:userId" element={<Tasklist user = {user}/>}></Route>
        <Route path="CreateTask" element={<CreateTask user = {user}/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
    
  )
}

export default App
