'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, AlertCircle, Loader2 } from 'lucide-react';
import { Task, TaskDTO, StatusTask } from '@/types/task';
import { TaskService } from '@/services/taskService';
import TaskCard from '@/components/TaskCard';
import TaskDetailModal from '@/components/TaskDetailModal';
import EditTaskModal from '@/components/EditTaskModal';
import CreateTaskForm from '@/components/CreateTaskForm';
import TaskFilters from '@/components/TaskFilters';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  // Filtros
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusTask | ''>('');

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await TaskService.getAllTasks(
        selectedStatus || undefined,
        searchKeyword || undefined
      );
      setTasks(tasksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, selectedStatus]);

  // Carregamento inicial e quando filtros mudarem
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (taskDTO: TaskDTO) => {
    try {
      await TaskService.createTask(taskDTO);
      await loadTasks(); // Recarregar lista
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar tarefa');
      throw err;
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await TaskService.deleteTask(taskId);
      await loadTasks(); // Recarregar lista
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir tarefa');
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: StatusTask) => {
    try {
      await TaskService.updateTaskStatus(taskId, newStatus);
      await loadTasks(); // Recarregar lista
      
      // Atualizar tarefa selecionada se estiver aberta
      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = await TaskService.getTaskById(taskId);
        setSelectedTask(updatedTask);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status');
    }
  };

  const handleUpdateTask = async (taskId: number, taskDTO: TaskDTO) => {
    try {
      await TaskService.updateTask(taskId, taskDTO);
      await loadTasks(); // Recarregar lista
      
      // Atualizar tarefa selecionada se estiver aberta
      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = await TaskService.getTaskById(taskId);
        setSelectedTask(updatedTask);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa');
      throw err;
    }
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(false);
    setShowEditTask(true);
  };

  const handleClearFilters = () => {
    setSearchKeyword('');
    setSelectedStatus('');
  };

  const hasActiveFilters = searchKeyword !== '' || selectedStatus !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sistema de Tarefas
            </h1>
            <p className="text-gray-600">
              Gerencie suas tarefas de forma eficiente
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-4 sm:mt-0"
          >
            <Plus size={20} />
            Nova Tarefa
          </button>
        </div>

        {/* Filtros */}
        <TaskFilters
          searchKeyword={searchKeyword}
          selectedStatus={selectedStatus}
          onSearchChange={setSearchKeyword}
          onStatusChange={setSelectedStatus}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle size={20} />
              <span className="font-medium">Erro:</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-sm mt-2 underline"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="mb-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-blue-600" size={32} />
              <span className="ml-2 text-gray-600">Carregando tarefas...</span>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hasActiveFilters ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa cadastrada'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {hasActiveFilters 
                    ? 'Tente ajustar os filtros para encontrar tarefas.'
                    : 'Comece criando sua primeira tarefa.'}
                </p>
                {!hasActiveFilters && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Criar primeira tarefa
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Contador de tarefas */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {tasks.length} {tasks.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}
                  {hasActiveFilters && ' com os filtros aplicados'}
                </p>
              </div>

              {/* Grade de tarefas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onView={handleViewTask}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modais */}
        <CreateTaskForm
          isOpen={showCreateForm}
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreateForm(false)}
        />

        <TaskDetailModal
          task={selectedTask}
          isOpen={showTaskDetail}
          onClose={() => {
            setShowTaskDetail(false);
            setSelectedTask(null);
          }}
          onStatusChange={handleStatusChange}
          onEdit={handleEditTask}
        />

        <EditTaskModal
          task={selectedTask}
          isOpen={showEditTask}
          onClose={() => {
            setShowEditTask(false);
            setSelectedTask(null);
          }}
          onSave={handleUpdateTask}
        />
      </div>
    </div>
  );
}
