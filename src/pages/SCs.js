import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './SCs.css';

import api from '../services/api';

export default function SCs() {
  const [scNumber, setScNumber] = useState('');
  const [dataSCs, setDataSCs] = useState([]);
  const location = useLocation();

  const handleSubmit = useCallback(
    async search => {
      let sc = scNumber.trim();

      if (search) {
        sc = search.toUpperCase().trim();
      }
      const response = await api.get('/scs', {
        headers: {
          filial: '0101',
          sc,
        },
      });

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

      <h1>Solicitações de Compra</h1>
      <InputGroup className="mb-3" onSubmit={handleSubmit}>
        <FormControl
          placeholder="Solicitação de Compra"
          aria-label="Solicitação de Compra"
          aria-describedby="basic-addon2"
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
            <th>DATA</th>
            <th>UM</th>
            <th>QTD</th>
            <th>EM PC</th>
            <th>OBS</th>
            <th>PC</th>
            <th>ENTREGA</th>
          </tr>
        </thead>
        <tbody>
          {dataSCs.map(scs => (
            <tr>
              <td>{scs.ITEM}</td>
              <td>{scs.PRODUTO}</td>
              <td>{scs.DESCRICAO}</td>
              <td>{scs.ENTREGA}</td>
              <td>{scs.UM}</td>
              <td>{scs.QTD}</td>
              <td>{scs.QTD_ENT}</td>
              <td>{scs.OBS}</td>
              <td>{scs.PC}</td>
              <td>{scs.PC_ENTREGA}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
