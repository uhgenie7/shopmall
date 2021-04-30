import React, { useState } from "react";
import "./App.css";
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from "react-bootstrap";
import Data from "./data.js";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  let [shoes, shoesChange] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">닌텐토 쇼핑몰</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Jumbotron className="background">
        <h1>MIITOPIA</h1>
        <p>미토피아 체험판 배포 중!</p>
        <p>
          <Button variant="primary">자세히 알아보기</Button>
        </p>
      </Jumbotron>

      <Route path="/">
        <div>메인페이지</div>
      </Route>
      <Route path="/detail">
        <div>디테일 페이지입니다</div>
      </Route>

      <div className="container">
        <div className="row">
          {shoes.map((item, index) => {
            return <ShoesList shoes={shoes[index]} i={index} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

// component
function ShoesList(props) {
  return (
    <div className="col-md-4">
      <img
        width="100%"
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        alt="상품1"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
    </div>
  );
}

export default App;
