package com.backend.dto;

import com.backend.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO para criação e atualização de tarefas")
public class TaskDTO {
    
    @NotBlank(message = "Título é obrigatório")
    @Schema(description = "Título da tarefa", example = "Implementar funcionalidade X", required = true)
    private String titulo;
    
    @Schema(description = "Descrição detalhada da tarefa", example = "Implementar a funcionalidade X seguindo os padrões estabelecidos")
    private String descricao;
    
    @NotNull(message = "Status é obrigatório")
    @Schema(description = "Status atual da tarefa", example = "NAO_INICIADO", required = true)
    private Task.StatusTask status;
}