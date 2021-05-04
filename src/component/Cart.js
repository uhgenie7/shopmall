import React from "react";
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
                <td>{props.state[index].id + 1}</td>
                <td>{props.state[index].name}</td>
                <td>{props.state[index].quan}</td>
                <td>Table cell</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
