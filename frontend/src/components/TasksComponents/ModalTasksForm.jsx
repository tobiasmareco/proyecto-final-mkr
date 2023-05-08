import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProjects from '../../hooks/useProjects'
import AlertMsg from '../Alert'
import { useParams } from 'react-router-dom'

const OPTIONS_PRIORITY = ['baja', 'media', 'alta']
const STATUS_TASKS = ['pendiente', 'finalizado']

const TasksModal = () => {
  const { id } = useParams();
  const [taskId, setTaskId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('alta')
  const [status, setStatus] = useState('pendiente')

  const { modalTasksForm, handleModalShow, alert, showAlert, createTasks, tasks } = useProjects()

  useEffect(() => {
    if (tasks._id) {
      setTaskId(tasks._id)
      setTitle(tasks.title)
      setDescription(tasks.description)
      setPriority(tasks.priority)
      setStatus(tasks.status)
      return
    }
    setTaskId(null)
    setTitle('')
    setDescription('')
    setPriority('alta')
  }, [tasks])


  const onSubmitTask = async (e) => {
    e.preventDefault()
    if ([title.trim(), description.trim()].includes('')) {
      return showAlert({
        msg: 'Complete los campos obligatorios.',
        error: true
      })
    }
    await createTasks({ taskId, projectId: id, title, description, priority, status })
    setTitle('')
    setDescription('')
    setPriority('alta')
  }

  const { msg } = alert

  return (
    <Transition.Root show={modalTasksForm} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalShow}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalShow}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>


              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg text-center leading-6 font-bold text-gray-900 mb-3">
                    {taskId ? 'Actualizar Tarea' : 'Crear Tarea'}
                  </Dialog.Title>
                  {msg && (<AlertMsg alert={alert} />)}
                  <form onSubmit={onSubmitTask}>
                    <div className="mb-5">
                      <label
                        className='text-gray-700 uppercase font-bold text-sm  after:content-["*"] after:text-gray-400 after:ml-1'
                        htmlFor="title"
                      >
                        Titulo Tarea
                      </label>

                      <input
                        id="title"
                        type="text"
                        name='title'
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Titulo de la tarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className='text-gray-700 uppercase font-bold text-sm  after:content-["*"] after:text-gray-400 after:ml-1'
                        htmlFor="description"
                      >
                        Descripcion Tarea
                      </label>

                      <input
                        id="description"
                        type="text"
                        name='description'
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripcion de la tarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className='text-gray-700 uppercase font-bold text-sm'
                        htmlFor="priority"
                      >
                        Prioridad
                      </label>

                      <select
                        id="priority"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        {
                          OPTIONS_PRIORITY.map(op => (
                            <option key={op}>{op}</option>
                          ))
                        }
                      </select>
                    </div>
                    {taskId && (
                      <div className="mb-5">
                        <label
                          className='text-gray-700 uppercase font-bold text-sm'
                          htmlFor="status"
                        >
                          Estado
                        </label>

                        <select
                          id="status"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {
                            STATUS_TASKS.map(op => (
                              <option key={op}>{op}</option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                    <input
                      type="submit"
                      value={taskId ? 'Actualizar Tarea' : 'Crear Tarea'}
                      className="bg-sky-800 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-600 transition-colors"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default TasksModal