import { Task, TaskDTO, StatusTask } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/tasks';

export class TaskService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return null as T;
  }

  static async getAllTasks(status?: StatusTask, keyword?: string): Promise<Task[]> {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (keyword) params.append('keyword', keyword);
    
    const url = params.toString() ? `${API_BASE_URL}?${params}` : API_BASE_URL;
    const response = await fetch(url);
    return this.handleResponse<Task[]>(response);
  }

  static async getTaskById(id: number): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return this.handleResponse<Task>(response);
  }

  static async createTask(taskDTO: TaskDTO): Promise<Task> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskDTO),
    });
    return this.handleResponse<Task>(response);
  }

  static async updateTask(id: number, taskDTO: TaskDTO): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskDTO),
    });
    return this.handleResponse<Task>(response);
  }

  static async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return this.handleResponse<void>(response);
  }

  static async updateTaskStatus(id: number, status: StatusTask): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    });
    return this.handleResponse<Task>(response);
  }
}
