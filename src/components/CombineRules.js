import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

const CombineRules = () => {
  const [rules, setRules] = useState([""]);
  const [combinedAst, setCombinedAst] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const newRules = [...rules];
    newRules[index] = event.target.value;
    setRules(newRules);
  };

  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const handleRemoveRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setCombinedAst(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/rules/combine", {
        rules: rules.filter((rule) => rule.trim() !== ""),
      });
      setCombinedAst(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Combine Rules</h2>
      <Form onSubmit={handleSubmit}>
        {rules.map((rule, index) => (
          <div className="input-group mb-3" key={index}>
            <Form.Control
              type="text"
              value={rule}
              onChange={(event) => handleChange(index, event)}
              placeholder="Enter rule"
              required
            />
            <Button variant="danger" onClick={() => handleRemoveRule(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddRule}>
          Add Rule
        </Button>
        <Button variant="success" type="submit" className="ml-2">
          Combine Rules
        </Button>
      </Form>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}

      {combinedAst && (
        <div className="mt-4">
          <h3>Combined AST:</h3>
          <pre>{JSON.stringify(combinedAst, null, 2)}</pre>
        </div>
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

export default CombineRules;
