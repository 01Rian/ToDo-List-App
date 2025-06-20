package com.backend.controller;

import com.backend.dto.TaskDTO;
import com.backend.dto.TaskResponseDTO;
import com.backend.model.Task;
import com.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permitir CORS para frontend
public class TaskController {
    
    private final TaskService taskService;
    
    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> listarTasks(
            @RequestParam(required = false) Task.StatusTask status,
            @RequestParam(required = false) String keyword) {
        
        List<Task> tasks;
        
        if (status != null && keyword != null && !keyword.trim().isEmpty()) {
            tasks = taskService.filtrarPorStatusEPalavraChave(status, keyword.trim());
        } else if (status != null) {
            tasks = taskService.filtrarPorStatus(status);
        } else if (keyword != null && !keyword.trim().isEmpty()) {
            tasks = taskService.buscarPorPalavraChave(keyword.trim());
        } else {
            tasks = taskService.listarTodas();
        }
        
        List<TaskResponseDTO> taskResponseDTOs = tasks.stream()
                .map(TaskResponseDTO::fromTask)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(taskResponseDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> buscarTaskPorId(@PathVariable Long id) {
        Optional<Task> task = taskService.buscarPorId(id);
        return task.map(t -> ResponseEntity.ok(TaskResponseDTO.fromTask(t)))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TaskResponseDTO> criarTask(@Valid @RequestBody TaskDTO taskDTO) {
        try {
            Task taskCriada = taskService.criarTask(taskDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(TaskResponseDTO.fromTask(taskCriada));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> atualizarTask(@PathVariable Long id,
                                            @Valid @RequestBody TaskDTO taskDTO) {
        try {
            Task taskAtualizada = taskService.atualizarTask(id, taskDTO);
            return ResponseEntity.ok(TaskResponseDTO.fromTask(taskAtualizada));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTask(@PathVariable Long id) {
        try {
            taskService.deletarTask(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/status")
    public ResponseEntity<Task.StatusTask[]> listarStatus() {
        return ResponseEntity.ok(Task.StatusTask.values());
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponseDTO> atualizarStatus(@PathVariable Long id,
                                              @RequestBody Task.StatusTask status) {
        try {
            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setStatus(status);
            Task taskAtualizada = taskService.atualizarTask(id, taskDTO);
            return ResponseEntity.ok(TaskResponseDTO.fromTask(taskAtualizada));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}