import logo from './logo.svg';
import './App.css';
import React from "react";
import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRules';
import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <h1 className="text-center my-4">Rule Engine</h1>
      <Row className="justify-content-md-center">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Create a Rule</Card.Title>
              <CreateRule />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Evaluate Rule</Card.Title>
              <EvaluateRule />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Combine Rules</Card.Title>
              <CombineRules />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
