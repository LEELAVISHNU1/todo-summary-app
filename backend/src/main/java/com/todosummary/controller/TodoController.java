package com.todosummary.controller;

import com.todosummary.model.Todo;
import com.todosummary.repository.TodoRepository;
import com.todosummary.service.CohereService;
import com.todosummary.service.SlackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    private final TodoRepository todoRepository;
    private final CohereService cohereService;
    private final SlackService slackService;

    public TodoController(TodoRepository todoRepository, 
                        CohereService cohereService,
                        SlackService slackService) {
        this.todoRepository = todoRepository;
        this.cohereService = cohereService;
        this.slackService = slackService;
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        Optional<Todo> existingTodo = todoRepository.findById(id);
        
        if (existingTodo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Todo todo = existingTodo.get();
        todo.setTitle(updatedTodo.getTitle());
        todo.setDescription(updatedTodo.getDescription());
        todo.setCompleted(updatedTodo.isCompleted());
        
        Todo savedTodo = todoRepository.save(todo);
        return ResponseEntity.ok(savedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pending")
    public List<Todo> getPendingTodos() {
        return todoRepository.findByCompletedFalse();
    }

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeAndSendToSlack() {
        try {
            List<Todo> pendingTodos = getPendingTodos();
            List<String> todoStrings = pendingTodos.stream()
                    .map(todo -> "- " + todo.getTitle() + 
                        (todo.getDescription() != null ? ": " + todo.getDescription() : ""))
                    .collect(Collectors.toList());

            String summary = cohereService.summarizeTodos(todoStrings);
            slackService.sendToSlack(summary);

            return ResponseEntity.ok("Summary sent to Slack successfully!");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}