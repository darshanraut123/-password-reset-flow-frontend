import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import {domain} from "./env"



function ContinueReset() {


    const [message,setMessage] = useState("");
    const {email,randomstring} = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      cpass: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(4, "Should be at least 4 chars long!")
        .max(15, "Should be at max 15 chars long!")
        .required("Requried!"),
      cpass: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match!"
      ).required("Required!")
    }),
    onSubmit: (values) => {
      handleContinue(values);
    },
  });

  async function handleContinue(values) {
    try {
      const resp = await axios.post(
        `${domain}/users/change`,values,
        {
          headers: {
            email,
            randomstring
          }
        }
      );
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
          {message ? <div className="msg">{message}</div> : <div>Proceed with password change for {email}!</div>}
        </h3>
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
          name="reset"
          className="next action-button"
          value="Submit Reset"
        />
        <Link to="/">Login</Link>

            </div>

      </fieldset>

    </form>
  );
}

export default ContinueReset;
