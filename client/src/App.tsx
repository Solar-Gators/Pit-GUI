import React, { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import LiveTelemetry from "./pages/LiveTelemetry";
import "bootstrap/dist/css/bootstrap.min.css";
import ArchivedTelemetry from "./pages/ArchivedTelemetry";
import Strategy from "./pages/Strategy";
import CountLaps from "./pages/CountLaps";
import { Modal, Form, Button } from "react-bootstrap";

export default function App() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/history" element={<ArchivedTelemetry />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/count" element={<CountLaps />} />
            <Route path="*" element={<LiveTelemetry />} />
          </Routes>
        </div>
      </BrowserRouter>
      {localStorage.getItem("passwordNeedsSet") == "true" && (
        <Modal show={true}>
          <Modal.Header>Enter Username/Password</Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={() => {
                localStorage.setItem(
                  "username",
                  String(usernameInput?.current?.value),
                );
                localStorage.setItem(
                  "password",
                  String(passwordInput?.current?.value),
                );
                localStorage.setItem("passwordNeedsSet", "false");
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control ref={usernameInput} type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordInput} type="password" />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
