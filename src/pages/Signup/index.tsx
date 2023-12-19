import React from "react";
import { Formik, Form, Field } from "formik";
import { createClient } from "@supabase/supabase-js";
import { SignUpImg } from "../../assets";
import CardComp from "../../stories/CardComp";
import ButtonComp from "../../stories/Button";
import { useNavigate } from "react-router-dom";
import Login from "../Login";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  // supabase auth details
  const supaUrl = "https://flfswbbkbwfdkdnizwai.supabase.co";
  const supaKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZnN3YmJrYndmZGtkbml6d2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MzcyNjUsImV4cCI6MjAxODIxMzI2NX0.zQLEGkYaxH3xMx0Nz0EQpD7IjadYSbt7qbzcV0bQelo";
  const supabase = createClient(supaUrl, supaKey);
  return (
    <div className="d-flex align-items-center justify-content-around">
      <div style={{ width: "45%" }}>
        <img src={SignUpImg} alt="signup img" className="img-fluid" />
      </div>
      <div>
        <CardComp>
          <h6>Enter the details below to sign up</h6>
          <Formik
            initialValues={{ email: "", password: "", username: "" }}
            onSubmit={async (values, { resetForm }) => {
              setIsSubmitting(true);
              try {
                const { data, error } = await supabase.auth.signUp({
                  email: values.email,
                  password: values.password,
                  options: {
                    data: {
                      username: values.username,
                    },
                  },
                });

                if (error) {
                  console.error(error);
                  return;
                }

                // If signup is successful, update user data
                await supabase
                  .from("users")
                  .update({ username: values.username })
                  .eq("id", data?.user?.id);

                console.log(data);
                resetForm();
                navigate("/login");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {(formikProps) => (
              <Form className="d-flex flex-column align-items-center">
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter user name"
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
        </CardComp>
      </div>
    </div>
  );
};
export default SignUp;
