import React, { useEffect, useState } from 'react';
import { Table, Col, Row, Spinner, Container } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container as Cont } from './styles';

import api from '../../services/api';

export default function EstoquesGer() {
  const [estoques, setEstoques] = useState([]);
  const [PCs, setPCs] = useState([]);
  const [SCs, setSCs] = useState([]);
  const [gs125_01, setGS125_01] = useState([]);
  const [gs165_01, setGS165_01] = useState([]);
  const [gs230_01, setGS230_01] = useState([]);
  const [gs260_01, setGS260_01] = useState([]);
  const [gs125A_01, setGS125A_01] = useState([]);
  const [gs165A_01, setGS165A_01] = useState([]);
  const [gs230A_01, setGS230A_01] = useState([]);
  const [gs260A_01, setGS260A_01] = useState([]);
  const [saldosPlaceholder, setSaldosPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />,
  );
  const [pcPlaceholder, setPcPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />,
  );
  const [scPlaceholder, setScPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />,
  );

  useEffect(() => {
    async function loadEstoques() {
      const saldos = await api.get(
        `/estoques?produto=GS125',%20'GS165',%20'GS230',%20'GS260`,
      );
      if (saldos.data.length === 0) {
        setSaldosPlaceholder('Parece que não há saldo...');
      } else {
        setEstoques(saldos.data);
      }

      const pcs = await api.get(
        `/pcs?filial=0101&finalizado=true&produto=9900001327',%20'9900000777',%20'9900000778',%20'9900001100',%20'9900001718',%20'9900000786',%20'9900000821',%20'9900001101`,
      );
      if (pcs.data.length === 0) {
        setPcPlaceholder('Parece que não há PCs...');
      } else {
        setPCs(pcs.data);
      }

      const scs = await api.get(
        `/scs?filial=0101&finalizado=true&produto=9900001327',%20'9900000777',%20'9900000778',%20'9900001100',%20'9900001718',%20'9900000786',%20'9900000821',%20'9900001101`,
      );
      if (scs.data.length === 0) {
        setScPlaceholder('Parece que não há PCs...');
      } else {
        setSCs(scs.data);
      }

      // motores
      const response1 = await api.get(
        '/estoques?filial=0101&produto=9900001327&armazem=01',
      );
      if (response1.data.length === 0) {
        setGS125_01([{ SALDO: 0 }]);
      } else {
        setGS125_01(response1.data);
      }

      const response2 = await api.get(
        '/estoques?filial=0101&produto=9900000777&armazem=01',
      );
      if (response2.data.length === 0) {
        setGS165_01([{ SALDO: 0 }]);
      } else {
        setGS165_01(response2.data);
      }

      const response3 = await api.get(
        '/estoques?filial=0101&produto=9900000778&armazem=01',
      );
      if (response3.data.length === 0) {
        setGS230_01([{ SALDO: 0 }]);
      } else {
        setGS230_01(response3.data);
      }

      const response4 = await api.get(
        '/estoques?filial=0101&produto=9900001100&armazem=01',
      );
      if (response4.data.length === 0) {
        setGS260_01([{ SALDO: 0 }]);
      } else {
        setGS260_01(response4.data);
      }

      // alternadores

      const response5 = await api.get(
        '/estoques?filial=0101&produto=9900001718&armazem=01',
      );
      if (response5.data.length === 0) {
        setGS125A_01([{ SALDO: 0 }]);
      } else {
        setGS125A_01(response5.data);
      }

      const response6 = await api.get(
        '/estoques?filial=0101&produto=9900000786&armazem=01',
      );
      if (response6.data.length === 0) {
        setGS165A_01([{ SALDO: 0 }]);
      } else {
        setGS165A_01(response6.data);
      }

      const response7 = await api.get(
        '/estoques?filial=0101&produto=9900000821&armazem=01',
      );
      if (response7.data.length === 0) {
        setGS230A_01([{ SALDO: 0 }]);
      } else {
        setGS230A_01(response7.data);
      }

      const response8 = await api.get(
        '/estoques?filial=0101&produto=9900001101&armazem=01',
      );
      if (response8.data.length === 0) {
        setGS260A_01([{ SALDO: 0 }]);
      } else {
        setGS260A_01(response8.data);
      }
    }
    loadEstoques();
  }, []);

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
        <h1>Estoque de Geradores</h1>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>FILIAL</th>
              <th>CÓDIGO</th>
              <th>SALDO</th>
              <th>ARMAZEM</th>
            </tr>
          </thead>

          <tbody>
            {estoques.length > 0 ? (
              estoques.map(estoque => (
                <tr key={estoque.FILIAL.concat('', estoque.PRODUTO)}>
                  <td>{estoque.FILIAL}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: estoque.PRODUTO,
                      }}
                    >
                      {estoque.PRODUTO}
                    </Link>
                  </td>
                  <td>{estoque.SALDO}</td>
                  <td>{estoque.ARMAZEM}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">{saldosPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Row>
          <Col>
            <h5>Pedidos de Compra</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>PC</th>
                  <th>COD</th>
                  <th>QTD</th>
                  <th>QTD_ENT</th>
                  <th>DATA</th>
                  <th>FORN</th>
                </tr>
              </thead>
              <tbody>
                {PCs.length > 0 ? (
                  PCs.map(pc => (
                    <tr key={pc.PEDIDO.concat('', pc.PRODUTO)}>
                      <td>{pc.PEDIDO}</td>
                      <td>
                        <Link
                          to={{
                            pathname: '/prodash',
                            state: pc.PRODUTO,
                          }}
                        >
                          {pc.PRODUTO}
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
                    <td colSpan="6">{pcPlaceholder}</td>
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
                  <th>SC</th>
                  <th>COD</th>
                  <th>QTD</th>
                  <th>QTD_ENT</th>
                  <th>DATA</th>
                  <th>OBS</th>
                </tr>
              </thead>
              <tbody>
                {SCs.length > 0 ? (
                  SCs.map(sc => (
                    <tr key={sc.SC.concat('', sc.PRODUTO)}>
                      <td>{sc.SC}</td>
                      <td>
                        <Link
                          to={{
                            pathname: '/prodash',
                            state: sc.PRODUTO,
                          }}
                        >
                          {sc.PRODUTO}
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
            <h5>ESTOQUE MOTORES</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>GERADOR</th>
                  <th>CÓDIGO</th>
                  <th>SALDO</th>
                </tr>
              </thead>
              <tbody>
                <tr key="GS125M">
                  <td>GS125</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900001327',
                      }}
                    >
                      9900001327
                    </Link>
                  </td>
                  {gs125_01.length > 0 ? (
                    <td>
                      {gs125_01.map(gs125 => (
                        <div>{gs125.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
                <tr key="GS165M">
                  <td>GS165</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900000777',
                      }}
                    >
                      9900000777
                    </Link>
                  </td>
                  {gs165_01.length > 0 ? (
                    <td>
                      {gs165_01.map(gs165 => (
                        <div>{gs165.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
                <tr key="GS230M">
                  <td>GS230</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900000778',
                      }}
                    >
                      9900000778
                    </Link>
                  </td>
                  {gs230_01.length > 0 ? (
                    <td>
                      {gs230_01.map(gs230 => (
                        <div>{gs230.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
                <tr key="GS260M">
                  <td>GS260</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900001100',
                      }}
                    >
                      9900001100
                    </Link>
                  </td>
                  {gs260_01.length > 0 ? (
                    <td>
                      {gs260_01.map(gs260 => (
                        <div>{gs260.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>ESTOQUE ALTERNADORES</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>GERADOR</th>
                  <th>CÓDIGO</th>
                  <th>SALDO</th>
                </tr>
              </thead>
              <tbody>
                <tr key="GS125A">
                  <td>GS125</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900001718',
                      }}
                    >
                      9900001718
                    </Link>
                  </td>
                  {gs125A_01.length > 0 ? (
                    <td>
                      {gs125A_01.map(gs125 => (
                        <div>{gs125.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
                <tr key="GS165A">
                  <td>GS165</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900000786',
                      }}
                    >
                      9900000786
                    </Link>
                  </td>
                  {gs165A_01.length > 0 ? (
                    <td>
                      {gs165A_01.map(gs165 => (
                        <div>{gs165.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
                <tr key="GS230A">
                  <td>GS230</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900000821',
                      }}
                    >
                      9900000821
                    </Link>
                  </td>
                  {gs230A_01.length > 0 ? (
                    <td>
                      {gs230A_01.map(gs230 => (
                        <div>{gs230.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
                <tr key="GS260A">
                  <td>GS260</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: '9900001101',
                      }}
                    >
                      9900001101
                    </Link>
                  </td>
                  {gs260A_01.length > 0 ? (
                    <td>
                      {gs260A_01.map(gs260 => (
                        <div>{gs260.SALDO}</div>
                      ))}
                    </td>
                  ) : (
                    <td colSpan="4">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Cont>
  );
}
