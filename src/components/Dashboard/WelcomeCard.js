import { Row, Col, Card, CardBody } from "reactstrap"
import profileImg from "../../assets/images/profile-img.png"
import useLoguedUser from "../../hooks/useLoguedUser"
import { Link } from "react-router-dom"

const WelcomeCard = () => {
  const userLogued  = useLoguedUser();

  return (
    <>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Bienvenido</h5>
                <p></p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="12"> 
              <h5 className="font-size-15 mt-2">Leslie Vanessa Acosta Contreras</h5>
              <p className="text-muted mb-4 fw-medium">
                Matrícula:
                122144859
              </p>
              <span className="d-block lh-1">Estimado estudiante si aún no cuenta con su credencial UIC. Te invitamos a generarla aquí</span>
              <Link to="/">
                <span className="text-primary fw-medium">Genera tu credencial UIC</span>
              </Link>
              {/* <h5 className="font-size-15">{userLogued?.name ?? '----'}</h5>
              <p className="text-muted mb-0">{userLogued?.Role?.name ?? '-'}</p> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}
export default WelcomeCard
