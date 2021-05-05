import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import "../Detail.scss";

let Div = styled.div`
  padding: 20px;
`;

let Title = styled.h2`
  text-align: left;
  font-size: 25px;
  color: ${(props) => props.color};
`;

function Software(props) {
  let history = useHistory();
  let { id } = useParams();
  let [game, gameChange] = useState();

  let gameInfo = props.game.find(function (item) {
    return item.id == id;
  });

  return (
    <section>
      <div className="container">
        <Div>
          <Title>GAME TITLE</Title>
          <p>{gameInfo.content}</p>
          <p>{gameInfo.price}</p>
          <h3 className="pt-5">{gameInfo.title}</h3>
        </Div>
        <div className="row">
          <div className="col-md-6 mt-4">
            <img
              src={
                "http://devuhj.com/image/soft" +
                (props.game[gameInfo.id].id + 1) +
                ".jpg"
              }
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
                  payload: { id: gameInfo.id, name: gameInfo.title, quan: 1 },
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
    </section>
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

export default connect(redux)(Software);
