// user type data
export interface currentUserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
}


// task type data
export interface currentTaskType {
  _id: string;
  title: string;
  dueDate: string;
  desc: string;
  category: string;
  priority: boolean;
  completed: boolean;
  createdAt: string;
  __v: number;
}

export interface taskType {
  title: string;
  dueDate: string;
  desc: string;
  category: string;
  priority: boolean;
  completed: boolean;
}

export interface updatedTaskType {
  _id: string;
  title?: string;
  dueDate?: string;
  desc?: string;
  category?: string;
  priority?: boolean;
  completed?: boolean;
}