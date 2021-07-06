import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Container as Cont } from './styles';
import { getMonth } from 'date-fns';

export default function LastPCsModal({ isOpen, handleClose, averageData, averageLast3Month }) {
  const monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  const month2DigArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const currentMonth = getMonth(new Date()) + 1;
  console.log('test')
  console.log(averageData )

  return (
    <Cont>
      <Modal size="xl" show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Consumo últimos 12 meses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th colSpan="12">MESES</th>
                <th colSpan="2">MÉDIA E TOTAL</th>
              </tr>
            </thead>
            <thead>
              <tr>
                {monthArray.map(month => {
                  return (
                    <th>{(currentMonth + month - 1) > 12 ? `${currentMonth + month - 13}` : `${currentMonth + month - 1}`}</th>
                  )
                })}
                <th>MÉDIA ÚLT 3 MESES</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {averageData.length !== 0 ? (
                <tr>
                  {monthArray.map(month => {
                    return (
                      <td>{(currentMonth + month - 1) > 12 ? 
                        averageData?.[`Q${month2DigArray[currentMonth + month - 14]}`] : 
                        averageData?.[`Q${month2DigArray[currentMonth + month - 2]}`]}
                      </td>
                    )
                  })}
                  <td>{averageLast3Month}</td>
                  <td>{averageData.total}</td>
                </tr>
                ) : (
                <tr>
                  <td colSpan="14">Algo deu errado...</td>
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
