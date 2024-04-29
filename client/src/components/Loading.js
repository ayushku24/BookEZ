import React, { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

function Loading() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div>
      <div
        className="sweet-loading text-center text-align-center"
        style={{
          marginTop: "150px",
        }}
      >
        {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
        <input
          value={color}
          onChange={(input) => setColor(input.target.value)}
          placeholder="Color of the loader"
        /> */}

        <RingLoader
          color="#000"
          loading={loading}
          size={150}
          // cssOverride={override}
          // aria-label="Loading Spinner"
          // data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loading;
