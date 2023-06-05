"use client";
import { Alert, Button, Container, Snackbar, Typography } from "@mui/material";
import TabelMhs from "./components/TabelMhs";
import { useEffect, useState } from "react";

const mahasiswa = [
  "Mahasiswa 1",
  "Mahasiswa 2",
  "Mahasiswa 3",
  "Mahasiswa 4",
  "Mahasiswa 5",
  "Mahasiswa 6",
  "Mahasiswa 7",
  "Mahasiswa 8",
  "Mahasiswa 9",
  "Mahasiswa 10",
];
const columns_name = [
  "Nama",
  "Aspek Penilaian 1",
  "Aspek Penilaian 2",
  "Aspek Penilaian 3",
  "Aspek Penilaian 4",
];

export default function Home() {
  const [nilaiMhs, setNilaiMhs] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function saveDataMahasiswa() {
    navigator.clipboard.writeText(JSON.stringify(nilaiMhs));
    setOpen(true);
  }

  const updateData = (data) => {
    setNilaiMhs(data);
  };

  return (
    <Container style={{ paddingTop: 50 }}>
      <Typography
        variant="h1"
        fontWeight={"bold"}
        textAlign={"center"}
        marginBottom={4}
      >
        Aspek Penilaian Mahasiswa
      </Typography>

      <TabelMhs
        mhs={mahasiswa}
        columns={columns_name}
        updateParentData={updateData}
      />

      <Button
        variant="contained"
        style={{ marginTop: 16, marginBottom: 50, float: "right" }}
        onClick={saveDataMahasiswa}
      >
        Simpan
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "green", color: "white" }}
        >
          Successfully copied text in clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
