import types from "./Types";
import DelegateAction from "../ActionDelegator";

const TasksActions = {
  addTask: DelegateAction(types.ADD_TASK),
  deleteTask: DelegateAction(types.DELETE_TASK),
  editTask: DelegateAction(types.EDIT_TASK),
  doneTask: DelegateAction(types.DONE_TASK),
  selectedTask: DelegateAction(types.SELECTED_TASK),
  showAddOrEditTaskModal: DelegateAction(types.SHOW_ADD_OR_EDIT_TASK_MODAL),
  showTaskDetailsModal: DelegateAction(types.SHOW_TASK_DETAILS_MODAL),
  showDoneTasksModal: DelegateAction(types.SHOW_DONE_TASKS_MODAL),
};

export default TasksActions;
