import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {domain} from "./env"

function Register() {
    const [message,setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Should be an email!").required("Requried!"),
      password: Yup.string()
        .min(4, "Should be at least 4 chars long!")
        .max(15, "Should be at max 15 chars long!")
        .required("Requried!"),
      cpass: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match!"
      ),
    }),
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  async function handleRegister(values) {
    try {
      const resp = await axios.post(`${domain}/users/register`, values);
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
        <h2 className="fs-title">Create your account</h2>
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
        <div className="inputContainer">
          {formik.errors.cpass ? <small>{formik.errors.cpass}</small> : null}
          <input
            type="password"
            name="cpass"
            placeholder="Confirm Password"
            value={formik.values.cpass}
            onChange={formik.handleChange}
          />
        </div>
        <div className="foot">
            
        <input
          type="submit"
          name="register"
          className="next action-button"
          value="Register"
        />
        <Link to="/">Login</Link>

            </div>

      </fieldset>

    </form>
  );
}

export default Register;
