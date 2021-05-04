import React, { useContext, useState } from "react";
import "./App.css";
import { Navbar, Nav, Jumbotron, Button } from "react-bootstrap";
import Data from "./data.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import Software from "./component/Software";
import Game from "./game";
import axios from "axios";
// props 상태관리 쉽게 하기
let stockContext = React.createContext();
// 같은 변수 값을 공유할 범위 생성
function App() {
  let [news, newsChange] = useState(Data);
  let [game, gameChange] = useState(Game);
  let [load, loadingChange] = useState(false);
  // 재고
  let [stock, stockChange] = useState([10, 11, 12]);
  // 클릭 저장 상태
  let [tab, tabChange] = useState(0);
  let newGame = game.map((item, index) => {
    return <GameList game={game[index]} i={index} key={index} />;
  });

  let n3dsGame = game.map((item, index) => {
    return <N3dsList game={game[index]} i={index} key={index} />;
  });

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
                  {news.map((item, index) => {
                    return (
                      <NewsList news={news[index]} i={index} key={index} />
                    );
                  })}
                </div>
              </stockContext.Provider>
              <button
                className="btn btn-primary"
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      newsChange([...news, ...result.data]);
                    })
                    .catch(() => {
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
              <div className="gameTitleBtns">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    tabChange(0);
                  }}
                >
                  신상품
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    tabChange(1);
                  }}
                >
                  SWITCH
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    tabChange(2);
                  }}
                >
                  3DS
                </button>
              </div>
              <div className="gameTitleContainer">
                <div className="row">
                  <TabContent tab={tab} newGame={newGame} n3dsGame={n3dsGame} />
                </div>
              </div>
            </div>
            <button className="btn btn-primary">더보기</button>
          </section>
          <section className="notice">공지사항 자리</section>
        </Route>
        <Route path="/detail/:id">
          <Detail news={news} stock={stock} stockChange={stockChange} />
        </Route>
        <Route path="/software/:id">
          <Software game={game} />
        </Route>
        <Route path="/:id">
          <div>여긴 어떻게 오셨나요?</div>
        </Route>
      </Switch>
      <footer>
        <div className="inner">
          <div className="btnTerms">
            <a href="#">이용약관</a>
            <a href="#">개인정보취급방침</a>
          </div>
          <p className="f-info">고객지원 문의전화 : 1670-9900</p>
          <address>
            ⓒ 2006 Nintendo of Korea Co., Ltd. All Rights Reserved.
            <br />
            <span>상호명 : 한국닌텐도주식회사</span>
            <span>대표자명 : 미우라 타카히로</span>
          </address>
        </div>
      </footer>
    </div>
  );
}

// component
function NewsList(props) {
  let stocks = useContext(stockContext);
  return (
    <div className="col-md-4">
      <Link to={"/detail/" + props.i}>
        <img
          width="100%"
          src={
            "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
          }
          alt={"상품" + props.i + 1}
        />
      </Link>
      <h3 className="news-title">{props.news.title}</h3>
      <p>{props.news.content}</p>
      <p>{props.news.price}</p>
      {stocks[props.i]}
    </div>
  );
}

function GameList(props) {
  return (
    <div className="col-md-4">
      <Link to={"/software/" + props.i}>
        <img
          width="100%"
          src={
            "http://devuhj.com/nintendo/image/soft/soft" +
            (props.i + 1) +
            ".jpg"
          }
          alt={"상품" + props.i + 1}
        />
      </Link>
      <h3>{props.game.title}</h3>
      <p>{props.game.release}</p>
      <p>{props.game.account}</p>
    </div>
  );
}

function SwitchList(props) {
  return (
    <div className="col-md-4">
      <Link to={"/software/" + props.i}>
        <img
          width="100%"
          src={
            "http://devuhj.com/nintendo/image/soft/soft" +
            (props.i + 1) +
            ".jpg"
          }
          alt={"상품" + props.i + 1}
        />
      </Link>
      <h3>{props.game.title}</h3>
      <p>{props.game.release}</p>
      <p>{props.game.account}</p>
    </div>
  );
}

function N3dsList(props) {
  return (
    <div className="col-md-4">
      <Link to={"/software/" + props.i}>
        <img
          width="100%"
          src={
            "http://devuhj.com/nintendo/image/3ds/3ds" + (props.i + 1) + ".jpg"
          }
          alt={"상품" + props.i + 1}
        />
      </Link>
      <h3>{props.game.title}</h3>
      <p>{props.game.release}</p>
      <p>{props.game.account}</p>
    </div>
  );
}

function TabContent(props) {
  if (props.tab === 0) {
    return props.newGame;
  } else if (props.tab === 1) {
    return props.newGame;
  } else if (props.tab === 2) {
    return props.n3dsGame;
  }
}

export default App;
