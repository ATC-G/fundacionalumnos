import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import BuscarColegiatura from "../../components/Colegiatura/BuscarColegiatura";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import CardBasic from "../../components/Common/CardBasic";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import SimpleTable from "../../components/Tables/SimpleTable";
import { PRODUCT_IN_CAR } from "../../constants/messages";
import { testItemsColegiatura } from "../../data/testData";
import { addToCart } from "../../redux/cartSlice";
import { numberFormat } from "../../utils/formatNumber";

function Colegiatura(){  
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(testItemsColegiatura);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const [rowOBj, setRowObj] = useState(null)
    
    const addItemToCart = (row) =>{
      setRowObj(row.values)
    }

    useEffect(() => {
      if(rowOBj){
        if(cart.filter(it=>it.referencia === rowOBj.referencia).length === 0){
          dispatch(addToCart(rowOBj))  
        }else{
          toast.info(PRODUCT_IN_CAR)
        }
        setRowObj(null)
      }      
    },[rowOBj])

    const columns = useMemo(
        () => [
          {
            Header: 'Referencia',
            accessor: 'referencia', // accessor is the "key" in the data
            style: {
              width: '10%'
            }
          },
          {
            Header: 'Descripción',
            accessor: 'descripcion',
            style: {
              width: '40%'
            }
          },
          {
            Header: 'Cargo',
            accessor: 'cargo',
            style: {
              width: '10%'
            },
            Cell: ({value}) => numberFormat(value)
          },
          {
            Header: 'Abono',
            accessor: 'abono',
            Cell: ({value}) => (
              <span className="text-success fw-medium">{numberFormat(value)}</span>
            ),
            style: {
              width: '10%'
            }
          },
          {
            Header: 'Pendiente',
            accessor: 'pendiente',
            style: {
              width: '10%'
            },
            Cell: ({value}) => numberFormat(value)
          },
          {
            Header: 'Fecha límite',
            accessor: 'fechaLimite',
            style: {
              width: '15%'
            }
          },
          {
            id: 'acciones',
            Header: "",
            style: {
              width: '5%'
            },
            Cell: ({row}) => (
                <div className="d-flex">
                    <div className="pe-2">
                      <span 
                        className="text-success fs-4 p-1 bg-light bg-soft rounded cursor-pointer"
                        onClick={() => addItemToCart(row)}
                      >
                        <i className="mdi mdi-cart-plus" />
                      </span>
                    </div>
                    <div className="pe-2">
                      <span className="text-danger fs-4 p-1 bg-light bg-soft rounded cursor-pointer"><i className="mdi mdi-file-pdf" /></span>
                    </div>
                </div>
            ),          
            }
        ],
        []
    );

    const cardChildren = (
      <Row>
          <Col xs="12" md="4">
              <BuscarColegiatura />
          </Col>
      </Row>
  );

    const cardHandleList = (
        loading ?
        <Row>
            <Col xs="12" xl="12">
                <SimpleLoad />
            </Col>
        </Row> :
        <Row>
            <Col xl="12">                                    
                <SimpleTable
                    columns={columns}
                    data={items} 
                />
            </Col>            
        </Row>
    )
    
    return (
        <>
          <div className="page-content">
            <Container fluid>
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title={'Colegiatura'}
                breadcrumbItem={"Colegiatura"}
              />

              <Row>
                <Col xs="12" lg="12">
                    <CardBasic 
                        title="Colegiaturas"
                        children={cardChildren}
                    />                    
                </Col>
              </Row>

              <Row>
                <Col xs="12" lg="12">
                    <CardBasic 
                        title={null}
                        children={cardHandleList}
                    />                    
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
  }
  
  export default withRouter(Colegiatura)