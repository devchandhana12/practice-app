import React from "react";
import { Formik, Form, Field } from "formik";
import { LoginImg } from "../../assets";
import CardComp from "../../stories/CardComp";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  // supabase auth details
  const supaUrl = "https://flfswbbkbwfdkdnizwai.supabase.co";
  const supaKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZnN3YmJrYndmZGtkbml6d2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MzcyNjUsImV4cCI6MjAxODIxMzI2NX0.zQLEGkYaxH3xMx0Nz0EQpD7IjadYSbt7qbzcV0bQelo";
  const supabase = createClient(supaUrl, supaKey);

  const { login, user } = React.useContext(AuthContext);
  console.log(user);
  return (
    <div className="d-flex align-items-center justify-content-around">
      <div style={{ width: "45%" }}>
        <img src={LoginImg} alt="login img" className="img-fluid" />
      </div>
      <div>
        <CardComp>
          <h6 style={{ fontStyle: "italic" }}>Login to access content</h6>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { resetForm }) => {
              setIsSubmitting(true);
              await supabase.auth
                .signInWithPassword({
                  email: values.email,
                  password: values.password,
                })
                .then((data) => {
                  console.log(data.data.user);
                  login(data.data.user?.user_metadata.username);
                  resetForm();
                  navigate("/home");
                })
                .catch((err) => console.log(err));
            }}
          >
            {(formikProps) => (
              <Form className="d-flex flex-column align-items-center">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    background: "transparent",
                    transition: "background 0.3s",
                    ":focus": { background: "#e6e6e6" },
                    color: "white",
                    width: "300px",
                    margin: "10px",
                  }}
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    background: "transparent",
                    transition: "background 0.3s",
                    ":focus": { background: "#e6e6e6" },
                    color: "white",
                    width: "300px",
                    margin: "10px",
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: "#7E30EC",
                    color: "white",
                    width: 300,
                    borderRadius: 15,
                    outline: "none",
                    padding: 8,
                    border: "none",
                  }}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-3" style={{ fontSize: 14 }}>
            Don't have an account !! feel free to <a href="/Signup">Signup</a>
          </p>
        </CardComp>
      </div>
    </div>
  );
};

export default Login;
