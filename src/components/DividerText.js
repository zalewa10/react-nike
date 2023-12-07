// components/DividerText.js

import React from "react";
import Divider from "@mui/material/Divider";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const DividerText = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const formattedTime = `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;

  return (
    <div
      style={{
        width: "100%",
        typography: { body2: { marginTop: 0 } },
      }}
    >
      <Divider textAlign="left">
        <AutoAwesomeIcon
          fontSize="small"
          style={{ color: "gray", transform: "translateY(4px)" }}
        />
        <span style={{ marginLeft: "1px" }}>Copilot {formattedTime}</span>
      </Divider>
    </div>
  );
};

export default DividerText;
