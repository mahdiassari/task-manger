import React, { forwardRef } from "react";
import { makeStyles } from "@mui/styles";
import { TransitionProps } from "@mui/material/transitions";
import {
  Slide,
  Grid,
  Dialog,
  Typography,
  Card,
  CardContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { TaskViewModel } from "../../Interfaces/interfaces";
import Priority from "../../Components/Priority";
interface DoneTasksModalProps {
  visible: boolean;
  onClose: () => void;
  doneTasks: TaskViewModel[];
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
  doneTaskModalTitle: {
    textAlign: "center",
  },
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

const DoneTasksModal = ({
  visible,
  onClose,
  doneTasks,
}: DoneTasksModalProps) => {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={"xl"}
      onClose={onClose}
      open={visible}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          borderRadius: "1rem",
          padding: "2rem",
          width: "70rem",
        },
      }}
    >
      <DialogTitle className={classes.doneTaskModalTitle}>
        <Typography component="div" variant="h3">
          Done Tasks
        </Typography>
      </DialogTitle>
      {doneTasks.length > 0 ? (
        <Grid
          sx={{
            mt: 2,
            pb: 5,
            maxHeight: "calc(100vh - 6.5rem)",
            position: "relative",
            overflow: "auto",
            "::-webkit-scrollbar": {
              background: "transparent",
            },
          }}
        >
          {doneTasks?.map((task, index) => {
            return (
              <Card
                className={classes.card}
                key={`doneTask_${index}`}
                variant="outlined"
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
                  </CardContent>
                </Box>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <Grid container justifyContent="center" sx={{ mt: 4 }} color="inherit">
          <Typography component="div" variant="h5" textAlign="center">
            There is no done task ...
          </Typography>
        </Grid>
      )}
      <Grid container justifyContent="space-between" marginTop={2}>
        <Button onClick={onClose} size="large" variant="contained">
          Close
        </Button>
      </Grid>
    </Dialog>
  );
};

export default DoneTasksModal;
