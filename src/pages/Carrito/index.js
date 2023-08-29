import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import { removeItem } from "../../redux/cartSlice";
import { numberFormat } from "../../utils/formatNumber";
import sumCart from "../../utils/sumCart";

function Carrito() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Mi carrito"} breadcrumbItem={"Mi carrito"} />

          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader
                  className="bg-transparent border-bottom text-uppercase text-primary"
                  tag={"h5"}
                >
                  Carrito ({cart.length})
                </CardHeader>
                <CardBody>
                  {cart.length === 0 ? (
                    <h5 className="p-4  text-center">Su carrito está vacío</h5>
                  ) : (
                    <>
                      {cart.map((cartItem, index) => (
                        <div
                          className={`d-flex justify-content-between align-items-center border-bottom py-3 ${
                            index !== 0 ? "border-top" : ""
                          }`}
                          key={cartItem.id}
                        >
                          <div>
                            <>
                              <h4 className="m-0">{cartItem.referencia}</h4>
                              <p className="text-muted m-0">
                                {" "}
                                {`${cartItem.mes} - ${cartItem.year}`}
                              </p>
                            </>
                            <Button
                              color="link"
                              className="text-danger p-0"
                              onClick={() => dispatch(removeItem(cartItem.id))}
                            >
                              Eliminar
                            </Button>
                          </div>
                          <div>
                            <h3 className="m-0">
                              {numberFormat(cartItem.monto)}
                            </h3>
                          </div>
                        </div>
                      ))}
                      <div className="d-flex justify-content-end alignt-items-center py-3 border-bottom">
                        <h1>
                          <span className="pe-3">Total</span>{" "}
                          <span>{numberFormat(sumCart(cart))}</span>
                        </h1>
                      </div>
                      <div className="d-flex justify-content-end py-3">
                        <Link
                          to="/pago"
                          className="btn btn-success fw-medium fs-5 p-3"
                        >
                          Continuar con el pago
                        </Link>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default withRouter(Carrito);
