import { useFormik } from "formik";
import { Button, Col, Form, Input, InputGroup, Row } from "reactstrap";
import * as Yup from "yup";
import { FIELD_REQUIRED, SELECT_OPTION } from "../../constants/messages";

export default function BuscarColegiatura(){

    const formik = useFormik({
        initialValues: {
            search:'',
        },
        validationSchema: Yup.object({
            search: Yup.string().required(FIELD_REQUIRED)
        }),
        onSubmit: (values) => {
            //validaciones antes de enviarlo
            console.log(values)
           
            //service here
            // try {
            //     async function savePartnerApi() {
            //         let response = await savePartner(values)
            //         if(response.state){
            //             toast.success("Actualizado correctamente");
            //             setReloadPartner(true)
            //             setShowForm(false)
            //         }else{
            //             toast.error(ERROR_SERVER);
            //         }
            //     }
            //     savePartnerApi()
            // }catch(error) {
            //     toast.error(ERROR_SERVER); 
            // }
        }
    })
    return(
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
                        </Input>
                        <div
                          className="input-group-append"
                          onClick={() => {}}
                        >
                          <Button type="button" color="primary">
                            <i className="bx bx-search-alt-2" /> Buscar
                          </Button>
                        </div>
                      </InputGroup>
                    </div>
                </Col>
            </Row>
        </Form>
        
    )
}