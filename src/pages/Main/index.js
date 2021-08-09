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
                <img src={logo} alt="Casa da Escavadeira" />
                <h2>Dash</h2>
              </div>
            </Header>
          </Row>
          <Row className="align-items-center">
            <Col>
            <Link to="/productregister">
                <button type="button">Cadastro de Produtos</button>
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
              <Link to="/prodash">
                <button type="button">Consulta de Produto</button>
              </Link>
            </Col>
            <Col>
            <Link to="/scs">
                <button type="button">Solicitações de Compras</button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Container>
    </Cont>
  );
}
