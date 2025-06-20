package com.backend.repository;

import com.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Buscar tarefas por status
    List<Task> findByStatus(Task.StatusTask status);
    
    // Buscar tarefas por palavra-chave no título ou descrição
    @Query("SELECT t FROM Task t WHERE " +
           "LOWER(t.titulo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.descricao) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Task> findByKeyword(@Param("keyword") String keyword);
    
    // Buscar tarefas por status e palavra-chave
    @Query("SELECT t FROM Task t WHERE " +
           "t.status = :status AND " +
           "(LOWER(t.titulo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.descricao) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Task> findByStatusAndKeyword(@Param("status") Task.StatusTask status, 
                                     @Param("keyword") String keyword);
    
    // Buscar todas as tarefas ordenadas por data de criação (mais recentes primeiro)
    List<Task> findAllByOrderByDataCriacaoDesc();
    
    // Buscar tarefas por status ordenadas por data de criação
    List<Task> findByStatusOrderByDataCriacaoDesc(Task.StatusTask status);
}