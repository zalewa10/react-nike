// components/TableComponent.js

import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ReplayIcon from "@mui/icons-material/Replay";
import DividerText from "./DividerText";
import { IconButton } from "@mui/material";

const TableComponent = ({ data, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { dynamicTableData } = data;
  const columnHeaders =
    dynamicTableData.data.length > 0
      ? Object.keys(dynamicTableData.data[0])
      : [];

  return (
    <div>
      <div style={{ marginTop: "0px", marginBottom: "10px" }}>
        <DividerText />
      </div>
      <Typography variant="body2" gutterBottom>
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
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dynamic table">
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
        {dynamicTableData.text2}
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

export default TableComponent;
