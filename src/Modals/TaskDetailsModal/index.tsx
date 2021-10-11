import React, { forwardRef } from "react";
import { makeStyles } from "@mui/styles";
import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  Slide,
  Grid,
  Dialog,
  Typography,
  DialogTitle,
} from "@mui/material";
import { TaskViewModel } from "../../Interfaces/interfaces";
import Priority from "../../Components/Priority";

interface TaskDetailsModalModalProps {
  visible: boolean;
  onClose: () => void;
  selectedTask: TaskViewModel;
  onDone: (selectTask: TaskViewModel) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  taskTitle: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 600,
  },
  taskPriority: {
    position: "absolute",
    left: "1.5rem",
    top: "2rem",
  },
  taskDescription: {
    fontWeight: 600,
  },
});

const TaskDetailsModalModal = ({
  visible,
  onClose,
  selectedTask,
  onDone,
  onEdit,
  onDelete,
}: TaskDetailsModalModalProps) => {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={"lg"}
      onClose={onClose}
      open={visible}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          borderRadius: "1rem",
          width: "30rem",
          padding: "2rem",
        },
      }}
    >
      <DialogTitle className={classes.taskTitle} sx={{ marginTop: 3 }}>
        <Typography component="div" variant="h4">
          {selectedTask?.taskTitle}
        </Typography>
      </DialogTitle>
      <Grid container sx={{ width: "auto" }} className={classes.taskPriority}>
        <Priority taskPriority={selectedTask?.taskPriority} />
      </Grid>
      <Grid
        container
        justifyContent="center"
        marginTop={3}
        className={classes.taskDescription}
      >
        {selectedTask?.taskDescription}
      </Grid>
      <Grid container justifyContent="space-between" marginTop={5}>
        <Button onClick={onEdit} size="large">
          Edit Task
        </Button>
        <Button
          variant="contained"
          onClick={() => onDone(selectedTask)}
          size="large"
        >
          Done Task
        </Button>
        <Button onClick={onDelete} size="large" color="error">
          Delete Task
        </Button>
      </Grid>
    </Dialog>
  );
};

export default TaskDetailsModalModal;
