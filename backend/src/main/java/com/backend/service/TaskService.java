package com.backend.service;

import com.backend.dto.TaskDTO;
import com.backend.model.Task;
import com.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    public List<Task> listarTodas() {
        return taskRepository.findAllByOrderByDataCriacaoDesc();
    }
    
    public Optional<Task> buscarPorId(Long id) {
        return taskRepository.findById(id);
    }
    
    public Task criarTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitulo(taskDTO.getTitulo());
        task.setDescricao(taskDTO.getDescricao());
        task.setStatus(taskDTO.getStatus() != null ? taskDTO.getStatus() : Task.StatusTask.NAO_INICIADO);
        
        return taskRepository.save(task);
    }
    
    public Task atualizarTask(Long id, TaskDTO taskDTO) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task não encontrada com ID: " + id));
        
        if (taskDTO.getTitulo() != null) {
            task.setTitulo(taskDTO.getTitulo());
        }
        if (taskDTO.getDescricao() != null) {
            task.setDescricao(taskDTO.getDescricao());
        }
        if (taskDTO.getStatus() != null) {
            task.setStatus(taskDTO.getStatus());
        }
        
        return taskRepository.save(task);
    }
    
    public void deletarTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task não encontrada com ID: " + id);
        }
        taskRepository.deleteById(id);
    }
    
    public List<Task> filtrarPorStatus(Task.StatusTask status) {
        return taskRepository.findByStatusOrderByDataCriacaoDesc(status);
    }
    
    public List<Task> buscarPorPalavraChave(String keyword) {
        return taskRepository.findByKeyword(keyword);
    }
    
    public List<Task> filtrarPorStatusEPalavraChave(Task.StatusTask status, String keyword) {
        return taskRepository.findByStatusAndKeyword(status, keyword);
    }
}