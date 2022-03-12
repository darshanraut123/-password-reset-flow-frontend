import { Routes , Route} from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Reset from "./Reset";
import ContinueReset from "./ContinueReset";




function App() {
  return (
   
   <Routes>
     <Route path="/" element={<Login></Login>}></Route>
     <Route path="/register" element={<Register></Register>}></Route>
     <Route path="/forgotpassword" element={<Reset></Reset>}></Route>
     <Route path="/verify/:email/:randomstring" element={<ContinueReset></ContinueReset>}></Route>
   </Routes>
  )}

export default App;
