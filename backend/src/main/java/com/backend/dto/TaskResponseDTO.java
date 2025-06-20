package com.backend.dto;

import com.backend.model.Task;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO de resposta contendo dados completos de uma tarefa")
public class TaskResponseDTO {
    
    @Schema(description = "ID único da tarefa", example = "1")
    private Long id;
    
    @Schema(description = "Título da tarefa", example = "Implementar funcionalidade X")
    private String titulo;
    
    @Schema(description = "Descrição detalhada da tarefa", example = "Implementar a funcionalidade X seguindo os padrões estabelecidos")
    private String descricao;
    
    @Schema(description = "Status atual da tarefa", example = "NAO_INICIADO")
    private Task.StatusTask status;
    
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Schema(description = "Data e hora de criação da tarefa", example = "20-06-2025 00:26:00")
    private LocalDateTime dataCriacao;
    
    public static TaskResponseDTO fromTask(Task task) {
        return new TaskResponseDTO(
            task.getId(),
            task.getTitulo(),
            task.getDescricao(),
            task.getStatus(),
            task.getDataCriacao()
        );
    }
}