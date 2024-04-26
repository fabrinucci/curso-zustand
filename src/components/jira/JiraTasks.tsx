import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import classNames from 'classnames';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import { useTasks } from '../../hooks'

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[]
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  const {
    onDragOver, 
    isDraggingTaskId, 
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop
  } = useTasks({ status });

  return (
    <div 
      onDragLeave={ handleDragLeave }
      onDragOver={ handleDragOver }
      onDrop={ handleDrop }
      className={classNames("border-4 !text-black relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]", {
        "border-dotted border-blue-500": isDraggingTaskId,
        "border-green-500": onDragOver
      })}>

      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */ }
      <div className="h-full w-full">
        { tasks.length <= 0 
          ? (
              <p className="mt-5 p-2 text-base text-blue-600 font-bold text-navy-700">
                No hay tareas
              </p>
            )  
          : (
              tasks.map((task) => (
                <SingleTask task={task} key={task.id}/>
              ))
            )
        }        
      </div>
    </div>
  );
};