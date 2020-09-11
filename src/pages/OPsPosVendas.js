import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './OPs.css';

import api from '../services/api';

export default function OPsPosVendas() {
  const [OPs, setOPs] = useState([]);
  const [opsPlaceholder, setOpsPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />,
  );
  useEffect(() => {
    async function loadOPs() {
      const response = await api.get('/ops', {
        headers: {
          filial: '0101',
          obs: 'POS',
        },
      });
      if (response.data.length === 0) {
        setOpsPlaceholder('Parece que não há ops...');
      }
      setOPs(response.data);
    }
    loadOPs();
  }, []);

  return (
    <div className="main-container-expand">
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
      <h1>OPs para o Pós Vendas</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>OP</th>
            <th>CÓDIGO</th>
            <th>DESCRIÇÃO</th>
            <th>QTD</th>
            <th>DATA EMI</th>
            <th>DATA INI</th>
            <th>DATA FIM</th>
            <th>CC</th>
            <th>OBS</th>
            <th>QTD PRO</th>
          </tr>
        </thead>

        <tbody>
          {OPs.length > 0 ? (
            OPs.map(ops => (
              <tr>
                <td>{ops.OP}</td>
                <td>{ops.PRODUTO}</td>
                <td>{ops.DESCRICAO}</td>
                <td>{ops.QTD}</td>
                <td>{ops.DAT_EMI}</td>
                <td>{ops.DAT_INI}</td>
                <td>{ops.DAT_FIM}</td>
                <td>{ops.CC}</td>
                <td>{ops.OBS}</td>
                <td>{ops.QTD_PRO}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">{opsPlaceholder}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
