import { string } from "../Rules";
import * as Yup from "yup";

export const addNewTaskFormValidation = Yup.object().shape({
  taskTitle: string("taskTitle", true),
  taskDescription: string("taskDescription", true),
  taskGifts: string("taskGifts", true),
});
