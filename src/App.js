import React, { useContext, useState } from "react";
import "./App.css";
import { Navbar, Nav, Jumbotron, Button } from "react-bootstrap";
import Data from "./data.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";
// props 상태관리 쉽게 하기
let stockContext = React.createContext();
// 같은 변수 값을 공유할 범위 생성
function App() {
  let [shoes, shoesChange] = useState(Data);
  let [load, loadingChange] = useState(false);
  // 재고
  let [stock, stockChange] = useState([10, 11, 12]);

  function Loading() {
    return (
      <div>
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세 내용</p>
      </div>
    );
  }
  return (
    <div className="App">
      <header>
        <Navbar expand="lg">
          <h1 className="main-logo">
            <Nav as={Link} to="/">
              닌텐도
            </Nav>
          </h1>
          <Navbar.Toggle aria-controls="navbar-light" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Nintento switch
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                닌텐도 3DS
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                소프트웨어
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                고객지원
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                NEWS
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto d-md-flex d-none">
              <Nav.Link as={Link} to="/">
                <i class="fa fa-user"></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                search
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <Switch>
        <Route exact path="/">
          <section>
            <Jumbotron className="background">
              <h2>MIITOPIA</h2>
              <p>미토피아 체험판 배포 중!</p>
              <Button variant="primary">자세히 알아보기</Button>
            </Jumbotron>
          </section>
          <section>
            <div className="container">
              <h2>NEWS & UPDATE</h2>
              <stockContext.Provider value={stock}>
                <div className="row">
                  {shoes.map((item, index) => {
                    return (
                      <ShoesList shoes={shoes[index]} i={index} key={index} />
                    );
                  })}
                </div>
              </stockContext.Provider>
              <button
                className="btn btn-primary"
                onClick={() => {
                  axios.post("서버URL", { id: "admin", pw: 1234 });
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      // loadingChange(!load);
                      shoesChange([...shoes, ...result.data]);
                    })
                    .catch(() => {
                      // loadingChange(!load);
                      console.log("실패했습니다");
                    });
                }}
              >
                더보기
              </button>
            </div>
          </section>
          <section>
            <div className="container">
              <h2>GAME TITLE</h2>
              <button className="btn btn-primary">신상품</button>
              <button className="btn btn-primary">SWITCH</button>
              <button className="btn btn-primary">3DS</button>
            </div>
          </section>
          <section>
            <div className="container">배너자리</div>
          </section>
          <section>공지사항 자리</section>
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} stockChange={stockChange} />
        </Route>
        <Route path="/:id">
          <div>여긴 어떻게 오셨나요?</div>
        </Route>
      </Switch>
      <footer>footer자리</footer>
    </div>
  );
}

// component
function ShoesList(props) {
  let stocks = useContext(stockContext);

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
      {stocks[props.i]}
    </div>
  );
}

export default App;
