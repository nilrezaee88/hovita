import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, userLogin } from "../statemangagment/apiSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.api.isAuthenticated);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch(userLogin(values));
      setSubmitting(false);
    }, 1000);
  };
  if (accessToken) {
    dispatch(fetchPosts());
    navigate("/feeds");
  }
  return (
    <Container className="d-flex align-items-center justify-content-center mt-5 pt-5">
      <Row className="border p-5 rounded w-50">
        <Col>
          <h1 className="text-center mb-4">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component={Alert}
                    variant="danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component={Alert}
                    variant="danger"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} block>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
