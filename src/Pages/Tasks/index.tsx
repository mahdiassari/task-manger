import React from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Grid, Fab, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskViewModel } from "../../Interfaces/interfaces";
import TasksActions from "../../Redux/Tasks/Actions";
import DoneTasksModal from "../../Modals/DoneTasksModal";
import TaskDetailsModal from "../../Modals/TaskDetailsModal";
import AddOrEditTaskModal from "../../Modals/AddOrEditTaskModal";
import TasksList from "../../Components/TasksList";

const useStyles = makeStyles({
  buttonContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Tasks = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const tasksState = useSelector((state: RootStateOrAny) => state.Tasks);
  const {
    tasks,
    selectedTask,
    doneTasks,
    addOrEditTaskPageMode,
    showAddOrEditTaskModal,
    showTaskDetailsModal,
    showDoneTasksModal,
  } = tasksState;

  const showEditTaskHandler = (selectTask: TaskViewModel) => {
    dispatch(TasksActions.selectedTask(selectTask));
  };

  const editHandler = () => {
    dispatch(TasksActions.showTaskDetailsModal(false));
    dispatch(TasksActions.showAddOrEditTaskModal({ show: true, mode: "edit" }));
  };

  const deleteHandler = () => {
    dispatch(TasksActions.deleteTask(selectedTask));
  };

  const doneTaskHandler = (selectTask: TaskViewModel) => {
    dispatch(TasksActions.doneTask(selectTask));
  };

  const closeAddOrEditTaskHandler = () => {
    dispatch(
      TasksActions.showAddOrEditTaskModal({
        show: false,
        mode: addOrEditTaskPageMode,
      })
    );
  };

  const closeDoneTasksHandler = () => {
    dispatch(TasksActions.showDoneTasksModal(false));
  };

  const closeTaskDetailsHandler = () => {
    dispatch(TasksActions.showTaskDetailsModal(false));
  };

  return (
    <>
      {(doneTasks.length > 0 && tasks.length >= 0) || tasks.length > 0 ? (
        <Grid justifyContent="center">
          <Button
            variant="contained"
            onClick={() => {
              dispatch(TasksActions.showDoneTasksModal(true));
            }}
          >
            View Done Tasks
          </Button>
          {tasks.length > 0 ? (
            <TasksList
              tasks={tasks}
              onEditTask={showEditTaskHandler}
              onDoneTask={doneTaskHandler}
            />
          ) : (
            <Grid container justifyContent="center" sx={{ mt: 10 }}>
              <Typography component="div" variant="h4" textAlign="center">
                There is no Task to done ...
              </Typography>
            </Grid>
          )}
          <Fab
            sx={{
              position: "absolute",
              bottom: "2rem",
              right: "5rem",
              width: "5rem",
              height: "5rem",
            }}
            aria-label={"Add"}
            color={"primary"}
            onClick={() => {
              dispatch(
                TasksActions.showAddOrEditTaskModal({ show: true, mode: "add" })
              );
            }}
          >
            <AddIcon />
          </Fab>
        </Grid>
      ) : (
        <Grid container className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(
                TasksActions.showAddOrEditTaskModal({ show: true, mode: "add" })
              );
            }}
          >
            Create Your First Task
          </Button>
        </Grid>
      )}
      <AddOrEditTaskModal
        visible={showAddOrEditTaskModal}
        onClose={closeAddOrEditTaskHandler}
        selectedTask={selectedTask}
        pageMode={addOrEditTaskPageMode}
      />
      <TaskDetailsModal
        visible={showTaskDetailsModal}
        onClose={closeTaskDetailsHandler}
        selectedTask={selectedTask}
        onDone={doneTaskHandler}
        onEdit={editHandler}
        onDelete={deleteHandler}
      />
      <DoneTasksModal
        visible={showDoneTasksModal}
        onClose={closeDoneTasksHandler}
        doneTasks={doneTasks}
      />
    </>
  );
};

export default Tasks;
