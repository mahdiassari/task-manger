import React, { forwardRef } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  Slide,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import TasksActions from "../../Redux/Tasks/Actions";
import { addNewTaskFormValidation } from "../../Validation/Schemas/addNewTaskFormValidation";
import { TaskViewModel } from "../../Interfaces/interfaces";

interface AddOrEditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  selectedTask: TaskViewModel;
  pageMode: "add" | "edit";
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddOrEditTaskModal = ({
  visible,
  onClose,
  selectedTask,
  pageMode,
}: AddOrEditTaskModalProps) => {
  const dispatch = useDispatch();

  const addToTasksHandler = (values: TaskViewModel) => {
    dispatch(TasksActions.addTask({ ...values, id: uuidv4() }));
  };

  const editTaskHandler = (values: TaskViewModel) => {
    dispatch(TasksActions.editTask(values));
  };

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
          minHeight: "25rem",
          padding: "2rem",
        },
      }}
    >
      <Formik
        initialValues={{
          id: selectedTask?.id ? selectedTask?.id : "",
          taskTitle: selectedTask?.taskTitle ? selectedTask?.taskTitle : "",
          taskDescription: selectedTask?.taskDescription
            ? selectedTask?.taskDescription
            : "",
          taskGifts: selectedTask?.taskGifts ? selectedTask?.taskGifts : "",
          taskPriority: selectedTask?.taskPriority ? selectedTask?.taskPriority : "Low",
        }}
        validationSchema={addNewTaskFormValidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          pageMode === "add"
            ? addToTasksHandler(values)
            : editTaskHandler(values);
        }}
      >
        {({ values, touched, errors, handleChange, handleSubmit }) => {
          return (
            <>
              <TextField
                name="taskTitle"
                id="taskTitle"
                label="Task Title"
                variant="outlined"
                margin="normal"
                value={values.taskTitle}
                onChange={handleChange}
                error={touched.taskTitle && errors.taskTitle ? true : false}
                helperText={touched.taskTitle && errors.taskTitle}
              />
              <TextField
                name="taskDescription"
                id="taskDescription"
                label="Task Description"
                variant="outlined"
                margin="normal"
                value={values.taskDescription}
                onChange={handleChange}
                multiline
                rows={4}
                error={
                  touched.taskDescription && errors.taskDescription
                    ? true
                    : false
                }
                helperText={touched.taskDescription && errors.taskDescription}
              />
              <TextField
                name="taskGifts"
                id="taskGifts"
                label="Gifts and KPI for this task"
                variant="outlined"
                margin="normal"
                value={values.taskGifts}
                onChange={handleChange}
                error={touched.taskGifts && errors.taskGifts ? true : false}
                helperText={touched.taskGifts && errors.taskGifts}
              />
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Level</FormLabel>
                <RadioGroup
                  name="taskPriority"
                  row
                  aria-label="taskPriority"
                  value={values.taskPriority}
                  onChange={handleChange}
                  style={{ justifyContent: "space-between" }}
                >
                  <FormControlLabel
                    value="Low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>
              <Grid container justifyContent="space-between" marginTop={2}>
                <Button onClick={onClose} size="large" color="inherit">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSubmit()}
                  size="large"
                >
                  {pageMode === "add" ? "Add" : "Update"}
                </Button>
              </Grid>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddOrEditTaskModal;
