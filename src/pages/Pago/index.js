import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import cifrarXML from "../../utils/cifrarXML";
import generacionServicio from "../../utils/generacionServicio";
import generateXML from "../../utils/generateXML";
import { sendPaymentData } from "../../helpers/payment";

function Pago(){  
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const [statesLigaPago, setStatesLigaPago] = useState('process')
    
    useEffect(() => {
      console.log('entro')
        //console.log(cart)
        if(cart.length === 0){
            setStatesLigaPago('noProduct')
        }else{
            const processPaymentData = async () => {
              try {
                const paymentFirstCart = {
                  "reference": cart[0].referencia,
                  "amount": 50,
                  "name": "Ana Lucia",
                  "currency": "mxn",
                  "mail": "ana@gmail.com",
                  "celular": "9985632250",
                  "street": "Agramonte",
                  "city": "Cancun",
                  "state": "Quintana Roo",
                  "zipCode": "77500"
                }
                console.log(paymentFirstCart)
                const response = await sendPaymentData(paymentFirstCart);
                console.log(response)
      
      
                  // const xml = generateXML(cart)
                  // console.log(xml.toString())    
                  // const xmlCifrado = cifrarXML(xml.toString())
                  // console.log(xmlCifrado)
                  // setStatesLigaPago('success')
                  // const servicioGenerado = generacionServicio(xmlCifrado)
              } catch (error) {
                  console.log(error)
              }
            }
            processPaymentData()
        }
    },[])

    const data = {
        process: <SimpleLoad />,
        noProduct: <Alert color="info" className="m-0">No hay productos a cobrar</Alert>,
        success: <iframe 
                    title="Formulario de cobro"
                    src="https://sandboxpol.mit.com.mx/i/SNDBX01"
                    width="320px" 
                    height="480px" 
                    frameBorder="0" 
                    scrolling="no"
                    seamless="seamless"
                ></iframe>
    }
    
    return (
        <>
          <div className="page-content">
            <Container fluid>
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title={'Pagar'}
                breadcrumbItem={"Pagar"}
              />

              <Row>
                <Col xs="12" lg="12">
                    <Card>                      
                      <CardBody>
                        <div className="d-flex justify-content-center align-items-center">
                            {data[statesLigaPago]}
                        </div>
                      </CardBody>
                    </Card>
                                        
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
  }
  
  export default withRouter(Pago)