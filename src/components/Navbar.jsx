import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { SiTask } from "react-icons/si";
import { GrLogout } from "react-icons/gr";



// import { FaUserCircle } from "react-icons/fa";

// import avatar from "../assets/avatar.png";

const Navbar = ({ user }) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/', {replace:true})
  }
  return (
    <>
      <div className="navComponent">
        <div className="navbar">
          <NavLink
            to={`/Tasklist/${user?.uid}`}
            style={{ fontSize: "1.8rem", textTransform: "capitalize" }}
          >
            <SiTask className="icons" />
            TaskManager<span style={{color:'#ed00eb', textTransform:'lowercase'}}>.ai</span>
          </NavLink>

          <ul>
            <li>
              <NavLink
                to="/CreateTask"
                style={{
                  padding: "10px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius:'15px'
                }}
              >
                {" "}
                + Create Task
              </NavLink>
            </li>
            <li style={{padding:'10px', fontSize:'18px',backgroundColor:'#ed00eb', borderRadius:'15px', color:'white', fontWeight:'bold', cursor:'pointer'}} onClick={() => logout()}>
              <GrLogout style={{marginRight:'10px', color:'white'}}/> Logout
            </li>
            <li>
              {}
              <motion.img
                whileTap={{ scale: 0.8 }}
                src={user?.photoURL}
                alt="avatar"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
