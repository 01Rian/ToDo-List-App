package com.backend.dto;

import com.backend.model.Task;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDTO {
    
    private Long id;
    private String titulo;
    private String descricao;
    private Task.StatusTask status;
    
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
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