export interface Task {
  id: number;
  titulo: string;
  descricao?: string;
  status: StatusTask;
  dataCriacao: string;
}

export interface TaskDTO {
  titulo: string;
  descricao?: string;
  status: StatusTask;
}

export enum StatusTask {
  NAO_INICIADO = 'NAO_INICIADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO'
}

export const StatusTaskLabels = {
  [StatusTask.NAO_INICIADO]: 'Não Iniciado',
  [StatusTask.EM_ANDAMENTO]: 'Em Andamento',
  [StatusTask.CONCLUIDO]: 'Concluído'
};

export const StatusTaskColors = {
  [StatusTask.NAO_INICIADO]: 'bg-gray-100 text-gray-800 border-gray-300',
  [StatusTask.EM_ANDAMENTO]: 'bg-blue-100 text-blue-800 border-blue-300',
  [StatusTask.CONCLUIDO]: 'bg-green-100 text-green-800 border-green-300'
};
