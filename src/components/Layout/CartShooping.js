import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import SimpleBar from "simplebar-react";
import { removeItem } from "../../redux/cartSlice";
import { numberFormat } from "../../utils/formatNumber";

export default function CartShooping(){
    const [menu, setMenu] = useState(false);
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    return (
        <>
          <Dropdown
            isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="dropdown d-inline-block"
            tag="li"
          >
            <DropdownToggle
              className="btn header-item noti-icon"
              tag="button"
              id="page-header-notifications-dropdown"
            >
              <i className={`bx bx-cart-alt ${cart.length > 0 ? 'bx-tada' : ''}`} />
              <span className="badge bg-danger rounded-pill">{cart.length}</span>
            </DropdownToggle>
    
            <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
              <div className="p-3">
                <Row className="align-items-center">
                  <Col>
                    <h6 className="m-0"> Mi carrito </h6>
                  </Col>
                </Row>
              </div>

              {
                cart.length === 0 ? 
                <SimpleBar style={{height: '50px'}}>
                  <div to="" className="text-reset notification-item">
                    <div className="d-flex">
                      <span className="text-muted">Su carrito esta vacío</span>
                    </div>
                  </div>
                </SimpleBar> :
                <>
                <SimpleBar style={{ height: "230px" }}>
                    {
                      cart.map((cartItem) => (
                        <div to="" className="text-reset notification-item" key={cartItem.referencia}>
                          <div className="d-flex">
                              <div className="avatar-xs me-3">
                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                  <i className="bx bx-cart" />
                                </span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="font-size-12 text-muted">
                                  <p className="mb-1">
                                    {cartItem.descripcion}
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center p-0">                            
                                  <Button color="link" className="text-danger p-0" onClick={()=>dispatch(removeItem(cartItem.referencia))}>Eliminar</Button>
                                  <h6 className="m-0 text-success fs-4 fw-medium">{numberFormat(cartItem.pendiente)}</h6>
                                </div>
                              </div>
                            </div> 
                        </div>
                      ))
                    }                
                </SimpleBar>
                <div className="p-2 border-top d-grid">
                  <Link className="btn btn-sm btn-link font-size-14 text-center" to="/carrito">
                    <span key="t-view-more">Realizar pago</span> <i className="mdi mdi-arrow-right-circle me-1"></i> 
                  </Link>
                </div>
                </>
              }
    
              
              
            </DropdownMenu>
          </Dropdown>
        </>
      );
}