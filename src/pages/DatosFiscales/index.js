import { useMemo, useState } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import CardBasic from "../../components/Common/CardBasic";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import SimpleTable from "../../components/Tables/SimpleTable";
import BuscarDatosFiscales from "../../components/DatosFiscales/BuscarDatosFiscales";
import FormDatosFiscales from "../../components/DatosFiscales/FormDatosFiscales";

function DatosFiscales(){  
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([]);

    const columns = useMemo(
        () => [
          {
            Header: 'RFC',
            accessor: 'rfc', // accessor is the "key" in the data
          },
          {
            Header: 'Nombre',
            accessor: 'nombre',
          },
          {
            Header: 'Razón social',
            accessor: 'razonSocial',
          },
          {
            Header: 'Correo electrónico',
            accessor: 'correo',
          },
        ],
        []
    );
  
    const cardChildren = (
        <>
            <Row>
                <Col xs="12" md="3">
                    <BuscarDatosFiscales />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormDatosFiscales />
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
                    data={items} 
                />
            </Col>            
        </Row>
    )
    
    return (
        <>
          <div className="page-content">
            <Container fluid>
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title={'Alumnos'}
                breadcrumbItem={"Alumnos"}
              />

              <Row>
                <Col xs="12" lg="12">
                    <CardBasic 
                        title="Alumnos"
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
  
  export default withRouter(DatosFiscales)