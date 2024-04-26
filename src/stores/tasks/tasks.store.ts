import { create, StateCreator } from 'zustand';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// import { produce } from 'immer';


interface TaskState {
  tasks: Record<string, Task> // ->->-> {[key: string]: Task}
  draggingTaskId?: string

  getTaskByStatus: (status: TaskStatus) => Task[]
  setDraggingTaskId: (taskId: string) => void
  addTask: (title: string, status: TaskStatus) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
  
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'done' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'in-progress' },
    'ABC-5': { id: 'ABC-5', title: 'Task 5', status: 'open' },
  },

  getTaskByStatus: (status) => {
    const tasks = get().tasks
    return Object.values(tasks).filter(task => task.status === status);
  },
  
  setDraggingTaskId: (taskId) => set({ draggingTaskId: taskId }),
  
  addTask: (title, status) => {
    const newTask = { id: uuid(), title, status }
     
    set(state => {
      state.tasks[newTask.id] = newTask;
    });
  },
  
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId, status) => { 
    set(state => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status
      }
    })
  },

  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId;
    if(!taskId) return;

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  }
})

export const useTaskStore = create<TaskState>()(
  devtools( 
    persist(
      immer(storeApi), 
      { name: 'task-store' }
    ),
  ),
);