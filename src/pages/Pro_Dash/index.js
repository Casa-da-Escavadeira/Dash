import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Badge,
  Spinner,
  Container,
  Overlay,
  Tooltip,
  Alert
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { add, format, getMonth, getWeek, startOfWeek } from 'date-fns';
import toISODate from '../../utils/toISODate';
import { Container as Cont } from './styles';
import { generateSimplePrintCode } from '../../utils/generateSimplePrintCode';
import LastPCsModal from '../../components/LastPCsModal'

import api from '../../services/api';

export default function Pro_Dash() {
  const [productNumber, setProductNumber] = useState('');
  const [almoxarifados, setAlmoxarifados] = useState([]);
  const [supermecados, setSupermercados] = useState([]);
  const [quebrados, setQuebrados] = useState([]);
  const [pos, setPos] = useState([]);
  const [vix, setVix] = useState([]);
  const [stockWarehouse06, setStockWarehouse06] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [PCs, setPCs] = useState([]);
  const [SCs, setSCs] = useState([]);
  const [OPs, setOPs] = useState([]);
  const [EMPs, setEMPs] = useState([]);
  const [OUs, setOUs] = useState([]);
  const [Average, setAverage] = useState([]);

  const [codigoPlaceholder, setCodigoPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [pcPlaceholder, setPcPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [scPlaceholder, setScPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [opPlaceholder, setOpPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [ouPlaceholder, setOuPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [empPlaceholder, setEmpPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [averagePlaceholder, setAveragePlaceholder] = useState(
    'Pesquise por um código...',
  );

  const [almoxarifadoPlaceholder, setAlmoxarifadoPlaceholder] = useState(0);
  const [supermercadosPlaceholder, setSupermercadosPlaceholder] = useState(0);
  const [posPlaceholder, setPosPlaceholder] = useState(0);
  const [vixPlaceholder, setVixPlaceholder] = useState(0);
  const [stock06Placeholder, setStock06Placeholder] = useState(0);
  const [quebradosPlaceholder, setQuebradosPlaceholder] = useState(0);
  const [sumEmp, setSumEmp] = useState('');
  const [sumSCs, setSumSCs] = useState('');
  const [sumPCs, setSumPCs] = useState('');
  const [sumOPs, setSumOPs] = useState('');
  const [saldoPrev, setSaldoPrev] = useState('');
  const location = useLocation();
  const currentWeek = getWeek(new Date());
  const weeks = [
    'ATR',
    ...Array.from({ length: 12 }, (_, i) => i + currentWeek),
  ];

  useEffect(() => {
    const mapEmpenhos = EMPs.map(emp => emp.SALDO);
    const sumEmpenhos =
      mapEmpenhos.length > 0
        ? Number(parseFloat(mapEmpenhos.reduce((a, b) => a + b)).toFixed(2))
        : 0;
    setSumEmp(sumEmpenhos);

    const mapSCs = SCs.map(sc => sc.QTD - sc.QTD_ENT);
    const totalSumSCs =
      mapSCs.length > 0
        ? Number(parseFloat(mapSCs.reduce((a, b) => a + b)).toFixed(2))
        : 0;
    setSumSCs(totalSumSCs);

    const mapPCs = PCs.map(pc => pc.QTD - pc.QTD_ENT);
    const totalSumPCs =
      mapPCs.length > 0
        ? Number(parseFloat(mapPCs.reduce((a, b) => a + b)).toFixed(2))
        : 0;
    setSumPCs(totalSumPCs);

    const mapOPs = OPs.map(op => op.QTD - op.QTD_PRO);
    const totalSumOPs =
      mapOPs.length > 0
        ? Number(parseFloat(mapOPs.reduce((a, b) => a + b)).toFixed(2))
        : 0;
    setSumOPs(totalSumOPs);

    const saldo =
      (almoxarifados[0] !== undefined ? almoxarifados[0].SALDO : 0) +
      sumPCs +
      sumOPs +
      sumSCs -
      sumEmp;
    setSaldoPrev(Number(parseFloat(saldo).toFixed(2)));
  }, [EMPs, PCs, SCs, almoxarifados, sumEmp, sumPCs, sumSCs, OPs, sumOPs]);

  // Colocar OPs, Onde Usado e opção matriz/filial

  const handleSubmit = useCallback(
    async search => {
      let product = productNumber.toUpperCase().trim();

      if (search) {
        product = search.toUpperCase().trim();
      }

      setProductInfo([]);
      setAlmoxarifados([]);
      setSupermercados([]);
      setQuebrados([]);
      setPos([]);
      setVix([]);
      setStockWarehouse06([]);
      setPCs([]);
      setSCs([]);
      setOPs([]);
      setOUs([]);
      setEMPs([]);
      setAverage([]);

      setCodigoPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setAlmoxarifadoPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setSupermercadosPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setQuebradosPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setPosPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setVixPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setStock06Placeholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setPcPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setScPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setOpPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setEmpPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setOuPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setAveragePlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );

      const productInfoResponse = await api.get(
        `/register?filial=0101&produto=${product}`,
      );
      if (productInfoResponse.data.length === 0) {
        setCodigoPlaceholder('Parece que esse código não existe...');
      }
      setProductInfo(productInfoResponse.data);

      const response = await api.get(
        `/estoques?filial=0101&produto=${product}&armazem=01`,
      );
      if (response.data.length === 0) {
        setAlmoxarifados([{ SALDO: 0 }]);
      } else {
        setAlmoxarifados(response.data);
      }

      const response2 = await api.get(
        `/estoques?filial=0101&produto=${product}&armazem=99`,
      );
      if (response2.data.length === 0) {
        setSupermercados([{ SALDO: 0 }]);
      } else {
        setSupermercados(response2.data);
      }

      const response3 = await api.get(
        `/estoques?filial=0101&produto=${product}&armazem=04`,
      );
      if (response3.data.length === 0) {
        setQuebrados([{ SALDO: 0 }]);
      } else {
        setQuebrados(response3.data);
      }

      const response4 = await api.get(
        `/estoques?filial=0101&produto=${product}&armazem=03`,
      );
      if (response4.data.length === 0) {
        setPos([{ SALDO: 0 }]);
      } else {
        setPos(response4.data);
      }

      const response5 = await api.get(
        `/estoques?filial=0102&produto=${product}`,
      );
      if (response5.data.length === 0) {
        setVix([{ SALDO: 0 }]);
      } else {
        setVix(response5.data);
      }

      const stockWarehouse06Data = await api.get(
        `/estoques?filial=0101&produto=${product}&armazem=06`,
      );
      if (stockWarehouse06Data.data.length === 0) {
        setStockWarehouse06([{ SALDO: 0 }]);
      } else {
        setStockWarehouse06(stockWarehouse06Data.data);
      }

      const response6 = await api.get(
        `/pcs?filial=0101&legenda=PENDENTE',%20'ATENDIDO%20PARCIALMENTE&produto=${product}`,
      );
      if (response6.data.length === 0) {
        setPcPlaceholder('Parece que não há PCs...');
      }
      const reponseUpdated6 = response6.data.map(item => {
        const itemUpdated = {
          ...item,
          WEEK:
            getWeek(toISODate(item.ENTREGA)) < currentWeek
              ? 'ATR'
              : getWeek(toISODate(item.ENTREGA)),
        };
        return itemUpdated;
      });
      setPCs(reponseUpdated6);

      const response7 = await api.get(
        `/scs?filial=0101&aberto=true&produto=${product}`,
      );
      if (response7.data.length === 0) {
        setScPlaceholder('Parece que não há SCs...');
      }
      const reponseUpdated7 = response7.data.map(item => {
        const itemUpdated = {
          ...item,
          WEEK:
            getWeek(toISODate(item.ENTREGA)) < currentWeek
              ? 'ATR'
              : getWeek(toISODate(item.ENTREGA)),
        };
        return itemUpdated;
      });
      setSCs(reponseUpdated7);

      const opsRecieved = await api.get(
        `/ops?filial=0101&produto=${product}&fechado=false`,
        {},
      );
      if (opsRecieved.data.length === 0) {
        setOpPlaceholder('Parece que não há OPs...');
      }
      setOPs(opsRecieved.data);

      const response9 = await api.get(`/ou?filial=0101&produto=${product}`, {});
      if (response9.data.length === 0) {
        setOuPlaceholder('Parece que não é usado em nenhum lugar...');
      }
      setOUs(response9.data);

      const response8 = await api.get(
        `/emp?filial=0101&produto=${product}`,
        {},
      );
      if (response8.data.length === 0) {
        setEmpPlaceholder('Parece que não há empenhos...');
      }
      const reponseUpdated8 = response8.data.map(item => {
        const itemUpdated = {
          ...item,
          WEEK:
            getWeek(toISODate(item.ENTREGA)) < currentWeek
              ? 'ATR'
              : getWeek(toISODate(item.ENTREGA)),
        };
        return itemUpdated;
      });
      setEMPs(reponseUpdated8);

      const response10 = await api.get(
        `/average?filial=0101&produto=${product}`,
      );
      setAverage(response10.data[0]);
    },
    [productNumber, currentWeek],
  );

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  useEffect(() => {
    if (location.state) {
      setProductNumber(location.state);
      handleSubmit(location.state);
    }

    // eslint-disable-next-line
  }, [location.state]);

  const [show, setShow] = useState(false);
  const [printQtd, setPrintQtd] = useState(1);
  const target = useRef(null);

  function handlePrint() {
    if(productInfo.length !== 0) {
      const productPrint = {
        ...productInfo[0],
        PRODUTO: productInfo[0].CODIGO,
        SALDO: Number(printQtd)
      }
      navigator.clipboard.writeText(
        generateSimplePrintCode([productPrint])
      )
      setShow(!show);
      setTimeout(() => {
        setShow(false)
      }, 1500)
    }
  }

  // LastPCsModal
  const [isPCModalOpen, setIsPCModalOpen] = useState(false);
  const [pcsData, setPcsData] = useState([]);

  function handlePCModalClose() {
    setIsPCModalOpen(false);
  }

  const handlePCModal = async () => {
    let product = productNumber.toUpperCase().trim();

    const response = await api.get(
      `/pcs?filial=0101&produto=${product}&legenda=PEDIDO%20ATENDIDO',%20'ATENDIDO%20PARCIALMENTE&top=10&desc=true`,
    );

    const pcsFormatted = response.data.map(pc => {
      return {
        ...pc,
        PRECO: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(pc.PRECO)
      }
    })

    setPcsData(pcsFormatted)
    setIsPCModalOpen(true);
  };

  // average consumption
  const monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  const month2DigArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const currentMonth = getMonth(new Date()) + 1;
  console.log(currentMonth);
  console.log(Average);

  return (
    <Cont>
      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <Link
              to={{
                pathname: '/',
              }}
            >
              <FiArrowLeft color="#999" />
            </Link>
          </Col>
        </Row>
        <h1>Produtos</h1>
        <Row>
          <Col xs={8}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Código do Produto"
                aria-label="Código do Produto"
                aria-describedby="basic-addon2"
                autoFocus
                value={productNumber}
                onKeyPress={keyPressed}
                onChange={e => setProductNumber(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-warning"
                  onClick={() => handleSubmit()}
                  type="submit"
                  style={{ borderRadius: '0 5px 5px 0' }}
                >
                  Enviar
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              onClick={handlePCModal}
              type="submit"
            >
              Ultimos pedidos
            </Button>
            <LastPCsModal 
              isOpen={isPCModalOpen}
              handleClose={handlePCModalClose}
              pcsData={pcsData}
            />
          </Col>
          <Col>
            <InputGroup>
              <FormControl
                type="number"
                placeholder="Qtd"
                onChange={e => setPrintQtd(e.target.value)}
              />
              <InputGroup.Append>
              <Button
                ref={target}
                variant="outline-warning"
                onClick={handlePrint}
              >
                Etiqueta
              </Button>
              <Overlay target={target.current} show={show} placement="top">
                {props => (
                  <Tooltip {...props}>
                    Copiado para a área de transferência!
                  </Tooltip>
                )}
              </Overlay>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>DESCRIÇÃO</th>
                  <th>UM</th>
                  <th>PP</th>
                  <th>LE</th>
                  <th>EST_SEG</th>
                  <th>APRO</th>
                  <th>LOC</th>
                </tr>
              </thead>
              <tbody>
                {productInfo.length !== 0 ? (
                  productInfo.map(product => (
                    <tr>
                      <td>{product.DESCRICAO}</td>
                      <td>{product.UM}</td>
                      <td>{product.PP}</td>
                      <td>{product.LE}</td>
                      <td>{product.ESTSEG}</td>
                      <td>{product.APROPRI !== 'I' ? 'D' : 'I'}</td>
                      <td>{product.LOCACAO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">{codigoPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {(productInfo.length !== 0 && (productInfo[0].BLOQUEADO === true)) ? (
          <Row>
            <Col>
              <Alert variant={'danger'}>
                Este item está bloqueado!
              </Alert>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ALMOXARIFADO</th>
                </tr>
              </thead>
              <tbody>
                {almoxarifados.length !== 0 ? (
                  almoxarifados.map(almoxarifado => (
                    <tr>
                      <td>{almoxarifado.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{almoxarifadoPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>SUPERMECADO</th>
                </tr>
              </thead>
              <tbody>
                {supermecados.length !== 0 ? (
                  supermecados.map(supermecado => (
                    <tr>
                      <td>{supermecado.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{supermercadosPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ARMAZEM 06</th>
                </tr>
              </thead>
              <tbody>
                {stockWarehouse06.length !== 0 ? (
                  stockWarehouse06.map(stock06 => (
                    <tr>
                      <td>{stock06.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{stock06Placeholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>QUEBRADO</th>
                </tr>
              </thead>
              <tbody>
                {quebrados.length !== 0 ? (
                  quebrados.map(quebrado => (
                    <tr>
                      <td>{quebrado.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{quebradosPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>POS-VENDAS</th>
                </tr>
              </thead>
              <tbody>
                {pos.length !== 0 ? (
                  pos.map(posItem => (
                    <tr>
                      <td>{posItem.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{posPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>FILIAL</th>
                </tr>
              </thead>
              <tbody>
                {vix.length !== 0 ? (
                  vix.map(vixItem => (
                    <tr key={vixItem.SALDO}>
                      <td>{vixItem.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{vixPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
          <h5>Consumo últimos 12 meses</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  {monthArray.map(month => {
                    return (
                      <th>{(currentMonth + month - 1) > 12 ? `${currentMonth + month - 13}` : `${currentMonth + month - 1}`}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {Average.length !== 0 ? (
                  <tr>
                    {monthArray.map(month => {
                      return (
                        <td>{(currentMonth + month - 1) > 12 ? Average?.[`Q${month2DigArray[currentMonth + month - 14]}`] : Average?.[`Q${month2DigArray[currentMonth + month - 2]}`]}</td>
                      )
                    })}
                  </tr>
                  ) : (
                  <tr>
                    <td colSpan="12">{averagePlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Planejamento Semanal</h5>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th style={{ paddingBlock: '35px' }}>#</th>
                  {weeks.map(weekNumber => {
                    if (weekNumber === 'ATR') {
                      return <th style={{ paddingBlock: '35px' }}>ATRASO</th>;
                    }
                    return (
                      <th>
                        WK{weekNumber}
                        <br />
                        <p style={{ fontSize: '12px', marginBottom: '4px' }}>
                          {format(
                            startOfWeek(
                              add(new Date(), {
                                weeks: weekNumber - currentWeek,
                              }),
                              { weekStartsOn: 1 },
                            ),
                            'dd/MM',
                          )}
                          <br />
                          {format(
                            startOfWeek(
                              add(new Date(), {
                                weeks: weekNumber + 1 - currentWeek,
                              }),
                              { weekStartsOn: 5 },
                            ),
                            'dd/MM',
                          )}
                        </p>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {EMPs.length !== 0 ? (
                  <>
                    <tr>
                      <td>EMPENHO</td>

                      {weeks.map(weekNumber => {
                        const empWK = EMPs.reduce((acc, value) => {
                          if (value.WEEK === weekNumber) {
                            return acc + value.SALDO;
                          }
                          return acc;
                        }, 0);

                        if (weekNumber === 'ATR' && empWK !== 0) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE',
                              }}
                            >
                              {Math.round((empWK + Number.EPSILON) * 100) / 100}
                            </td>
                          );
                        }

                        return (
                          <td>
                            {Math.round((empWK + Number.EPSILON) * 100) / 100}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td>PC</td>

                      {weeks.map(weekNumber => {
                        const pcWK = PCs.reduce((acc, value) => {
                          if (value.WEEK === weekNumber) {
                            return acc + value.SALDO;
                          }
                          return acc;
                        }, 0);
                        if (weekNumber === 'ATR' && pcWK !== 0) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE',
                              }}
                            >
                              {Math.round((pcWK + Number.EPSILON) * 100) / 100}
                            </td>
                          );
                        }

                        return (
                          <td>
                            {Math.round((pcWK + Number.EPSILON) * 100) / 100}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td>SALDO</td>

                      {weeks.map(weekNumber => {
                        const empWK = EMPs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR') {
                            return acc + value.SALDO;
                          }
                          if (value.WEEK <= weekNumber) {
                            return acc + value.SALDO;
                          }
                          return acc;
                        }, 0);
                        const pcWK = PCs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR') {
                            return acc + value.SALDO;
                          }
                          if (value.WEEK <= weekNumber) {
                            return acc + value.SALDO;
                          }
                          return acc;
                        }, 0);
                        const scWK = SCs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR') {
                            return acc + value.SALDO;
                          }
                          if (value.WEEK <= weekNumber) {
                            return acc + value.SALDO;
                          }
                          return acc;
                        }, 0);

                        if (
                          pcWK +
                            scWK -
                            empWK +
                            almoxarifados[0].SALDO +
                            stockWarehouse06[0].SALDO <
                          0
                        ) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE',
                              }}
                            >
                              {Math.round(
                                (pcWK +
                                  scWK -
                                  empWK +
                                  almoxarifados[0].SALDO +
                                  stockWarehouse06[0].SALDO +
                                  Number.EPSILON) *
                                  100,
                              ) / 100}
                            </td>
                          );
                        }

                        if (
                          pcWK +
                            scWK -
                            empWK +
                            almoxarifados[0].SALDO +
                            stockWarehouse06[0].SALDO ===
                          0
                        ) {
                          return (
                            <td
                              style={{
                                color: '#9C6500',
                                backgroundColor: '#FFEB9C',
                              }}
                            >
                              {Math.round(
                                (pcWK +
                                  scWK -
                                  empWK +
                                  almoxarifados[0].SALDO +
                                  stockWarehouse06[0].SALDO +
                                  Number.EPSILON) *
                                  100,
                              ) / 100}
                            </td>
                          );
                        }

                        return (
                          <td
                            style={{
                              color: '#006100',
                              backgroundColor: '#C6EFCE',
                            }}
                          >
                            {Math.round(
                              (pcWK +
                                scWK -
                                empWK +
                                almoxarifados[0].SALDO +
                                stockWarehouse06[0].SALDO +
                                Number.EPSILON) *
                                100,
                            ) / 100}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td>SC</td>

                      {weeks.map(weekNumber => {
                        const scWK = SCs.reduce((acc, value) => {
                          if (value.WEEK === weekNumber) {
                            return acc + value.SALDO;
                          }
                          return acc;
                        }, 0);

                        if (weekNumber === 'ATR' && scWK !== 0) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE',
                              }}
                            >
                              {Math.round((scWK + Number.EPSILON) * 100) / 100}
                            </td>
                          );
                        }

                        return (
                          <td>
                            {Math.round((scWK + Number.EPSILON) * 100) / 100}
                          </td>
                        );
                      })}
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan="14">{empPlaceholder}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Total Empenhado</th>
                  <th>Total em SC</th>
                  <th>Total em PC</th>
                  <th>Total em OP</th>
                  <th>Saldo (previsto)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{sumEmp}</td>
                  <td>{sumSCs}</td>
                  <td>{sumPCs}</td>
                  <td>{sumOPs}</td>
                  <td>{saldoPrev}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Pedidos de Compra</h5>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EMISSÃO</th>
                  <th>APROVADO</th>
                  <th>PC</th>
                  <th>QTD</th>
                  <th>QTD_ENT</th>
                  <th>SALDO</th>
                  <th>DATA</th>
                  <th>FORN</th>
                </tr>
              </thead>
              <tbody>
                {PCs.length !== 0 ? (
                  PCs.map(pc => (
                    <tr>
                      <td>{pc.EMISSAO}</td>
                      <td>
                        {pc.APROVADO === 'L' ? (
                          <Badge variant="success">SIM</Badge>
                        ) : (
                          <Badge variant="danger">NÃO</Badge>
                        )}
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: '/pcs',
                            state: [pc.PEDIDO, 'Número'],
                          }}
                        >
                          {pc.PEDIDO}
                        </Link>
                      </td>
                      <td>{pc.QTD}</td>
                      <td>{pc.QTD_ENT}</td>
                      <td>{pc.SALDO}</td>
                      <td>{pc.ENTREGA}</td>
                      <td>{pc.DESC_FORN}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">{pcPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Solicitações de Compra</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EMISSÃO</th>
                  <th>SC</th>
                  <th>QTD</th>
                  <th>QTD_ATEND</th>
                  <th>DATA</th>
                  <th>OBS</th>
                </tr>
              </thead>
              <tbody>
                {SCs.length !== 0 ? (
                  SCs.map(sc => (
                    <tr>
                      <td>{sc.EMISSAO}</td>
                      <td>
                        <Link
                          to={{
                            pathname: '/scs',
                            state: [sc.SC, productNumber],
                          }}
                        >
                          {sc.SC}
                        </Link>
                      </td>
                      <td>{sc.QTD}</td>
                      <td>{sc.QTD_ENT}</td>
                      <td>{sc.ENTREGA}</td>
                      <td>{sc.OBS}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">{scPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Ordens de Produção</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>OP</th>
                  <th>CÓDIGO</th>
                  <th>DESCRIÇÃO</th>
                  <th>QTD</th>
                  <th>DATA_EMI</th>
                  <th>DATA_INI</th>
                  <th>DATA_FIM</th>
                  <th>CC</th>
                  <th>OBS</th>
                  <th>QTD_PRO</th>
                </tr>
              </thead>
              <tbody>
                {OPs.length !== 0 ? (
                  OPs.map(op => (
                    <tr>
                      <td>{op.OP}</td>
                      <td>{op.PRODUTO}</td>
                      <td>{op.DESCRICAO}</td>
                      <td>{op.QTD}</td>
                      <td>{op.DAT_EMI}</td>
                      <td>{op.DAT_INI}</td>
                      <td>{op.DAT_FIM}</td>
                      <td>{op.CC}</td>
                      <td>{op.OBS}</td>
                      <td>{op.QTD_PRO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">{opPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Onde Usado</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EQUIPAMENTO</th>
                  <th>QTD</th>
                </tr>
              </thead>
              <tbody>
                {OUs.length !== 0 ? (
                  OUs.map(ou => (
                    <tr>
                      <td>{ou.CODIGO}</td>
                      <td>{ou.QUANTIDADE}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">{ouPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs={8}>
            <h5>Planejamento (Empenhos)</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EQUIP</th>
                  <th>OP</th>
                  <th>QTD</th>
                  <th>ARM</th>
                  <th>DATA</th>
                </tr>
              </thead>
              <tbody>
                {EMPs.length !== 0 ? (
                  EMPs.map(emp => (
                    <tr>
                      <td>{emp.DEC_OP}</td>
                      <td>{emp.OP}</td>
                      <td>{emp.SALDO}</td>
                      <td>{emp.ARMAZEM}</td>
                      <td>{emp.ENTREGA}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">{empPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Cont>
  );
}
