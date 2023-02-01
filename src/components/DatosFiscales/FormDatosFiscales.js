import { useFormik } from "formik";
import { Alert, Button, Card, CardBody, Col, Form, FormText, Input, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { FIELD_REQUIRED, SELECT_OPTION } from "../../constants/messages";

export default function FormDatosFiscales(){

    const formik = useFormik({
        initialValues: {
            curp: '',
            razonSocial: '',
            rfc: '',
            regimenFiscal: '',
            calle: '',
            noExterior: '',
            noInterior: '',
            codigoPostal: '',
            colonia: '',
            pais: '',
            estado: '',
            municipio: '',
            usoCFDI: '',
            checkedAvisoPrivacidad: false,
            checkedConfirmoDatos: false,
            
        },
        validationSchema: Yup.object({
            curp: Yup.string().required(FIELD_REQUIRED),
            razonSocial: Yup.string().required(FIELD_REQUIRED),
            rfc: Yup.string().required(FIELD_REQUIRED),
            regimenFiscal: Yup.string().required(FIELD_REQUIRED),
            calle: Yup.string().required(FIELD_REQUIRED),
            noExterior: Yup.string().required(FIELD_REQUIRED),
            codigoPostal: Yup.string().required(FIELD_REQUIRED),
            colonia: Yup.string().required(FIELD_REQUIRED),
            pais: Yup.string().required(FIELD_REQUIRED),
            estado: Yup.string().required(FIELD_REQUIRED),
            municipio: Yup.string().required(FIELD_REQUIRED),
            usoCFDI: Yup.string().required(FIELD_REQUIRED),
            correo: Yup.string().required(FIELD_REQUIRED),
            telefono: Yup.string().required(FIELD_REQUIRED),
            checkedAvisoPrivacidad: Yup.bool().oneOf([true], "Debe aceptar el aviso de privacidad"),
            checkedConfirmoDatos: Yup.bool().oneOf([true], "Debe aceptar el consentimiento confirmado"),
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
        <>
            <Row>
                <Col>
                    <Alert color="warning" className="p-2">
                        <div className="mb-2">
                            A partir del 1ro Enero 2022 y de acuerdo con la versión 4 del CFDI todos los pagos deberán
                            estar ligados a un R.F.C. Por favor  llene todos los datos que se solicitan, en caso de que 
                            usted no requiera generar factura dé click en el botón "No requiero factura"
                        </div>
                        <Button color="warning">No requiero factura</Button>
                        
                    </Alert>
                </Col>
            </Row>
            <Form
                className="needs-validation"
                id="tooltipForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                    return false;
                }}
            >
                
                <Card>
                    <CardBody>
                        <Row className="mb-md-3">
                            <Col xs="12" md="12">
                                <h4>Leslie Vanessa Acosta Contreras</h4>
                                <span className="fs-5 badge bg-info">Matrícula: 122144859</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="4">
                                <Label htmlFor="curp" className="mb-0">C.U.R.P <span className="text-danger">*</span></Label>
                                <Input
                                    id="curp"
                                    name="curp"
                                    className={`form-control ${formik.errors.curp ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.curp}  
                                />
                                {
                                    formik.errors.curp &&
                                    <div className="invalid-tooltip">{formik.errors.curp}</div>
                                }
                                <FormText>CURP del estudiante</FormText>
                            </Col>
                            <Col xs="12" md="5">
                                <Label htmlFor="razonSocialCode" className="mb-0">Razón social <span className="text-danger">*</span></Label>
                                <Input
                                    id="razonSocialCode"
                                    name="razonSocialCode"
                                    className={`form-control ${formik.errors.razonSocialCode ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.razonSocialCode}  
                                />
                                {
                                    formik.errors.razonSocialCode &&
                                    <div className="invalid-tooltip">{formik.errors.razonSocialCode}</div>
                                }
                                <FormText>Nombre con que saldrá las facturas</FormText>
                            </Col>
                            <Col xs="12" md="2">
                                <Label htmlFor="rfc" className="mb-0">R.F.C <span className="text-danger">*</span></Label>
                                <Input
                                    id="rfc"
                                    name="rfc"
                                    className={`form-control ${formik.errors.rfc ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.rfc}  
                                />
                                {
                                    formik.errors.rfc &&
                                    <div className="invalid-tooltip">{formik.errors.rfc}</div>
                                }
                            </Col>
                        </Row>
                        <Row>
                        <Col xs="12" md="4">
                            <Label htmlFor="regimenFiscal" className="mb-0">Régimen fiscal <span className="text-danger">*</span></Label>
                            <Input
                                type="select"
                                id="regimenFiscal"
                                name="regimenFiscal"
                                className={`form-control ${formik.errors.regimenFiscal ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                value={formik.values.regimenFiscal}  
                            >
                                <option value="">{SELECT_OPTION}</option>
                            </Input>
                            {
                                formik.errors.regimenFiscal &&
                                <div className="invalid-tooltip">{formik.errors.regimenFiscal}</div>
                            }
                            <FormText>Este dato puede ser consultado desde la <strong>"Constancia de situación fiscal"</strong></FormText>
                        </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <h5 className="m-0">Dirección fiscal</h5>
                        <hr className="mt-1" />
                        <Row>
                            <Col xs="12" md="4">
                                <Label htmlFor="calle" className="mb-0">Calle <span className="text-danger">*</span></Label>
                                <Input
                                    id="calle"
                                    name="calle"
                                    className={`form-control ${formik.errors.calle ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.calle}  
                                />
                                {
                                    formik.errors.calle &&
                                    <div className="invalid-tooltip">{formik.errors.calle}</div>
                                }
                            </Col>
                            <Col xs="12" md="2">
                                <Label htmlFor="noExterior" className="mb-0">No Ext. <span className="text-danger">*</span></Label>
                                <Input
                                    id="noExterior"
                                    name="noExterior"
                                    className={`form-control ${formik.errors.noExterior ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.noExterior}  
                                />
                                {
                                    formik.errors.noExterior &&
                                    <div className="invalid-tooltip">{formik.errors.noExterior}</div>
                                }
                            </Col>
                            <Col xs="12" md="2">
                                <Label htmlFor="noInterior" className="mb-0">No Int.</Label>
                                <Input
                                    id="noInterior"
                                    name="noInterior"
                                    className={`form-control ${formik.errors.noInterior ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.noInterior}  
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="4">
                                <Label htmlFor="colonia" className="mb-0">Colonia <span className="text-danger">*</span></Label>
                                <Input
                                    id="colonia"
                                    name="colonia"
                                    className={`form-control ${formik.errors.colonia ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.colonia}  
                                />
                                {
                                    formik.errors.colonia &&
                                    <div className="invalid-tooltip">{formik.errors.colonia}</div>
                                }
                            </Col>
                            <Col xs="12" md="2">
                                <Label htmlFor="codigoPostal" className="mb-0">Código postal <span className="text-danger">*</span></Label>
                                <Input
                                    id="codigoPostal"
                                    name="codigoPostal"
                                    className={`form-control ${formik.errors.codigoPostal ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.codigoPostal}  
                                />
                                {
                                    formik.errors.codigoPostal &&
                                    <div className="invalid-tooltip">{formik.errors.codigoPostal}</div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="4">
                                <Label htmlFor="pais" className="mb-0">País <span className="text-danger">*</span></Label>
                                <Input
                                    type="select"
                                    id="pais"
                                    name="pais"
                                    className={`form-control ${formik.errors.pais ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.pais}  
                                >
                                    <option value="">{SELECT_OPTION}</option>
                                </Input>
                                {
                                    formik.errors.pais &&
                                    <div className="invalid-tooltip">{formik.errors.pais}</div>
                                }
                            </Col>
                            <Col xs="12" md="4">
                                <Label htmlFor="estado" className="mb-0">Estado <span className="text-danger">*</span></Label>
                                <Input
                                    type="select"
                                    id="estado"
                                    name="estado"
                                    className={`form-control ${formik.errors.estado ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.estado}  
                                >
                                    <option value="">{SELECT_OPTION}</option>
                                </Input>
                                {
                                    formik.errors.estado &&
                                    <div className="invalid-tooltip">{formik.errors.estado}</div>
                                }
                            </Col>
                            <Col xs="12" md="4">
                                <Label htmlFor="municipio" className="mb-0">Municipio <span className="text-danger">*</span></Label>
                                <Input
                                    type="select"
                                    id="municipio"
                                    name="municipio"
                                    className={`form-control ${formik.errors.municipio ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.municipio}  
                                >
                                    <option value="">{SELECT_OPTION}</option>
                                </Input>
                                {
                                    formik.errors.municipio &&
                                    <div className="invalid-tooltip">{formik.errors.municipio}</div>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <h5 className="m-0">Adicionales</h5>
                        <hr className="mt-1" />
                        <Row>
                            <Col xs="12" md="4">
                                <Label htmlFor="usoCFDI" className="mb-0">Uso de CFDI <span className="text-danger">*</span></Label>
                                <Input
                                    type="select"
                                    id="usoCFDI"
                                    name="usoCFDI"
                                    className={`form-control ${formik.errors.usoCFDI ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.usoCFDI}  
                                >
                                    <option value="">{SELECT_OPTION}</option>
                                </Input>
                                {
                                    formik.errors.usoCFDI &&
                                    <div className="invalid-tooltip">{formik.errors.usoCFDI}</div>
                                }
                            </Col>
                            <Col xs="12" md="4">
                                <Label htmlFor="correo" className="mb-0">Correo <span className="text-danger">*</span></Label>
                                <Input
                                    id="correo"
                                    name="correo"
                                    className={`form-control ${formik.errors.correo ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.correo}  
                                />
                                {
                                    formik.errors.correo &&
                                    <div className="invalid-tooltip">{formik.errors.correo}</div>
                                }
                            </Col>
                            <Col xs="12" md="4">
                                <Label htmlFor="telefono" className="mb-0">Teléfono de contacto (10 digítos) <span className="text-danger">*</span></Label>
                                <Input
                                    id="telefono"
                                    name="telefono"
                                    className={`form-control ${formik.errors.telefono ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.telefono}  
                                />
                                {
                                    formik.errors.telefono &&
                                    <div className="invalid-tooltip">{formik.errors.telefono}</div>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <div className="d-flex flex-column align-items-end">
                    <div className="form-check form-check-right">
                        <Input
                            id="checkedAvisoPrivacidad"
                            name="checkedAvisoPrivacidad"
                            className={`form-check-input`}
                            onChange={formik.handleChange}
                            value={formik.values.checkedAvisoPrivacidad}  
                            type="checkbox"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="checkedAvisoPrivacidad"
                        > Confirmo que he leido el <a href="#">Aviso de privacidad</a> <span className="text-danger">*</span></label>
                        {
                            formik.errors.checkedAvisoPrivacidad &&
                            <div className="text-danger">{formik.errors.checkedAvisoPrivacidad}</div>
                        }
                    </div>
                    <div className="form-check form-check-right">
                        <Input
                            id="checkedConfirmoDatos"
                            name="checkedConfirmoDatos"
                            className={`form-check-input`}
                            onChange={formik.handleChange}
                            value={formik.values.checkedConfirmoDatos}  
                            type="checkbox"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="checkedConfirmoDatos"
                        > Confirmo que he verificado la información que he proporcionado <span className="text-danger">*</span></label>
                        {
                            formik.errors.checkedConfirmoDatos &&
                            <div className="text-danger">{formik.errors.checkedConfirmoDatos}</div>
                        }
                    </div>
                </div>
                
                <div className="d-flex justify-content-end mb-3">
                    <Button
                        color="success"
                        className="btn btn-success"
                        type="submit"
                    >Guardar
                    </Button>
                </div>
            </Form>
        </>
        
        
    )
}