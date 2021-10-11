import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Box } from "@mui/material";
import Tasks from "./Tasks";

const useStyles = makeStyles({
  pageWrapper: {
    height: "100vh",
    color: "white",
    padding: "3rem 0",
  },
});

const PrimaryPage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Box className={classes.pageWrapper}>
        <Tasks />
      </Box>
    </Container>
  );
};

export default PrimaryPage;
