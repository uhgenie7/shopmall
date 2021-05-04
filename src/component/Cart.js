import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

function Cart(props) {
  return (
    <div>
      <Table responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((item, index) => {
            return (
              <tr>
                <td>{item.id + 1}</td>
                <td>{item.name}</td>
                <td>{item.quan}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      props.dispatch({ type: "증가" });
                    }}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      props.dispatch({ type: "감소" });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="my-alert-yellow">
        <p>지금 구매하시면 신규 할인!</p>
        <button>닫기</button>
      </div>
    </div>
  );
}

function redux(state) {
  return {
    state: state,
  };
}

export default connect(redux)(Cart);
// export default Cart;
