import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import { sendPaymentData } from "../../helpers/payment";
import { getAlumnosById } from "../../helpers/alumnos";
import useLoguedUser from "../../hooks/useLoguedUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FIELD_REQUIRED, SELECT_OPTION } from "../../constants/messages";
import { states } from "../../constants/utils";
import FullLoad from "../../components/Loader/FullLoad";

function Pago() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [statesLigaPago, setStatesLigaPago] = useState("process");
  const [linkCobro, setLinkCobro] = useState("");
  const userLogued = useLoguedUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(cart);
    if (cart.length === 0) {
      setStatesLigaPago("noProduct");
    } else {
      setStatesLigaPago("formulario");
    }
  }, [cart]);

  const processPaymentData = async () => {
    try {
      //buscamos el alumno
      const responseAlumnos = await getAlumnosById(userLogued.sub);
      console.log(responseAlumnos);
      const paymentFirstCart = {
        colegio: responseAlumnos.colegio,
        references: cart.map((it) => it.id),
        amount: cart.reduce((acc, curr) => acc + curr.monto, 0),
        name: `${responseAlumnos.nombre} ${responseAlumnos.apellidos}`,
        mail: responseAlumnos.email,
        celular: responseAlumnos.telefono,
        street: formik.values.street,
        city: formik.values.city,
        state: formik.values.state,
        zipCode: formik.values.zipCode,
      };
      console.log(paymentFirstCart);
      const response = await sendPaymentData(paymentFirstCart);
      console.log(response);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, "text/xml");
      const url =
        xmlDoc.getElementsByTagName("nb_url")[0].childNodes[0].nodeValue;
      setLinkCobro(url);
      setStatesLigaPago("success");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setStatesLigaPago("error");
      setLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      state: "",
      city: "",
      zipCode: "",
      street: "",
    },
    validationSchema: Yup.object({
      state: Yup.string().required(FIELD_REQUIRED),
      zipCode: Yup.string().required(FIELD_REQUIRED),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      processPaymentData();
    },
  });

  const data = {
    process: <SimpleLoad />,
    noProduct: (
      <Alert color="info" className="m-0">
        No hay productos a cobrar
      </Alert>
    ),
    error: (
      <Alert color="danger" className="m-0">
        Lo sentimos no pudimos conectarnos con el servidor. Intente más tarde.
      </Alert>
    ),
    formulario: (
      <Form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
          return false;
        }}
      >
        <Row>
          <Col xs="12" md="12">
            <Label className="form-label" htmlFor="street">
              Calle
            </Label>
            <Input
              name="street"
              className="form-control"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street || ""}
            />
          </Col>
          <Col xs="12" md="4">
            <Label className="form-label" htmlFor="state">
              Estado
            </Label>
            <select
              id="state"
              name="state"
              className="form-control"
              value={formik.values.state}
              onChange={formik.handleChange}
            >
              <option value={""}>{SELECT_OPTION}</option>
              {states.map((it) => (
                <option value={it.id} key={it.id}>
                  {it.name}
                </option>
              ))}
            </select>
            {formik.errors.state && (
              <FormFeedback type="invalid">{formik.errors.state}</FormFeedback>
            )}
          </Col>
          <Col xs="12" md="4">
            <Label className="form-label" htmlFor="city">
              Ciudad
            </Label>
            <Input
              name="city"
              className="form-control"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city || ""}
            />
          </Col>
          <Col xs="12" md="4">
            <Label className="form-label" htmlFor="zipCode">
              Código Postal
            </Label>
            <Input
              name="zipCode"
              className="form-control"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipCode || ""}
            />
            {formik.errors.zipCode && (
              <FormFeedback type="invalid">
                {formik.errors.zipCode}
              </FormFeedback>
            )}
          </Col>
          <Col xs="12" md="12">
            <button className="btn btn-primary btn-block mt-3" type="submit">
              Aceptar
            </button>
          </Col>
        </Row>
      </Form>
    ),
    success: (
      <iframe
        title="Formulario de cobro"
        src={linkCobro}
        width="320px"
        height="880px"
        frameBorder="0"
        scrolling="no"
        seamless="seamless"
      ></iframe>
    ),
  };

  return (
    <>
      {loading && <FullLoad />}
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Pagar"} breadcrumbItem={"Pagar"} />

          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-center align-items-center">
                    {data[statesLigaPago]}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default withRouter(Pago);
