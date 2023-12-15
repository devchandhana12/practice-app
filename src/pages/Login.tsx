import React from "react";
import { Formik, Form, Field } from "formik";
import { LoginImg } from "../assets";
import CardComp from "../stories/CardComp";
import ButtonComp from "../stories/Button";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
            onSubmit={() => {
              // Handle form submission logic
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
                <ButtonComp
                  color="#7E30E1"
                  onClick={() => {}}
                  style={{ width: "300px", borderRadius: 15 }}
                  disabled={isSubmitting}
                />
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
