import React, { useState, useCallback } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import { Container as Cont } from './styles';

export default function PrintModal({ textPrint, isOpen, handleClose }) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [dataSelectionModel, setDataSelectionModel] = useState([]);
  const [rows, setRows] = useState([
    { id: 1, name: 'Lucas', age: 20 },
    { id: 2, name: 'Jão', age: 10 },
  ]);

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, props }) => {
      if (field === 'age') {
        const data = props;
        const age = data.value;
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, age: Number(age) };
          }
          return row;
        });
        setRows(updatedRows);
        const newSelectionData = updatedRows.filter(row =>
          selectionModel.includes(row.id),
        );
        setDataSelectionModel(newSelectionData);
      }
    },
    [rows, selectionModel],
  );

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', editable: true },
  ];

  return (
    <Cont>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={newSelection => {
                setSelectionModel(newSelection.selectionModel);
                const newSelectionData = rows.filter(row =>
                  newSelection.selectionModel.includes(row.id),
                );
                setDataSelectionModel(newSelectionData);
              }}
              selectionModel={selectionModel}
              onEditCellChangeCommitted={handleEditCellChangeCommitted}
            />
          </div>
          Teste
          <Form.Control as="textarea" placeholder="Leave a comment here">
            {textPrint}
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => console.log(dataSelectionModel)}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Cont>
  );
}
