import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {domain} from "./env"

import { Link } from "react-router-dom";
import { useState } from "react";

function Reset() {

    const [message,setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Should be an email!").required("Requried!"),
    }),
    onSubmit: (payload) => {
        handleReset(payload.email);
    },
  });

  async function handleReset(email) {
    try {
      const resp = await axios.post(`${domain}/users/reset-send`, { email });
      if (resp.status === 200) {
        setMessage(resp.data.message);

        formik.resetForm();
      } else if (resp.status === 201) setMessage(resp.data.message);
      else setMessage(resp.data.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  
  return (
    <form id="msform" onSubmit={formik.handleSubmit}>
      <fieldset>
        <h2 className="fs-title">Reset</h2>
        <h3 className="fs-subtitle">
          {message ? <div className="msg">{message}</div> : <div>Have a good day!</div>}
        </h3>
        {!message.includes("Sent") ? (
          <>
            <div className="inputContainer">
              {formik.errors.email ? (
                <small>{formik.errors.email}</small>
              ) : null}
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>

         
          </>
        ) : null}
           <div className="foot">
              <input
                type="submit"
                name="reset"
                className="next action-button"
                value="Reset"
              />
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </div>
      </fieldset>
    </form>
  );
}

export default Reset;