package com.backend.controller;

import com.backend.dto.TaskDTO;
import com.backend.dto.TaskResponseDTO;
import com.backend.model.Task;
import com.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permitir CORS para frontend
@Tag(name = "Tasks", description = "API para gerenciamento de tarefas")
public class TaskController {
    
    private final TaskService taskService;
    
    @GetMapping
    @Operation(summary = "Listar todas as tarefas",
               description = "Retorna uma lista de tarefas com opções de filtro por status e palavra-chave")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de tarefas retornada com sucesso",
                     content = @Content(mediaType = "application/json",
                                      schema = @Schema(implementation = TaskResponseDTO.class)))
    })
    public ResponseEntity<List<TaskResponseDTO>> listarTasks(
            @Parameter(description = "Filtrar por status da tarefa")
            @RequestParam(required = false) Task.StatusTask status,
            @Parameter(description = "Filtrar por palavra-chave no título ou descrição")
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
    @Operation(summary = "Buscar tarefa por ID",
               description = "Retorna uma tarefa específica pelo seu ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tarefa encontrada",
                     content = @Content(mediaType = "application/json",
                                      schema = @Schema(implementation = TaskResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    })
    public ResponseEntity<TaskResponseDTO> buscarTaskPorId(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id) {
        Optional<Task> task = taskService.buscarPorId(id);
        return task.map(t -> ResponseEntity.ok(TaskResponseDTO.fromTask(t)))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Criar nova tarefa",
               description = "Cria uma nova tarefa no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Tarefa criada com sucesso",
                     content = @Content(mediaType = "application/json",
                                      schema = @Schema(implementation = TaskResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    public ResponseEntity<TaskResponseDTO> criarTask(
            @Parameter(description = "Dados da tarefa a ser criada", required = true)
            @Valid @RequestBody TaskDTO taskDTO) {
        try {
            Task taskCriada = taskService.criarTask(taskDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(TaskResponseDTO.fromTask(taskCriada));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar tarefa",
               description = "Atualiza uma tarefa existente pelo seu ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tarefa atualizada com sucesso",
                     content = @Content(mediaType = "application/json",
                                      schema = @Schema(implementation = TaskResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Tarefa não encontrada"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    public ResponseEntity<TaskResponseDTO> atualizarTask(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id,
            @Parameter(description = "Dados atualizados da tarefa", required = true)
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
    @Operation(summary = "Deletar tarefa",
               description = "Remove uma tarefa do sistema pelo seu ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Tarefa deletada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    })
    public ResponseEntity<Void> deletarTask(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id) {
        try {
            taskService.deletarTask(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/status")
    @Operation(summary = "Listar status disponíveis",
               description = "Retorna todos os status possíveis para uma tarefa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de status retornada com sucesso")
    })
    public ResponseEntity<Task.StatusTask[]> listarStatus() {
        return ResponseEntity.ok(Task.StatusTask.values());
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Atualizar status da tarefa",
               description = "Atualiza apenas o status de uma tarefa específica")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Status da tarefa atualizado com sucesso",
                     content = @Content(mediaType = "application/json",
                                      schema = @Schema(implementation = TaskResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    })
    public ResponseEntity<TaskResponseDTO> atualizarStatus(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id,
            @Parameter(description = "Novo status da tarefa", required = true)
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