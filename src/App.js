// App.js

import React from "react";
import { useQuery, ApolloProvider, gql } from "@apollo/client";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Divider from "@mui/material/Divider";
import client from "./apollo";
import "./styles.css";

const GET_DYNAMIC_TABLE_DATA = gql`
  query {
    dynamicTableData {
      text1
      text2
      data {
        Dessert
        Calories
        Fat
        Carbs
        Protein
      }
    }
  }
`;

function DividerText() {
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
}

const App = () => {
  const { loading, error, data } = useQuery(GET_DYNAMIC_TABLE_DATA);

  const [text, setText] = React.useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text) {
      console.log("Sending:", text);
      setText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const renderMultilineTextFields = () => (
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

  const renderDynamicTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        <div style={{ marginTop: "0px", marginBottom: "10px" }}>
          <DividerText />
        </div>
        <Typography variant="body2" gutterBottom>
          This is your random text.
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton aria-label="copy" size="small">
            <ContentPasteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="reload" size="small">
            <ReplayIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  };

  const renderSampleTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { dynamicTableData } = data;
    const columnHeaders =
      dynamicTableData.data.length > 0
        ? Object.keys(dynamicTableData.data[0])
        : [];

    return (
      <div style={{ margin: "0px" }}>
        <div style={{ marginTop: "0px", marginBottom: "20px" }}>
          <DividerText />
        </div>

        <Typography
          variant="body2"
          gutterBottom
          style={{ marginTop: "0px", marginBottom: "0px" }}
        >
          {dynamicTableData.text1}
        </Typography>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="text"
            startIcon={<ContentPasteIcon />}
            style={{
              color: "grey",
              fontSize: "small",
              textTransform: "none",
              fontWeight: "normal",
            }}
            size="small"
          >
            Copy table
          </Button>
        </div>

        <TableContainer
          component={Paper}
          style={{ marginTop: "0px", marginBottom: "20px" }}
        >
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dynamic table"
          >
            <TableHead>
              <TableRow>
                {columnHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dynamicTableData.data.map((row, index) => (
                <TableRow key={index} style={{ cursor: "pointer" }}>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell key={cellIndex}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="body2"
          gutterBottom
          style={{ marginTop: "0px", marginBottom: "5px" }}
        >
          Some random text here.
        </Typography>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton aria-label="copy" size="small">
            <ContentPasteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="refresh" size="small">
            <ReplayIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {renderMultilineTextFields()}
      {renderDynamicTable()}
      {renderSampleTable()}
    </div>
  );
};

const AppWrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default AppWrapper;
