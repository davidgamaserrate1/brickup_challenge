package com.tasks.tasks_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasks.tasks_api.database.RepositoryTask;
import com.tasks.tasks_api.entity.Task;

@RestController
@RequestMapping("/task")
public class TaskControler {
    @Autowired
    private RepositoryTask repository;

    @GetMapping 
    public List<Task> listAllTasks(){
        try{
            return repository.findAll();

        }catch (Exception e) {
            return null;
        }
    }

    @PostMapping
    public void saveTask(@RequestBody Task task){
        repository.save(task);
    }
    
    @PutMapping
    public void updateTask(@RequestBody Task task){
        if(task.getId()> 0)
            repository.save(task);
    }

}
