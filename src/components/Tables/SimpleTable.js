import BootstrapTable from "react-bootstrap-table-next";
import { Col, Row } from "reactstrap";

export default function SimpleTable({columns, items}){
    return (
        <Row>
            <Col>
                <div className="table-responsive">
                    <BootstrapTable 
                        keyField='id' 
                        data={ items } 
                        columns={ columns } 
                        bordered={false}
                        striped={false}
                        responsive
                        classes="table align-middle table-nowrap table-hover table-bg-info-light table-tbody-sm mb-0 bg-white"
                        wrapperClasses="table-responsive"
                        noDataIndication="No hay información disponible"
                    />
                </div>
            </Col>
        </Row>
    )
}