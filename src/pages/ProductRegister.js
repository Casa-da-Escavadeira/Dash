import React, { useState } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductRegister.css';
import { FiLogIn } from 'react-icons/fi';

import api from '../services/api';

export default function ProductRegister() {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('Pesquisar por...');

  async function handleSubmit(e) {
    const search = searchValue.toUpperCase().trim();
    let response;

    if (filter === 'Código') {
      response = await api.get('/register', {
        headers: {
          filial: '0101',
          busca_cod_produto: search,
        },
      });
    } else {
      response = await api.get('/register', {
        headers: {
          filial: '0101',
          busca_desc_produto: search,
        },
      });
    }

    setProducts(response.data);
  }

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="main-container">
      <h1>Cadastro de Produtos</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Código do Produto"
          aria-label="Código do Produto"
          aria-describedby="basic-addon2"
          value={searchValue}
          onKeyPress={keyPressed}
          onChange={e => setSearchValue(e.target.value)}
        />
        <DropdownButton
          as={InputGroup.Append}
          variant="outline-warning"
          title={filter}
          id="input-group-dropdown-2"
        >
          <Dropdown.Item onClick={() => setFilter('Descrição')}>
            Descrição
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('Código')}>
            Código
          </Dropdown.Item>
        </DropdownButton>
        <InputGroup.Append>
          <Button
            variant="outline-warning"
            onClick={handleSubmit}
            type="submit"
          >
            Enviar
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>DESCRIÇÃO</th>
            <th>UM</th>
            <th>VER_MAIS</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.CODIGO}>
              <td>{product.CODIGO}</td>
              <td>{product.DESCRICAO}</td>
              <td>{product.UM}</td>
              <td>
                <Link
                  to={{
                    pathname: '/prodash',
                    state: product.CODIGO,
                  }}
                >
                  <FiLogIn color="#999" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
