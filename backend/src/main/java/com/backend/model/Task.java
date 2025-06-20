package com.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusTask status = StatusTask.NAO_INICIADO;
    
    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime dataCriacao;
    
    @Schema(description = "Status possíveis para uma tarefa")
    public enum StatusTask {
        @Schema(description = "Tarefa não foi iniciada")
        NAO_INICIADO("Não Iniciado"),
        
        @Schema(description = "Tarefa está em progresso")
        EM_ANDAMENTO("Em Andamento"),
        
        @Schema(description = "Tarefa foi concluída")
        CONCLUIDO("Concluído");
        
        private final String descricao;
        
        StatusTask(String descricao) {
            this.descricao = descricao;
        }
        
        public String getDescricao() {
            return descricao;
        }
    }
}