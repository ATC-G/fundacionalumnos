import { useState } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import CardBasic from "../../components/Common/CardBasic";
import BuscarDatosFiscales from "../../components/DatosFiscales/BuscarDatosFiscales";
import FormDatosFiscales from "../../components/DatosFiscales/FormDatosFiscales";

function DatosFiscales(){  
    const [loading, setLoading] = useState(false)
    
    return (
        <>
          <div className="page-content">
            <Container fluid>
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title={'Datos de facturación'}
                breadcrumbItem={"Datos de facturación"}
              />

              <Row>
                <Col xs="12" lg="12">
                  <FormDatosFiscales />                  
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
  }
  
  export default withRouter(DatosFiscales)