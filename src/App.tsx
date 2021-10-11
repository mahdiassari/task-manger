import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import PrimaryPage from "./Pages/PrimaryPage";
import { store } from "./Redux/Store";
import theme from "./Util/Theme";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PrimaryPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
