import React, { useEffect, useState } from "react";

function Software(props) {
  let [game, gameChange] = useState();
  return (
    <section>
      {console.log(props.game[0].id)}
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                "http://devuhj.com/image/soft" + (props.game[0].id + 1) + ".jpg"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Software;
