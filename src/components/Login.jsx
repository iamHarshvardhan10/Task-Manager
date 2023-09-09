import { SiTask } from "react-icons/si";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase.config";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const firestoreDB = getFirestore(app);
  const navigate = useNavigate()

  

  const login = async () => {
    const { user } = await signInWithPopup(auth, provider);

    const { refreshToken, providerData } = user;

    // localstorge mai user value save karne ke liye

    localStorage.setItem("usersInfo", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    // data base store

    await setDoc(doc(firestoreDB, "users", providerData[0].uid), providerData[0]);

    // navigate to home page

    navigate(`/Tasklist/${providerData[0].uid}` , {replace:true})

  };

  return (
    <>
      <div className="loginPage">
        <div className="heading">
          <h2>
            {" "}
            <SiTask className="icons" style={{ marginRight: "10px" }} />
            TaskManager.ai
          </h2>
        </div>

        <div className="column">
          <div className="row1">
            <h3>
              TaskManager AI is tool to help you to create flexible task with
              user friendly UI.
            </h3>
            <p>Shape Your Daily Habit Routine be a designer of our own life</p>
            <button onClick={() => login()}>Try TaskManager</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
