package com.taskmanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.repository.TaskRepository;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    TaskRepository repo;

    @PostMapping
    public Task add(@RequestBody Task t){
        return repo.save(t);
    }

    @GetMapping
    public List<Task> getAll(){
        return repo.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable int id, @RequestBody Task t){

    Task old = repo.findById(id).get();

    old.setCompleted(t.isCompleted());

    return repo.save(old);
    }
}