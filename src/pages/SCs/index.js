import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Spinner,
  Container,
} from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container as Cont } from './styles';

import api from '../../services/api';

export default function SCs() {
  const [scNumber, setScNumber] = useState('');
  const [dataSCs, setDataSCs] = useState([]);
  const [scsPlaceholder, setScsPlaceholder] = useState(
    'Pesquise por uma SC...',
  );
  const location = useLocation();

  const handleSubmit = useCallback(
    async search => {
      setDataSCs([]);
      setScsPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      let sc = scNumber.trim();

      if (search > 0) {
        sc = search.toUpperCase().trim();
      }
      const response = await api.get(`/scs?filial=0101&sc=${sc}`, {});
      if (response.data.length === 0) {
        setScsPlaceholder('Parece que não há uma SC com esse número...');
      }

      setDataSCs(response.data);
    },
    [scNumber],
  );

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  useEffect(() => {
    if (location.state) {
      setScNumber(location.state[0]);
      handleSubmit(location.state[0]);
    }
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <Cont>
      <Container fluid className="justify-content-center">
        {location.state ? (
          <Row>
            <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
              <Link
                to={{
                  pathname: '/prodash',
                  state: location.state[1],
                }}
              >
                <FiArrowLeft color="#999" />
              </Link>
            </Col>
          </Row>
        ) : (
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
        )}

        <h1>Solicitações de Compra</h1>
        <InputGroup className="mb-3" onSubmit={handleSubmit}>
          <FormControl
            placeholder="Solicitação de Compra"
            aria-label="Solicitação de Compra"
            aria-describedby="basic-addon2"
            autoFocus
            value={scNumber}
            onKeyPress={keyPressed}
            onChange={e => setScNumber(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="outline-warning"
            >
              Enviar
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>PRODUTO</th>
              <th>DESCRIÇÃO</th>
              <th>EMISSÃO</th>
              <th>DATA</th>
              <th>UM</th>
              <th>QTD</th>
              <th>QTD_ENT</th>
              <th>SALDO</th>
              <th>OBS</th>
              <th>PC</th>
              <th>ENTREGA</th>
            </tr>
          </thead>
          <tbody>
            {dataSCs.length !== 0 ? (
              dataSCs.map(scs => (
                <tr>
                  <td>{scs.ITEM}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/prodash',
                        state: scs.PRODUTO,
                      }}
                    >
                      {scs.PRODUTO}
                    </Link>
                  </td>
                  <td>{scs.DESCRICAO}</td>
                  <td>{scs.EMISSAO}</td>
                  <td>{scs.ENTREGA}</td>
                  <td>{scs.UM}</td>
                  <td>{scs.QTD}</td>
                  <td>{scs.QTD_ENT}</td>
                  <td>{scs.SALDO}</td>
                  <td>{scs.OBS}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/pcs',
                        state: [scs.PC, 'Número'],
                      }}
                    >
                      {scs.PC}
                    </Link>
                  </td>
                  <td>{scs.PC_ENTREGA}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">{scsPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  );
}
