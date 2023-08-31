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
import { addToCart } from "../../redux/cartSlice";
import { numberFormat } from "../../utils/formatNumber";
import useLoguedUser from "../../hooks/useLoguedUser";
import { getAlumnosById } from "../../helpers/alumnos";
import { getColegiosList } from "../../helpers/colegios";
import { getCiclosByColegio } from "../../helpers/ciclos";
import { getReferencias } from "../../helpers/referencias";
import moment from "moment/moment";
import FullLoad from "../../components/Loader/FullLoad";

function Colegiatura() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [rowOBj, setRowObj] = useState(null);
  const userLogued = useLoguedUser();
  const [colegio, setColegio] = useState(null);
  const [alumno, setAlumno] = useState(null);
  const [ciclosOpt, setCiclosOpt] = useState([]);

  const addItemToCart = (row) => {
    setRowObj(row.original);
  };

  useEffect(() => {
    if (rowOBj) {
      if (cart.filter((it) => it.id === rowOBj.id).length === 0) {
        dispatch(addToCart(rowOBj));
      } else {
        toast.info(PRODUCT_IN_CAR);
      }
      setRowObj(null);
    }
  }, [rowOBj]);

  //obtener colegio
  useEffect(() => {
    const fetchColegioApi = async () => {
      try {
        const response = await getColegiosList();
        setColegio(response.find((it) => it.codigo === alumno?.colegio));
      } catch (error) {
        setFirstLoad(false);
      }
    };
    if (alumno?.colegio) {
      fetchColegioApi();
    }
  }, [alumno?.colegio]);

  useEffect(() => {
    //get alumnos by id
    const getAlumnosApi = async () => {
      try {
        const response = await getAlumnosById(userLogued.sub);
        setAlumno(response);
      } catch (error) {
        console.log(error);
        setFirstLoad(false);
      }
    };
    if (userLogued?.sub) getAlumnosApi();
  }, [userLogued?.sub]);

  //obetenermos los ciclos
  useEffect(() => {
    const fetchCiclosByColegio = async () => {
      try {
        const q = `${colegio?.id}?PageNumber=1&PageSize=100`;
        const response = await getCiclosByColegio(q);
        setCiclosOpt(
          response.data.map((it) => ({ id: it.id, name: it.nombre }))
        );
        setFirstLoad(false);
      } catch (error) {
        console.log(error);
        setFirstLoad(false);
      }
    };
    if (colegio?.id) {
      fetchCiclosByColegio();
    }
  }, [colegio]);

  const columns = useMemo(
    () => [
      {
        Header: "Referencia",
        accessor: "referenciaBancaria", // accessor is the "key" in the data
        style: {
          width: "10%",
        },
      },
      {
        Header: "Descripción",
        accessor: "mes",
        style: {
          width: "40%",
        },
        Cell: ({ row }) => `${row.original.mes} - ${row.original.year}`,
      },
      {
        Header: "Cargo",
        accessor: "monto",
        style: {
          width: "15%",
        },
        Cell: ({ value }) => numberFormat(value),
      },
      {
        Header: "Abono",
        accessor: "estatus",
        Cell: ({ row, value }) => (
          <span
            className={`fw-medium ${
              value === "activa" ? "text-danger" : "text-success"
            }`}
          >
            {value === "activa" ? "$0.00" : numberFormat(row.original.monto)}
          </span>
        ),
        style: {
          width: "15%",
        },
      },
      {
        Header: "Fecha límite",
        accessor: "fechaLimite",
        style: {
          width: "15%",
        },
        Cell: ({ value }) => moment(value, "YYYY-MM-DD").format("DD-MM-YYYY"),
      },
      {
        id: "acciones",
        Header: "",
        style: {
          width: "5%",
        },
        Cell: ({ row }) => (
          <div className="d-flex">
            <div className="pe-2">
              <span
                className={`fs-4 p-1 bg-light bg-soft rounded ${
                  row.original.estatus === "activa"
                    ? "text-success cursor-pointer"
                    : "text-muted opacity-25"
                }`}
                onClick={() =>
                  row.original.estatus === "activa" ? addItemToCart(row) : {}
                }
              >
                <i className="mdi mdi-cart-plus" />
              </span>
            </div>
            {/* <div className="pe-2">
              <span className="text-danger fs-4 p-1 bg-light bg-soft rounded cursor-pointer">
                <i className="mdi mdi-file-pdf" />
              </span>
            </div> */}
          </div>
        ),
      },
    ],
    []
  );

  const buscarRef = async (cicloId) => {
    try {
      setLoading(true);
      const query = `razonSocialId=${alumno.razonSocial}&colegioId=${colegio.id}&cicloId=${cicloId}`;
      const response = await getReferencias(query);
      //console.log(response);
      if (response.length > 0) setItems(response[0].referencias);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setItems([]);
      setLoading(false);
    }
  };

  const cardChildren = (
    <Row>
      <Col xs="12" md="4">
        <BuscarColegiatura ciclosOpt={ciclosOpt} buscarRef={buscarRef} />
      </Col>
    </Row>
  );

  const cardHandleList = loading ? (
    <Row>
      <Col xs="12" xl="12">
        <SimpleLoad />
      </Col>
    </Row>
  ) : (
    <Row>
      <Col xl="12">
        <SimpleTable columns={columns} data={items} />
      </Col>
    </Row>
  );

  return (
    <>
      {firstLoad && <FullLoad />}
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Colegiatura"} breadcrumbItem={"Colegiatura"} />

          <Row>
            <Col xs="12" lg="12">
              <CardBasic title="Colegiaturas" children={cardChildren} />
            </Col>
          </Row>

          <Row>
            <Col xs="12" lg="12">
              <CardBasic title={null} children={cardHandleList} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default withRouter(Colegiatura);
