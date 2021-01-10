import React from "react";
import ReactLoading from "react-loading";

import "./styles.css";

const Loading = () => (
    <div className="section-loading">
        <ReactLoading type="bars" color="#00D4FF" />
    </div>
);

export default Loading;
