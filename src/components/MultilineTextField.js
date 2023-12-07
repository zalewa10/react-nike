// components/MultilineTextField.js

import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { InputAdornment } from "@mui/material";

const MultilineTextField = ({
  text,
  handleTextChange,
  handleKeyPress,
  handleSend,
}) => (
  <Box className="MultilineTextField">
    <div className="TextFieldContainer">
      <Typography variant="body2" className="TextPrompt">
        This is your random prompt
      </Typography>
      <TextField
        multiline
        maxRows={4}
        value={text}
        onChange={handleTextChange}
        onKeyPress={handleKeyPress}
        className="TextArea"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="send message"
                onClick={handleSend}
                edge="end"
                disabled={!text}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: "5px",
                  marginTop: "8px",
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />{" "}
      <IconButton aria-label="edit" size="small">
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  </Box>
);

export default MultilineTextField;
