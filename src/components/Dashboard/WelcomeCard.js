import { Row, Col, Card, CardBody } from "reactstrap";
import profileImg from "../../assets/images/profile-img.png";
import useLoguedUser from "../../hooks/useLoguedUser";
import { useEffect, useState } from "react";
import { getAlumnosById } from "../../helpers/alumnos";

const WelcomeCard = () => {
  const userLogued = useLoguedUser();
  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    //get alumnos by id
    const getAlumnosApi = async () => {
      try {
        const response = await getAlumnosById(userLogued.sub);
        //console.log(response);
        setAlumno(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (userLogued?.sub) getAlumnosApi();
  }, [userLogued?.sub]);

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
              <h5 className="font-size-15 mt-2">
                {`${alumno?.nombre} ${alumno?.apellidos}`}
              </h5>
              <p className="text-muted mb-4 fw-medium">Beca: {alumno?.beca}%</p>
              {/* <span className="d-block lh-1">
                Estimado estudiante si aún no cuenta con su credencial UIC. Te
                invitamos a generarla aquí
              </span>
              <Link to="/">
                <span className="text-primary fw-medium">
                  Genera tu credencial UIC
                </span>
              </Link> */}
              {/* <h5 className="font-size-15">{userLogued?.name ?? '----'}</h5>
              <p className="text-muted mb-0">{userLogued?.Role?.name ?? '-'}</p> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default WelcomeCard;
