import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container as Cont } from './styles';

export default function LastPCsModal({ isOpen, handleClose, pcsData }) {
  return (
    <Cont>
      <Modal size="xl" show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Úttimos pedidos de compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>PC</th>
                <th>QTD</th>
                <th>PREÇO</th>
                <th>ENTREGUE</th>
                <th>FORN</th>
              </tr>
            </thead>
            <tbody>
              {pcsData.length !== 0 ? (
                pcsData.map(pc => (
                  <tr>
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
                    <td>{pc.PRECO}</td>
                    <td>{pc.ENTREGUE}</td>
                    <td>{pc.DESC_FORN}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Algo deu errado</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Cont>
  );
}
