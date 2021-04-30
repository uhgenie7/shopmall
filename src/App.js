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

      <Route exact path="/">
        <Jumbotron className="background">
          <h1>MIITOPIA</h1>
          <p>미토피아 체험판 배포 중!</p>
          <p>
            <Button variant="primary">자세히 알아보기</Button>
          </p>
        </Jumbotron>
        <div className="container">
          <div className="row">
            {shoes.map((item, index) => {
              return <ShoesList shoes={shoes[index]} i={index} key={index} />;
            })}
          </div>
        </div>
      </Route>
      <Route path="/detail">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://codingapple1.github.io/shop/shoes1.jpg"
                width="100%"
              />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">상품명</h4>
              <p>상품설명</p>
              <p>120000원</p>
              <button className="btn btn-danger">주문하기</button>
            </div>
          </div>
        </div>
      </Route>
      {/* 이런 방식으로도 쓸 수 있다 */}
      {/* <Route path="/hello" component={ Modal}></Route> */}
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
