package com.backend.config;

import com.backend.model.Task;
import com.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    
    private final TaskRepository taskRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Limpar dados existentes
        taskRepository.deleteAll();
        
        // Criar tarefas de exemplo
        Task task1 = new Task();
        task1.setTitulo("Implementar API de Tarefas");
        task1.setDescricao("Desenvolver endpoints REST para gerenciamento de tarefas com operações CRUD completas");
        task1.setStatus(Task.StatusTask.CONCLUIDO);
        taskRepository.save(task1);
        
        Task task2 = new Task();
        task2.setTitulo("Criar Sistema de Filtros");
        task2.setDescricao("Implementar funcionalidade de filtro por status e busca por palavras-chave");
        task2.setStatus(Task.StatusTask.EM_ANDAMENTO);
        taskRepository.save(task2);
        
        Task task3 = new Task();
        task3.setTitulo("Documentar API");
        task3.setDescricao("Criar documentação completa da API com exemplos de uso e especificações dos endpoints");
        task3.setStatus(Task.StatusTask.NAO_INICIADO);
        taskRepository.save(task3);
        
        Task task4 = new Task();
        task4.setTitulo("Implementar Testes Unitários");
        task4.setDescricao("Desenvolver testes unitários para todas as camadas da aplicação");
        task4.setStatus(Task.StatusTask.NAO_INICIADO);
        taskRepository.save(task4);
        
        Task task5 = new Task();
        task5.setTitulo("Configurar Deploy");
        task5.setDescricao("Preparar aplicação para deploy em ambiente de produção");
        task5.setStatus(Task.StatusTask.NAO_INICIADO);
        taskRepository.save(task5);
        
        System.out.println("✅ Dados de exemplo carregados com sucesso!");
        System.out.println("📊 Total de tarefas criadas: " + taskRepository.count());
    }
}