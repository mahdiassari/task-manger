import { TaskViewModel } from "../../Interfaces/interfaces";
import RecordController from "../../Util/RecordController";
import types from "./Types";

export interface TaskReducerViewModel {
  tasks: TaskViewModel[];
  doneTasks: TaskViewModel[];
  selectedTask: TaskViewModel | null;
  addOrEditTaskPageMode: "add" | "edit";
  showAddOrEditTaskModal: boolean;
  showTaskDetailsModal: boolean;
  showDoneTasksModal: boolean;
}

const initState: TaskReducerViewModel = {
  tasks: [],
  doneTasks: [],
  selectedTask: null,
  addOrEditTaskPageMode: "add",
  showAddOrEditTaskModal: false,
  showTaskDetailsModal: false,
  showDoneTasksModal: false,
};

export default function Reducer(
  state: TaskReducerViewModel = initState,
  action
) {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        ...state,
        tasks: RecordController.add(state.tasks, action.data),
        showAddOrEditTaskModal: false,
      };
    case types.DELETE_TASK:
      return {
        ...state,
        tasks: RecordController.delete(state.tasks, action.data),
        selectedTask: null,
        showTaskDetailsModal: false,
      };
    case types.EDIT_TASK:
      return {
        ...state,
        tasks: RecordController.update(state.tasks, action.data),
        selectedTask: null,
        showAddOrEditTaskModal: false,
      };
    case types.DONE_TASK:
      return {
        ...state,
        doneTasks: RecordController.add(state.doneTasks, action.data),
        tasks: RecordController.delete(state.tasks, action.data),
        selectedTask: null,
        showTaskDetailsModal: false,
      };
    case types.SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.data,
        addOrEditTaskPageMode: "edit",
        showTaskDetailsModal: true,
      };
    case types.SHOW_ADD_OR_EDIT_TASK_MODAL:
      return {
        ...state,
        showAddOrEditTaskModal: action.data.show,
        addOrEditTaskPageMode: action.data.mode,
        selectedTask: action.data.mode === "add" ? null : state.selectedTask,
        showTaskDetailsModal:
          action.data.mode === "edit"
            ? action.data.show === false
              ? true
              : false
            : false,
      };
    case types.SHOW_TASK_DETAILS_MODAL:
      return {
        ...state,
        showTaskDetailsModal: action.data,
      };
    case types.SHOW_DONE_TASKS_MODAL:
      return {
        ...state,
        showDoneTasksModal: action.data,
      };
    default:
      return state;
  }
}
