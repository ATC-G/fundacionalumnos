import { useState } from "react";
import { Col, Row } from "reactstrap";
import SimpleBar from "simplebar-react";
import CardBasic from "../Common/CardBasic";

export default function ListaAdeudos(){
    const [adeudos, setAdeudos] = useState([])
    
    const adeudosChild = (
        adeudos.length === 0 ?
        <h6>No hay adeudos por el momento</h6> :
        <SimpleBar style={{ height: "430px" }}>
            <div to="" className="text-reset notification-item">
                <div className="d-flex">
                <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className="bx bx-cart" />
                    </span>
                </div>
                <div className="flex-grow-1">
                    <h6 className="mt-0 mb-1">
                    Nuevo producto title
                    </h6>
                    <div className="font-size-12 text-muted">
                    <p className="mb-1">
                        Nuevo producto descripcion
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </SimpleBar>
    )

    return(
        <Row>
            <Col>
                <CardBasic 
                    title={<><i className="mdi mdi-account-cash me-3" /> Cargos por pagar o con adeudo</>}
                    children={adeudosChild}
                />                
            </Col>
        </Row>
    )
}