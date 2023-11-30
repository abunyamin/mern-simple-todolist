import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { currentTaskType, updatedTaskType } from '../utils/type';

export interface initialStateType {
  currentTask: currentTaskType[] | [];
  filteredTaskList: currentTaskType[] | [];
  taskCurrentStatus: string;
  taskDeleteStatus: string;
  taskError: string | null;
  taskById: currentTaskType | null;
  taskByIdStatus: string;
  addByIdStatus: string;
  updateByIdStatus: string;
  taskByIdError: string | null;
}

const initialState: initialStateType = {
  currentTask: [],
  filteredTaskList: [],
  taskCurrentStatus: '',
  taskDeleteStatus: '',
  taskError: null,
  taskById: null,
  taskByIdStatus: '',
  addByIdStatus: '',
  updateByIdStatus: '',
  taskByIdError: null,
};

// fetching task
export const fetchTasksData = createAsyncThunk('task/fetchTasksData', async () => {
  try {
    const response = await axios.get('http://localhost:8800/api/task', { withCredentials: true });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchTaskDataById = createAsyncThunk('task/fetchTaskDataById', async (taskId: string | string[]) => {
  try {
    const response = await axios.get(`http://localhost:8800/api/task/${taskId}`, { withCredentials: true });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteTaskDataById = createAsyncThunk('task/deleteTaskDataById', async (taskId: string) => {
  try {
    await axios.delete(`http://localhost:8800/api/task/${taskId}`, { withCredentials: true });
    return { _id: taskId };
  } catch (error) {
    console.log(error);
  }
});

export const addTaskData = createAsyncThunk('task/addTaskData', async (update: updatedTaskType) => {
  try {
    const response = await axios.post(`http://localhost:8800/api/task/`, update, { withCredentials: true });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateTaskData = createAsyncThunk('task/updateTaskData', async ({ update, taskId }: { update: updatedTaskType; taskId: string | string[] }) => {
  try {
    const response = await axios.put(`http://localhost:8800/api/task/${taskId}`, update, { withCredentials: true });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    tasksUpdated: (state, action: PayloadAction<currentTaskType[]>) => {
      state.taskCurrentStatus = 'succeeded';
      state.currentTask = action.payload;
    },
    setTaskById: (state, action: PayloadAction<currentTaskType | null>) => {
      state.taskById = action.payload;
    },
    setTaskByIdStatus: (state, action: PayloadAction<string>) => {
      state.taskByIdStatus = action.payload;
    },
    setAddByIdStatus: (state, action: PayloadAction<string>) => {
      state.addByIdStatus = action.payload;
    },
    setUpdateByIdStatus: (state, action: PayloadAction<string>) => {
      state.updateByIdStatus = action.payload;
    },
    setTaskCurrentStatus: (state, action: PayloadAction<string>) => {
      state.taskCurrentStatus = action.payload;
    },
    setTaskDeleteStatus: (state, action: PayloadAction<string>) => {
      state.taskDeleteStatus = action.payload;
    },
    setTasksData: (state, action) => {
      return action.payload;
    },
    setTilteredTaskList: (state, action) => {
      state.filteredTaskList = action.payload;
    },
    resetTasks: (state) => {
      (state.currentTask = []), (state.filteredTaskList = []), (state.taskCurrentStatus = ''), (state.taskDeleteStatus = ''), (state.taskError = null), (state.taskById = null), (state.taskByIdStatus = ''), (state.taskByIdError = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksData.pending, (state) => {
        state.taskCurrentStatus = 'loading';
      })
      .addCase(fetchTasksData.fulfilled, (state, action) => {
        state.taskCurrentStatus = 'succeeded';
        state.currentTask = action.payload;
      })
      .addCase(fetchTasksData.rejected, (state) => {
        state.taskCurrentStatus = 'failed';
      })
      .addCase(addTaskData.pending, (state) => {
        state.taskCurrentStatus = 'loading';
      })
      .addCase(addTaskData.fulfilled, (state, action) => {
        state.taskCurrentStatus = 'succeeded';
        state.addByIdStatus = 'succeeded';
        if (state.currentTask) {
          state.currentTask = state.currentTask?.length === 0 ? [action.payload] : [action.payload, ...state.currentTask];
        } else {
          state.currentTask = [action.payload];
        }
      })
      .addCase(addTaskData.rejected, (state) => {
        state.taskCurrentStatus = 'failed';
      })
      .addCase(fetchTaskDataById.pending, (state) => {
        state.taskByIdStatus = 'loading';
      })
      .addCase(fetchTaskDataById.fulfilled, (state, action) => {
        state.taskByIdStatus = 'succeeded';
        state.taskById = action.payload;
      })
      .addCase(fetchTaskDataById.rejected, (state) => {
        state.taskByIdStatus = 'failed';
      })
      .addCase(updateTaskData.pending, (state) => {
        state.updateByIdStatus = 'loading';
      })
      .addCase(updateTaskData.fulfilled, (state, action) => {
        state.updateByIdStatus = 'succeeded';
        state.taskById = action.payload;
      })
      .addCase(updateTaskData.rejected, (state) => {
        state.updateByIdStatus = 'failed';
      })
      .addCase(deleteTaskDataById.pending, (state) => {
        state.taskDeleteStatus = 'loading';
      })
      .addCase(deleteTaskDataById.fulfilled, (state, action) => {
        state.taskDeleteStatus = 'succeeded';
        state.currentTask = state.currentTask.filter((task) => task._id !== action.payload?._id);
      })
      .addCase(deleteTaskDataById.rejected, (state) => {
        state.taskDeleteStatus = 'failed';
      });
  },
});

export const { tasksUpdated, setTaskById, setTaskByIdStatus, setUpdateByIdStatus, setTaskCurrentStatus, setTaskDeleteStatus, resetTasks, setAddByIdStatus } = taskSlice.actions;

export default taskSlice.reducer;
