import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Badge,
  Spinner,
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Pro_Dash.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../services/api';

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
  const [EMPs, setEMPs] = useState([]);
  const [OUs, setOUs] = useState([]);
  const [codigoPlaceholder, setCodigoPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [pcPlaceholder, setPcPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [scPlaceholder, setScPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [ouPlaceholder, setOuPlaceholder] = useState(
    'Pesquise por um código...',
  );
  const [empPlaceholder, setEmpPlaceholder] = useState(
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
  const [saldoPrev, setSaldoPrev] = useState('');
  const location = useLocation();

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

    const saldo =
      (almoxarifados[0] !== undefined ? almoxarifados[0].SALDO : 0) +
      sumPCs +
      sumSCs -
      sumEmp;
    setSaldoPrev(Number(parseFloat(saldo).toFixed(2)));
  }, [EMPs, PCs, SCs, almoxarifados, sumEmp, sumPCs, sumSCs]);

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
      setOUs([]);
      setEMPs([]);

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
      setEmpPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      setOuPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );

      const productInfoResponse = await api.get('/register', {
        headers: {
          filial: '0101',
          produto: product,
        },
      });
      if (productInfoResponse.data.length === 0) {
        setCodigoPlaceholder('Parece que esse código não existe...');
      }
      setProductInfo(productInfoResponse.data);

      const response = await api.get('/estoques', {
        headers: {
          filial: '0101',
          produto: product,
          armazem: '01',
        },
      });
      if (response.data.length === 0) {
        setAlmoxarifados([{ SALDO: 0 }]);
      } else {
        setAlmoxarifados(response.data);
      }

      const response2 = await api.get('/estoques', {
        headers: {
          filial: '0101',
          produto: product,
          armazem: '99',
        },
      });
      if (response2.data.length === 0) {
        setSupermercados([{ SALDO: 0 }]);
      } else {
        setSupermercados(response2.data);
      }

      const response3 = await api.get('/estoques', {
        headers: {
          filial: '0101',
          produto: product,
          armazem: '04',
        },
      });
      if (response3.data.length === 0) {
        setQuebrados([{ SALDO: 0 }]);
      } else {
        setQuebrados(response3.data);
      }

      const response4 = await api.get('/estoques', {
        headers: {
          filial: '0101',
          produto: product,
          armazem: '03',
        },
      });
      if (response4.data.length === 0) {
        setPos([{ SALDO: 0 }]);
      } else {
        setPos(response4.data);
      }

      const response5 = await api.get('/estoques', {
        headers: {
          filial: '0102',
          produto: product,
        },
      });
      if (response5.data.length === 0) {
        setVix([{ SALDO: 0 }]);
      } else {
        setVix(response5.data);
      }

      const stockWarehouse06Data = await api.get('/estoques', {
        headers: {
          filial: '0101',
          produto: product,
          armazem: '06',
        },
      });
      if (stockWarehouse06Data.data.length === 0) {
        setStockWarehouse06([{ SALDO: 0 }]);
      } else {
        setStockWarehouse06(stockWarehouse06Data.data);
      }

      const response6 = await api.get('/pcs', {
        headers: {
          filial: '0101',
          produto: product,
          finalizado: true,
        },
      });
      if (response6.data.length === 0) {
        setPcPlaceholder('Parece que não há PCs...');
      }
      setPCs(response6.data);

      const response7 = await api.get('/scs', {
        headers: {
          filial: '0101',
          produto: product,
          finalizado: true,
        },
      });
      if (response7.data.length === 0) {
        setScPlaceholder('Parece que não há SCs...');
      }
      setSCs(response7.data);

      const response9 = await api.get('/ou', {
        headers: {
          filial: '0101',
          produto: product,
        },
      });
      if (response9.data.length === 0) {
        setOuPlaceholder('Parece que não é usado em nenhum lugar...');
      }
      setOUs(response9.data);

      const response8 = await api.get('/emp', {
        headers: {
          filial: '0101',
          produto: product,
        },
      });
      if (response8.data.length === 0) {
        setEmpPlaceholder('Parece que não há empenhos...');
      }
      setEMPs(response8.data);
    },
    [productNumber],
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

  return (
    <div className="main-container">
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
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Código do Produto"
          aria-label="Código do Produto"
          aria-describedby="basic-addon2"
          value={productNumber}
          onKeyPress={keyPressed}
          onChange={e => setProductNumber(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-warning"
            onClick={() => handleSubmit()}
            type="submit"
          >
            Enviar
          </Button>
        </InputGroup.Append>
      </InputGroup>
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
              </tr>
            </thead>
            <tbody>
              {productInfo.length !== 0 ? (
                productInfo.map(product => (
                  <tr key={product.DESCRICAO}>
                    <td>{product.DESCRICAO}</td>
                    <td>{product.UM}</td>
                    <td>{product.PP}</td>
                    <td>{product.LE}</td>
                    <td>{product.ESTSEG}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">{codigoPlaceholder}</td>
                </tr>
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
                <th>ALMOXARIFADO</th>
              </tr>
            </thead>
            <tbody>
              {almoxarifados.length !== 0 ? (
                almoxarifados.map(almoxarifado => (
                  <tr key={almoxarifado.SALDO}>
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
                  <tr key={supermecado.SALDO}>
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
                  <tr key={stock06.SALDO}>
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
                  <tr key={quebrado.SALDO}>
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
                  <tr key={posItem.SALDO}>
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
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Total Empenhado</th>
                <th>Total em SC</th>
                <th>Total em PC</th>
                <th>Saldo (previsto)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{sumEmp}</td>
                <td>{sumSCs}</td>
                <td>{sumPCs}</td>
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
                <th>DATA</th>
                <th>FORN</th>
              </tr>
            </thead>
            <tbody>
              {PCs.length !== 0 ? (
                PCs.map(pc => (
                  <tr key={pc.EMISSAO}>
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
                          state: [pc.PEDIDO, productNumber],
                        }}
                      >
                        {pc.PEDIDO}
                      </Link>
                    </td>
                    <td>{pc.QTD}</td>
                    <td>{pc.QTD_ENT}</td>
                    <td>{pc.ENTREGA}</td>
                    <td>{pc.DESC_FORN}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">{pcPlaceholder}</td>
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
                  <tr key={sc.EMISSAO}>
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
                  <tr key={ou.CODIGO}>
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
                  <tr key={emp.DEC_OP}>
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
    </div>
  );
}
