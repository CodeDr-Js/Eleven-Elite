import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/v1/users/login", values)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          localStorage.setItem("valid", true);
          navigate("/employee");
        } else {
          setError(result.response.data.message);
        }
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div className="container vh-100  d-flex align-items-center justify-content-center">
      <div className=" w-50 bg-success text-white p-5 shadow-lg ">
        <div className="">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center">LOGIN HERE</h1>
            {error ? (
              <p className="alert alert-danger text-uppercase f-italic">
                {" "}
                {error && error}
              </p>
            ) : (
              ""
            )}{" "}
            {/* <!-- Email input --> */}
            <div className="form-group">
              <label className="form-label fw-bold " htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="email"
                className="form-control mb-3 text-success"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <label className="form-label fw-bold " htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="form-control f-italic text-success"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <button className="btn btn-light text-success shadow-lg w-100 fw-bold fs-4 link-black  ">
              Login
            </button>
            <div className="d-flex mt-3 ">
              <div className="">
                <Link to={"/forgetPassword"} className="text-black">
                  Forget Password
                </Link>
              </div>
              <div className="ms-auto">
                <Link to={"/register"} className=" text-black">
                  Don't have an account? Register.
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
