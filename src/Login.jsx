import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {domain} from "./env"
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [message,setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Should be an email!").required("Requried!"),
      password: Yup.string().required("Requried!"),
    }),
    onSubmit: (payload) => {
      handleLogin(payload);
    },
  });

  async function handleLogin(payload){
    await axios.post(`${domain}/users/`)
    
  }


  
  return (
    <form id="msform" onSubmit={formik.handleSubmit}>
      <fieldset>
        <h2 className="fs-title">Login</h2>
        <h3 className="fs-subtitle">
          {message ? <div className="msg">{message}</div> : <div>Have a good day!</div>}
        </h3>
        <div className="inputContainer">
          {formik.errors.email ? <small>{formik.errors.email}</small> : null}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="inputContainer">
          {formik.errors.password ? (
            <small>{formik.errors.password}</small>
          ) : null}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="foot">
            
            <input
              type="submit"
              name="login"
              className="next action-button"
              value="Login"
            />
            <Link to="/forgotpassword">Forgot password?</Link>
            <Link to="/register">Register</Link>
    
                </div>
      </fieldset>
    </form>
  );
}

export default Login;
