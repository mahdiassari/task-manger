import React from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TaskViewModel } from "../Interfaces/interfaces";
import Priority from "./Priority";

interface TasksListProps {
  tasks: TaskViewModel[];
  onEditTask: (task: TaskViewModel) => void;
  onDoneTask: (task: TaskViewModel) => void;
}

const useStyles = makeStyles({
  card: {
    display: "flex",
    justifyContent: "space-between",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  actionContainer: {
    display: "flex",
    marginTop: "1rem",
  },
});

const TasksList = ({ tasks, onEditTask, onDoneTask }: TasksListProps) => {
  const classes = useStyles();
  return (
    <Grid
      sx={{
        mt: 2,
        pb: 14,
        maxHeight: "calc(100vh - 6.5rem)",
        overflow: "auto",
        "::-webkit-scrollbar": {
          background: "transparent",
          width: "0",
        },
      }}
    >
      {tasks?.map((task, index) => {
        return (
          <Card
            className={classes.card}
            key={`task_${index}`}
            sx={{
              mt: 2,
              borderRadius: 5,
              backgroundColor: "#f4f4f4",
            }}
          >
            <Box className={classes.contentWrapper}>
              <CardContent className={classes.cardContent}>
                <Typography component="div" variant="h4">
                  {task?.taskTitle}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {task?.taskDescription}
                </Typography>
              </CardContent>
            </Box>
            <Box className={classes.contentWrapper}>
              <CardContent className={classes.cardContent}>
                <Priority taskPriority={task?.taskPriority} />
                <Box className={classes.actionContainer}>
                  <Button onClick={() => onEditTask(task)}>Edit Task</Button>
                  <Button
                    variant="contained"
                    onClick={() => onDoneTask(task)}
                    sx={{ ml: 1 }}
                  >
                    Done Task
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </Grid>
  );
};

export default TasksList;
