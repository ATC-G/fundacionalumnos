import { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import BuscarCobranza from "../../components/Cobranza/BuscarCobranza";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import CardBasic from "../../components/Common/CardBasic";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import SimpleTable from "../../components/Tables/SimpleTable";

function Cobranza(){  
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([]);

    const columns = [
        {
          text: "id",
          dataField: "id",
          hidden: true,
        },
        {
            text: "No Doc",
            dataField: "noDocumento",          
        },
        {
            text: "Familia",
            dataField: "familia",          
        },
        {
            text: "Mes",
            dataField: "mes",          
        },
        {
            text: "Monto",
            dataField: "monto",          
        },
        {
            text: "Fecha vencimiento",
            dataField: "fechaVencimiento",          
        },
        {
            text: "Documento SAP",
            dataField: "documentoSAP",          
        },
        {
            text: "Estatus",
            dataField: "estatus",          
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Acción",
            formatter: (cellContent, row) => (
                <div className="d-flex">
                    <div className="pe-2"><Button color="success" size="sm">Pagar</Button></div>
                    <div className="pe-2"><Button color="warning" size="sm">Facturar</Button></div>
                    <div className="pe-2"><Button color="info" size="sm">Enviar</Button></div>
                </div>
            )
        },
        
    ];
  
    const cardChildren = (
        <>
            <Row>
                <Col xs="12" md="12">
                    <BuscarCobranza />
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
                title={'Cobranza'}
                breadcrumbItem={"Cobranza"}
              />

              <Row>
                <Col xs="12" lg="12">
                    <CardBasic 
                        title="Cobranza"
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
  
  export default withRouter(Cobranza)