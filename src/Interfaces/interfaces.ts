export interface TaskViewModel {
  id: string;
  taskTitle: string;
  taskDescription: string;
  taskGifts: string;
  taskPriority: "High" | "Medium" | "Low";
}

export interface PriorityViewModel {
  taskPriority: "High" | "Medium" | "Low";
}
