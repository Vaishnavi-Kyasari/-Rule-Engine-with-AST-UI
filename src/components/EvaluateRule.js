import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

const EvaluateRule = () => {
  const [ruleString, setRuleString] = useState("");
  const [userAttributes, setUserAttributes] = useState({ age: "", income: "", department: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/rules/evaluate", {
        ruleString,
        userAttributes: {
          age: parseInt(userAttributes.age, 10),
          income: parseInt(userAttributes.income, 10),
          department: userAttributes.department,
        },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Evaluate Rule</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rule String:</Form.Label>
          <Form.Control
            type="text"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="e.g., age > 18 AND income > 50000 AND department = 'IT'"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={userAttributes.age}
            onChange={(e) => setUserAttributes({ ...userAttributes, age: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Income:</Form.Label>
          <Form.Control
            type="number"
            name="income"
            value={userAttributes.income}
            onChange={(e) => setUserAttributes({ ...userAttributes, income: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Department:</Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={userAttributes.department}
            onChange={(e) => setUserAttributes({ ...userAttributes, department: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Evaluate Rule
        </Button>
      </Form>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}

      {result !== null && (
        <Alert variant={result ? "success" : "danger"} className="mt-4">
          <h4>Evaluation Result:</h4>
          <p>{result ? "Rule Passed" : "Rule Failed"}</p>
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

export default EvaluateRule;
