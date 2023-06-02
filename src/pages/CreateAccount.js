import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useData } from '../context/DataContext';

export const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { users, setUsers } = useData();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setShowErrorMessage(true);
      alert('Please enter a name');
      return;
    }
    if (!email) {
      setShowErrorMessage(true);
      alert('Please enter an email address');
      return;
    }
    if (password.length < 8) {
      setShowErrorMessage(true);
      alert('Password must be at least 8 characters');
      return;
    }
    const newAccount = {
      name,
      email,
      password,
      balance: 100,
    };
    const updatedUsers = [...users, newAccount];
    setUsers(updatedUsers);
    setShowSuccessMessage(true);
    setShowErrorMessage(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleAddAnotherAccount = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h2>Create Account</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button disabled={!name || !email || !password} className='mt-3' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {showSuccessMessage && (
            <Alert variant="success" className="mt-3">
              Account created successfully!
              <Button onClick={handleAddAnotherAccount} className='ml-3 mt-3 ms-2' variant="secondary">
              Add Another Account
            </Button>
            </Alert>
          )}
          {showErrorMessage && (
            <Alert variant="danger" className="mt-3">
              Error creating account.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};