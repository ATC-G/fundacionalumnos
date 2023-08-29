import { useDispatch } from "react-redux";
import { cleanCart } from "../../redux/cartSlice";
import { Col, Container, Row } from "reactstrap";

const Success = () => {
  const dispatch = useDispatch();

  dispatch(cleanCart());

  return (
    <Container>
      <Row>
        <Col xs="12" md={{ offset: 3, size: 6 }} className="text-center py-5">
          <i className="far fa-check-circle text-success fs-1 d-block" />
          <h4>Pago realizado con exito</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Success;
