import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import useLoguedUser from "../../hooks/useLoguedUser";
import { getAlumnosById } from "../../helpers/alumnos";
import { getColegiosList } from "../../helpers/colegios";
import { getCiclosByColegio } from "../../helpers/ciclos";
import { numberFormat } from "../../utils/formatNumber";
import { getReferencias } from "../../helpers/referencias";

export default function ExtraInfo() {
  const userLogued = useLoguedUser();
  const [deuda, setDeuda] = useState(null);
  const [ciclo, setCiclo] = useState(null);

  useEffect(() => {
    //get alumnos by id
    const getAlumnosApi = async () => {
      try {
        //alumno
        const response = await getAlumnosById(userLogued.sub);

        //colegio
        const responseColegio = await getColegiosList();
        const colegio = responseColegio.find(
          (it) => it.codigo === response?.colegio
        );

        //ciclos
        const q = `${colegio?.id}?PageNumber=1&PageSize=100`;
        const responseCiclos = await getCiclosByColegio(q);
        //console.log(responseCiclos);
        if (responseCiclos.data.length > 0) {
          const c = responseCiclos.data[responseCiclos.data.length - 1];
          setCiclo(c.nombre);

          //refs
          const query = `razonSocialId=${response.razonSocial}&colegioId=${colegio.id}&cicloId=${c.id}`;
          const responseRefs = await getReferencias(query);
          try {
            const d = responseRefs[0].referencias
              .filter((it) => it.estatus !== "pagada")
              .reduce((acc, curr) => acc + curr.monto, 0);
            setDeuda(d);
          } catch (error) {
            setDeuda(null);
          }
          //console.log(responseRefs);
        } else {
          setDeuda(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userLogued?.sub) getAlumnosApi();
  }, [userLogued?.sub]);

  return (
    <Row>
      {/* <Col md="4">
                <Card className="mini-stats-wid cursor-pointer">
                    <CardBody className="p-2">
                        <div className="d-flex">
                        <div className="flex-grow-1">
                            <p className="text-success fw-medium">Consulta tus calificaciones</p>
                            <h5 className="mb-0">Último disponible</h5>
                            <span className="text-muted fw-medium">Ciclo: 2023-01</span>
                        </div>
                        <div className="avatar-sm rounded-circle bg-info  align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-info ">
                            <i className="bx bx-news font-size-24" />
                            </span>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
      <Col md="4">
        <Card className="mini-stats-wid cursor-pointer">
          <CardBody className="p-2">
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-primary fw-medium">
                  Cargos por pagar del ciclo
                </p>
                <h5 className="mb-0">
                  {deuda >= 0 ? numberFormat(deuda) : "No disponible"}
                </h5>
                {ciclo && (
                  <span className="text-muted fw-medium">Ciclo: {ciclo}</span>
                )}
              </div>
              <div className="avatar-sm rounded-circle bg-info  align-self-center mini-stat-icon">
                <span className="avatar-title rounded-circle bg-info ">
                  <i className="bx bx-dollar-circle font-size-24" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      {/* <Col md="4">
                <Card className="mini-stats-wid cursor-pointer">
                    <CardBody className="p-2">
                        <div className="d-flex">
                        <div className="flex-grow-1">
                            <p className="text-warning fw-medium">Facturación</p>
                            <h5 className="mb-0">Solicitala aquí</h5>
                            <span className="text-muted fw-medium opacity-0">Ciclo: 2023-01</span>
                        </div>
                        <div className="avatar-sm rounded-circle bg-info  align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-info ">
                            <i className="fas fa-file-invoice-dollar font-size-24" />
                            </span>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
    </Row>
  );
}
