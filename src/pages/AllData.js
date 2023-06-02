import React from 'react';
import { useData } from '../context/DataContext';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

export const AllData = () => {
  const { users, balance } = useData();

  return (
    <div className='container mx-auto mt-5'>
      <Card className='px-4 py-4'>
          <Card.Title>All Data</Card.Title>
        <Card.Body>
          <ListGroup className='m-auto'>
            {users.map((user) => (
              <ListGroup.Item className='d-flex align-items-center' key={user.id}>
                <Row>
                  <Col xs={12} md={4}>
                    <h5>User: {user.name}</h5>
                  </Col>
                  <Col xs={12} md={4}>
                    <p>Email: {user.email}</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <p>Current Balance: ${balance}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
