import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

function _set_default_value(mhs, columns) {
  // Default value for each mahasiswa : 1
  let val = {};

  // Iterate by aspek penilaian
  columns.forEach((col) => {
    if (col.toLowerCase() != "nama") {
      // Iterate by mahasiswa
      let list_mhs = {};
      mhs.forEach((m) => {
        list_mhs[m.split(" ").join("_").toLowerCase()] = 1;
      });
      val[col.split(" ").join("_").toLowerCase()] = list_mhs;
    }
  });

  return val;
}

export default function TabelMhs({ updateParentData, mhs, columns }) {
  const [nilai, setNilai] = useState(_set_default_value(mhs, columns));
  updateParentData(nilai);

  const handleChange = (event) => {
    const col_mhs = event.target.name.split("-");
    const col = col_mhs[0].split(" ").join("_").toLowerCase();
    const mhs = col_mhs[1].split(" ").join("_").toLowerCase();

    let new_val = { ...nilai };

    if (event.target.name) {
      new_val[col][mhs] = event.target.value;
    }

    setNilai(new_val);
    updateParentData(new_val);
  };

  const DropDownNilai = ({ mhs, col }) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="label-penilaian">Nilai</InputLabel>
          <Select
            labelId="label-penilaian"
            label="Nilai"
            value={
              nilai[col.split(" ").join("_").toLowerCase()][
                mhs.split(" ").join("_").toLowerCase()
              ]
            }
            name={col + `-` + mhs}
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "lightgray" }}>
            {/* Iterate columns name */}
            {columns.map((column) => (
              <TableCell
                align={column.toLowerCase() == "nama" ? "left" : "right"}
                style={{ fontWeight: "bold" }}
                key={column}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Iterate row each mahasiswa */}
          {mhs.map((m) => (
            <TableRow key={m}>
              {/* Iterate column each mahasiswa */}
              {columns.map((column) => (
                <TableCell
                  align={column.toLowerCase() == "nama" ? "left" : "right"}
                  key={column}
                >
                  {column.toLowerCase() == "nama" ? (
                    m
                  ) : (
                    <DropDownNilai mhs={m} col={column} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
