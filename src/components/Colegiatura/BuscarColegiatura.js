import { useFormik } from "formik";
import { Button, Col, Form, Input, InputGroup, Row } from "reactstrap";
import * as Yup from "yup";
import { FIELD_REQUIRED, SELECT_OPTION } from "../../constants/messages";

export default function BuscarColegiatura({ ciclosOpt, buscarRef }) {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: Yup.object({
      search: Yup.string().required(FIELD_REQUIRED),
    }),
    onSubmit: (values) => {
      //validaciones antes de enviarlo
      buscarRef(values.search);
    },
  });
  return (
    <Form
      className="needs-validation"
      id="tooltipForm"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
        return false;
      }}
    >
      <Row>
        <Col>
          <div className="mb-3">
            <InputGroup>
              <Input
                type="select"
                id="search"
                className="form-control me-2"
                onChange={formik.handleChange}
                value={formik.values.search}
              >
                <option value="">{SELECT_OPTION}</option>
                {ciclosOpt.map((it) => (
                  <option value={it.id}>{it.name}</option>
                ))}
              </Input>
              <div className="input-group-append">
                <Button
                  type="submit"
                  color="primary"
                  disabled={!formik.values.search}
                >
                  <i className="bx bx-search-alt-2" /> Buscar
                </Button>
              </div>
            </InputGroup>
            {formik.errors.search && (
              <div className="invalid-tooltip d-block">
                {formik.errors.search}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
}
