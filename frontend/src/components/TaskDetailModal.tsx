'use client';

import { Task, StatusTask, StatusTaskLabels, StatusTaskColors } from '@/types/task';
import { Calendar, FileText, X, Edit } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (taskId: number, newStatus: StatusTask) => Promise<void>;
  onEdit?: (task: Task) => void;
}

export default function TaskDetailModal({ task, isOpen, onClose, onStatusChange, onEdit }: TaskDetailModalProps) {
  if (!isOpen || !task) return null;

  const handleStatusChange = async (newStatus: StatusTask) => {
    if (onStatusChange && newStatus !== task.status) {
      await onStatusChange(task.id, newStatus);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Detalhes da Tarefa</h2>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(task)}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                title="Editar tarefa"
              >
                <Edit size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Título */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{task.titulo}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>Criado em {formatDate(task.dataCriacao)}</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(StatusTask).map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => handleStatusChange(statusOption)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    task.status === statusOption
                      ? StatusTaskColors[statusOption]
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {StatusTaskLabels[statusOption]}
                </button>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-1" />
              Descrição
            </label>
            {task.descricao ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{task.descricao}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhuma descrição fornecida</p>
            )}
          </div>

          {/* ID da tarefa */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">ID: {task.id}</p>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
