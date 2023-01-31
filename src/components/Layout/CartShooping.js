import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import SimpleBar from "simplebar-react";

export default function CartShooping(){
    const [menu, setMenu] = useState(false);

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
              <i className="bx bx-cart-alt bx-tada" />
              <span className="badge bg-danger rounded-pill">3</span>
            </DropdownToggle>
    
            <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
              <div className="p-3">
                <Row className="align-items-center">
                  <Col>
                    <h6 className="m-0"> Mi carrito </h6>
                  </Col>
                  <div className="col-auto">
                    <a href="#" className="small">
                      {" "}
                      Ver todo
                    </a>
                  </div>
                </Row>
              </div>
    
              <SimpleBar style={{ height: "230px" }}>
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
              <div className="p-2 border-top d-grid">
                <Link className="btn btn-sm btn-link font-size-14 text-center" to="#">
                  <i className="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">Ver todo</span>
                </Link>
              </div>
            </DropdownMenu>
          </Dropdown>
        </>
      );
}