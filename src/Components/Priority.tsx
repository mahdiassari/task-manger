import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box } from "@mui/material";
import { PriorityViewModel } from "../Interfaces/interfaces";

const useStyles = makeStyles({
  priorityContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  priorityIcon: {
    display: "flex",
    alignItems: "center",
    height: "1.5rem",
    width: "1.5rem",
    borderRadius: "50%",
  },
});

const Priority = ({ taskPriority }: PriorityViewModel) => {
  const { priorityContainer, priorityIcon } = useStyles({ taskPriority });

  const colorHandler = (taskPriority: "High" | "Medium" | "Low") => {
    switch (taskPriority) {
      case "Low":
        return "green";
      case "Medium":
        return "orange";
      case "High":
        return "red";
      default:
        break;
    }
  };

  return (
    <Box className={`${priorityContainer}`}>
      <Typography
        component="div"
        variant="h5"
        sx={{
          mr: 2,
          color: colorHandler(taskPriority),
        }}
      >
        {taskPriority}
      </Typography>
      <Box
        className={`${priorityIcon}`}
        sx={{
          backgroundColor: colorHandler(taskPriority),
        }}
      />
    </Box>
  );
};

export default Priority;
