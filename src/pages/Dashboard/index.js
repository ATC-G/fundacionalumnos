import { withRouter } from "react-router-dom"
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import ExtraInfo from "../../components/Dashboard/ExtraInfo";
import ListaAdeudos from "../../components/Dashboard/ListaAdeudos";
import WelcomeCard from "../../components/Dashboard/WelcomeCard";

function Dashboard(){  
  
  return (
      <>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={'Inicio'}
              breadcrumbItem={"Inicio"}
            />

            <Row>
              <Col xl="4">                
                <WelcomeCard />
              </Col>
              <Col xl="8">
                <Row>
                  <Col xs='12'md="12" className="order-sm-1 order-2">
                    <ExtraInfo />
                  </Col>
                  <Col xs='12'md="12" className="order-sm-2 order-1">
                    <ListaAdeudos />
                  </Col>
                </Row>
              </Col>
            </Row>

          </Container>
        </div>
      </>
    );
}

export default withRouter(Dashboard)