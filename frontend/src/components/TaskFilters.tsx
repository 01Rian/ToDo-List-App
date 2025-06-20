'use client';

import { StatusTask, StatusTaskLabels } from '@/types/task';
import { Search, Filter, X } from 'lucide-react';

interface TaskFiltersProps {
  searchKeyword: string;
  selectedStatus: StatusTask | '';
  onSearchChange: (keyword: string) => void;
  onStatusChange: (status: StatusTask | '') => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function TaskFilters({
  searchKeyword,
  selectedStatus,
  onSearchChange,
  onStatusChange,
  onClearFilters,
  hasActiveFilters
}: TaskFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Campo de busca */}
        <div className="flex-1">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Filtro por status */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as StatusTask | '')}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[160px] text-gray-900"
            >
              <option value="">Todos os status</option>
              {Object.values(StatusTask).map((status) => (
                <option key={status} value={status}>
                  {StatusTaskLabels[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão limpar filtros */}
        {hasActiveFilters && (
          <div className="flex-shrink-0">
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors border border-gray-300 font-medium"
              title="Limpar filtros"
            >
              <X size={16} />
              <span className="hidden sm:inline">Limpar</span>
            </button>
          </div>
        )}
      </div>

      {/* Indicador de filtros ativos */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-gray-600">Filtros ativos:</span>
            {searchKeyword && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Busca: &ldquo;{searchKeyword}&rdquo;
              </span>
            )}
            {selectedStatus && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                Status: {StatusTaskLabels[selectedStatus]}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
