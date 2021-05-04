import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
// css를 미리 입혀놓은 컴포넌트
import "../Detail.scss";

let Div = styled.div`
  padding: 20px;
`;

let Title = styled.h2`
  text-align: left;
  font-size: 25px;
  color: ${(props) => props.color};
`;

function Detail(props) {
  let history = useHistory();
  let { id } = useParams(); // {사용자가 입력한 URL }
  let newsInfo = props.news.find(function (item) {
    return item.id == id;
  });
  let [hideDiv, changeDiv] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      changeDiv(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [hideDiv]);
  // []는 특정 조건. hideDiv가 실행될 때만 실행

  function AlertDiv() {
    return (
      <div className="my-alert-yellow">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>
    );
  }
  return (
    <div className="container">
      <Div>
        <Title>NEWS & UPDATE</Title>
        <p>{newsInfo.content}</p>
        <p>{newsInfo.price}</p>
        <h3 className="pt-5">{newsInfo.title}</h3>
      </Div>
      {hideDiv === false ? <AlertDiv /> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <Stock stock={props.stock} />
          <button
            className="btn btn-danger"
            onClick={() => {
              props.stockChange([9, 11, 12]);
              // let propsStock = [...props.stock];
              // propsStock = propsStock[0] - 1;
              // props.stockChange(propsStock);
              props.dispatch({
                type: "항목추가",
                payload: { id: 4, name: "새로운상품", quan: 1 },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            특정경로
          </button>
        </div>
      </div>
    </div>
  );
}

function Stock(props) {
  return <div>재고: {props.stock[0]}</div>;
}

function redux(state) {
  return {
    state: state.reducer,
    alertState: state.reducer2,
  };
}

export default connect(redux)(Detail);
// export default Detail;
