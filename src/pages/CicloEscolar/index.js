import { useState, useMemo } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import BuscarCicloEscolar from "../../components/CicloEscolar/BuscarCicloEscolar";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import CardBasic from "../../components/Common/CardBasic";
import BuscarConfiguracion from "../../components/Configuracion/BuscarConfiguracion";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import SimpleTable from "../../components/Tables/SimpleTable";

function CicloEscolar(){  
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([]);

    const columns = useMemo(
        () => [
          {
            Header: 'Mes calendario',
            accessor: 'mes', // accessor is the "key" in the data
          },
          {
            Header: 'Fecha Límite de pago',
            accessor: 'fechaLimitePago',
          },
          {
            Header: '% interes',
            accessor: 'interes',
          },
        ],
        []
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
  
    const cardChildren = (
        <>
            <Row>
                <Col xs="12" md="12">
                    <BuscarCicloEscolar />
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                    {cardHandleList}
                </Col>
            </Row>
        </>
    );

    
    
    return (
        <>
          <div className="page-content">
            <Container fluid>
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title={'Ciclo escolar'}
                breadcrumbItem={"Ciclo escolar"}
              />

              <Row>
                <Col xs="12" lg="12">
                    <CardBasic 
                        title={null}
                        children={cardChildren}
                    />                    
                </Col>
              </Row>              
            </Container>
          </div>
        </>
      );
  }
  
  export default withRouter(CicloEscolar)