import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

const CreateRule = () => {
  const [ruleString, setRuleString] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResponse(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/rules/create", {
        ruleString: ruleString,
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Create a Rule</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rule String:</Form.Label>
          <Form.Control
            type="text"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="e.g., age > 18 AND income > 50000"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Create Rule
        </Button>
      </Form>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}

      {response && (
        <Alert variant="success" className="mt-4">
          <h4>Rule Created:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-4">
          <h4>Error:</h4>
          <pre>{error}</pre>
        </Alert>
      )}
    </div>
  );
};

export default CreateRule;
