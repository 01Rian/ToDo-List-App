'use client';

import { Task, StatusTaskLabels, StatusTaskColors } from '@/types/task';
import { Calendar, FileText, Trash2, Eye, Edit } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onEdit?: (task: Task) => void;
}

export default function TaskCard({ task, onView, onDelete, onEdit }: TaskCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
            {task.titulo}
          </h3>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => onView(task)}
              className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Ver detalhes"
            >
              <Eye size={16} />
            </button>
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                title="Editar tarefa"
              >
                <Edit size={16} />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Excluir tarefa"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Status */}
          <div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${StatusTaskColors[task.status]}`}>
              {StatusTaskLabels[task.status]}
            </span>
          </div>

          {/* Descrição */}
          {task.descricao && (
            <div className="flex items-start gap-2">
              <FileText size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 line-clamp-2">
                {task.descricao}
              </p>
            </div>
          )}

          {/* Data de criação */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={12} />
            <span>{formatDate(task.dataCriacao)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
