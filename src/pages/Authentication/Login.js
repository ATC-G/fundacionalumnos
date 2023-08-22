import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Label,
  Row,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";

import logo from "../../assets/images/uilogo.png";
import { useState } from "react";
import { postJwtLogin } from "../../helpers/auth";
import { ERROR_SERVER } from "../../constants/messages";
import extractMeaningfulMessage from "../../utils/extractMeaningfulMessage";

function Login() {
  const [error, setError] = useState("");
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: "santiago.figueroa94@gmail.com" || "",
      password: "P4ssw0rd12145",
      tipoUsuario: "Alumno",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Usuario requerido"),
      password: Yup.string().required("Contraseña requerido"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const response = await postJwtLogin(values);
        if (response) {
          localStorage.setItem(
            "escuelafrontend",
            JSON.stringify({ token: response })
          );
          window.location.href = "/";
        }
      } catch (error) {
        let message = ERROR_SERVER;
        message = extractMeaningfulMessage(error, message);
        setError(message);
      }
    },
  });
  console.log(validation.errors);
  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="text-center mb-4">
              <img src={logo} alt="" className="rounded-circle" height="150" />
            </div>
            <Card className="overflow-hidden">
              <CardBody className="pt-0">
                <div className="p-2 py-5">
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {error && <Alert color="danger">{error}</Alert>}

                    <div className="mb-3">
                      <Label className="form-label">Correo electrónico</Label>
                      <Input
                        name="userName"
                        className="form-control"
                        placeholder="Enter email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.userName || ""}
                        invalid={validation.errors.userName ? true : false}
                      />
                      {validation.errors.userName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.userName}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Contraseña</Label>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type="password"
                        placeholder="Enter Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.errors.password ? true : false}
                      />
                      {validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-3 d-grid">
                      {validation.isSubmitting ? (
                        <span className="btn btn-primary btn-block disabled">
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        </span>
                      ) : (
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Ingresar
                        </button>
                      )}
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>
                © {new Date().getFullYear()} Universidad Intercontinental.
                Creado con <i className="mdi mdi-heart text-danger" /> por ATC-G
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(Login);
