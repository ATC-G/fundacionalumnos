import { Card, CardBody, Col, Row } from "reactstrap";

export default function ExtraInfo(){


    return (
        <Row>
            <Col md="4">
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
            </Col>
            <Col md="4">
                <Card className="mini-stats-wid cursor-pointer">
                    <CardBody className="p-2">
                        <div className="d-flex">
                        <div className="flex-grow-1">
                            <p className="text-primary fw-medium">Cargos por pagar del ciclo</p>
                            <h5 className="mb-0">$0.00</h5>
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
            </Col>
            <Col md="4">
                <Card className="mini-stats-wid cursor-pointer">
                    <CardBody className="p-2">
                        <div className="d-flex">
                        <div className="flex-grow-1">
                            <p className="text-warning fw-medium">Genera tu credencial UIC</p>
                            <h5 className="mb-0">Solicitala aquí</h5>
                            <span className="text-muted fw-medium opacity-0">Ciclo: 2023-01</span>
                        </div>
                        <div className="avatar-sm rounded-circle bg-info  align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-info ">
                            <i className="bx bx-user-circle font-size-24" />
                            </span>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}