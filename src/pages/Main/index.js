import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Container as Cont, Header } from './styles';
import logo from '../../img/logo.svg';

export default function Main() {
  return (
    <Cont>
      <Container fluid id="cont">
        <Col className="justify-content-center align-items-center">
          <Row className="justify-content-center">
            <Header>
              <div>
                <img src={logo} alt="AGF" />
                <h2>Dash</h2>
              </div>
            </Header>
          </Row>
          <Row className="align-items-center">
            <Col>
              <Link to="/estoquemaq">
                <button type="button">Estoque de Máquinas</button>
              </Link>
            </Col>
            <Col>
              <Link to="/estoqueger">
                <button type="button">Geradores</button>
              </Link>
            </Col>
            <Col>
              <Link to="/pcs">
                <button type="button">Pedidos de Compras</button>
              </Link>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <Link to="/scs">
                <button type="button">Solicitações de Compras</button>
              </Link>
            </Col>
            <Col>
              <Link to="/prodash">
                <button type="button">Consulta de Produto</button>
              </Link>
            </Col>
            <Col>
              <Link to="/productregister">
                <button type="button">Cadastro de Produtos</button>
              </Link>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <Link to="/opspos">
                <button type="button">OPs para o Pós Vendas</button>
              </Link>
            </Col>
            <Col>
              <Link to="/opsfilial">
                <button type="button">OPs para a Filial</button>
              </Link>
            </Col>
            <Col>
              <Link to="/opspp">
                <button type="button">OPs por Ponto de Pedido</button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Container>
    </Cont>
  );
}
