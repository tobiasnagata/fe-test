"use client";
import "./styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../app/utils/theme";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Tobias FE Test",
//   description: "FE Test Talentlytica",
// };

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <CssBaseline />
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
