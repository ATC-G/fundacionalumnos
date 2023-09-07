import { useDispatch } from "react-redux";
import { cleanCart } from "../../redux/cartSlice";
import { Col, Container, Row } from "reactstrap";
import useQuery from "../../hooks/useQuery";

const Success = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  dispatch(cleanCart());

  return (
    <Container>
      <Row>
        <Col xs="12" md={{ offset: 3, size: 6 }} className="text-center py-5">
          {query.get("success") ? (
            query.get("nbResponse") === "Aprobado" ? (
              <>
                <i className="far fa-check-circle text-success fs-1 d-block" />
                <h4>Pago realizado con exito</h4>
              </>
            ) : (
              <>
                <i className="far fa-times-circle text-danger fs-1 d-block" />
                <h4>Su pago no pudo ser procesado</h4>
                <small className="d-block">{query.get("cdResponse")}</small>
                <small>{query.get("nb_error")}</small>
              </>
            )
          ) : (
            <>
              <i className="far fa-times-circle text-danger fs-1 d-block" />
              <h4>Ocurrió un error a la hora de procesar su pago</h4>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Success;
