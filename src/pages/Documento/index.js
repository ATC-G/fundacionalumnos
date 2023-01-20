import { useState } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import FormAlumnos from "../../components/Alumnos/FormAlumnos";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import CardBasic from "../../components/Common/CardBasic";
import BuscarDocumento from "../../components/Documento/BuscarDocumento";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import SimpleTable from "../../components/Tables/SimpleTable";

function Documento(){  
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([]);

    const columns = [
        {
          text: "id",
          dataField: "id",
          hidden: true,
        },
        {
            text: "Mes",
            dataField: "mes",          
        },
        {
            text: "Concepto de pago",
            dataField: "conceptoPago",          
        },
        {
            text: "Monto",
            dataField: "monto",          
        },
        {
            text: "Fecha límite de pago",
            dataField: "fechaLimitePago",          
        },
        
    ];
  
    const cardChildren = (
        <>
            <Row>
                <Col xs="12" md="12">
                    <BuscarDocumento />
                </Col>
            </Row>
            <Row className="mt-2 bg-primary bg-opacity-10 p-2">
                <Col>
                    <FormAlumnos />
                </Col>
            </Row>
        </>
    );

    const cardHandleList = (
        loading ?
        <Row>
            <Col xs="12" xl="12">
                <SimpleLoad />
            </Col>
        </Row> :
        <Row>
            <Col xl="12">                                    
                <SimpleTable
                    columns={columns}
                    items={items} 
                />
            </Col>            
        </Row>
    )
    
    return (
        <>
          <div className="page-content">
            <Container fluid>
              <Breadcrumbs
                title={'Alumnos'}
                breadcrumbItem={"Alumnos"}
              />

              <Row>
                <Col xs="12" lg="12">
                    <CardBasic 
                        title="Documento"
                        children={cardChildren}
                    />                    
                </Col>
              </Row>

              <Row className="pb-5">
                  <Col lg="12">
                    {cardHandleList}                      
                  </Col>
              </Row>  
            </Container>
          </div>
        </>
      );
  }
  
  export default withRouter(Documento)