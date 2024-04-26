import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus
}

export const useTasks = ({ status }: Options) => {
  const [onDragOver, setOnDragOver] = useState(false);

  const addTask = useTaskStore(state => state.addTask);
  const isDraggingTaskId = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status)
  }  

  const handleAddTask = async () => {
    const {isConfirmed, value} = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if(!value) return 'Debe ingresar un nombre'
      }
    })  

    if(!isConfirmed) return
    addTask(value, status)
  }  

  return {
    onDragOver,
    isDraggingTaskId,
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop
  }
}