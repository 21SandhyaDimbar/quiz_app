import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import "./home.css";


const Home = () => {
  const navigate=useNavigate();
const handleStart=() =>{
      navigate("/quiz");
}

  
return (
  <div className="content">
     <div className="setting">
     <Button variant="contained" color="primary"
      style={{width:'50%', fontSize:'25px'}}
      onClick={handleStart}>
      Start Quiz</Button>
     </div>
     
  </div>
);
}
export default Home;
