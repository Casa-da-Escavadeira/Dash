import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Badge,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './PCs.css';

import api from '../services/api';

export default function PCs() {
  const [pcNumber, setPcNumber] = useState('');
  const [dataPCs, setDataPCs] = useState([]);
  const [sumPCs, setSumPCs] = useState([]);
  const [pcsPlaceholder, setPcsPlaceholder] = useState('Pesquise por um PC...');
  const location = useLocation();

  const handleSubmit = useCallback(
    async search => {
      setDataPCs([]);
      setPcsPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />,
      );
      let pc = pcNumber.trim();

      if (search > 0) {
        pc = search.toUpperCase().trim();
      }

      const response = await api.get('/pcs', {
        headers: {
          filial: '0101',
          pc,
        },
      });
      if (response.data.length === 0) {
        setPcsPlaceholder('Parece que não há um PC com esse número...');
      }

      setDataPCs(response.data);
    },
    [pcNumber],
  );

  useEffect(() => {
    const mapPCs = dataPCs.map(pc => pc.PRECO * (pc.QTD - pc.QTD_ENT));
    const totalSumPCs = mapPCs.length > 0 ? mapPCs.reduce((a, b) => a + b) : 0;
    setSumPCs(totalSumPCs);
  }, [dataPCs]);

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  useEffect(() => {
    if (location.state) {
      setPcNumber(location.state[0]);
      handleSubmit(location.state[0]);
    }
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <div className="main-container">
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

      <h1>Pedidos de Compra</h1>
      <InputGroup className="mb-3" onSubmit={handleSubmit}>
        <FormControl
          placeholder="Pedido de Compra"
          aria-label="Pedido de Compra"
          aria-describedby="basic-addon2"
          value={pcNumber}
          onKeyPress={keyPressed}
          onChange={e => setPcNumber(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            onClick={() => handleSubmit()}
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
            <th>APROVADO</th>
            <th>ITEM</th>
            <th>PRODUTO</th>
            <th>DESCRIÇÃO</th>
            <th>UM</th>
            <th>QTD</th>
            <th>QTD_ENT</th>
            <th>PREÇO</th>
            <th>NUM_SC</th>
            <th>OBS</th>
            <th>ENTREGA</th>
            <th>FORN</th>
            <th>DESC_FORN</th>
          </tr>
        </thead>
        <tbody>
          {dataPCs.length !== 0 ? (
            dataPCs.map(pcs => (
              <tr>
                <td>
                  {pcs.APROVADO === 'L' ? (
                    <Badge variant="success">SIM</Badge>
                  ) : (
                    <Badge variant="danger">NÃO</Badge>
                  )}
                </td>
                <td>{pcs.ITEM}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/prodash',
                      state: pcs.PRODUTO,
                    }}
                  >
                    {pcs.PRODUTO}
                  </Link>
                </td>
                <td>{pcs.DESCRICAO}</td>
                <td>{pcs.UM}</td>
                <td>{pcs.QTD}</td>
                <td>{pcs.QTD_ENT}</td>
                <td>R${pcs.PRECO}</td>
                <td>{pcs.NUMSC}</td>
                <td>{pcs.OBS}</td>
                <td>{pcs.ENTREGA}</td>
                <td>{pcs.FORN}</td>
                <td>{pcs.DESC_FORN}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">{pcsPlaceholder}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3>
        Total do pedido:{' '}
        {sumPCs.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h3>
    </div>
  );
}
