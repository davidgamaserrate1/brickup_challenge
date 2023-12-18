package com.tasks.tasks_api.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tasks.tasks_api.database.RepositoryTask;
import com.tasks.tasks_api.entity.Task;

@CrossOrigin(origins = "*")
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
    public ResponseEntity<Task> saveTask(@RequestBody Task task){
        repository.save(task);

        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }
    
    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody Task updatedTask) {
        if (updatedTask.getId() == null || updatedTask.getId() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }    
        
        Task existingTask = repository.findById(updatedTask.getId());
    
        if (existingTask == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        if (updatedTask.getName() != null) {
            existingTask.setName(updatedTask.getName());
        }
    
        if (updatedTask.getDescription() != null) {
            existingTask.setDescription(updatedTask.getDescription());
        }
    
        if (updatedTask.getStatus() != null) {
            existingTask.setStatus(updatedTask.getStatus());
        }
    
        if (updatedTask.getPhoto() != null) {
            existingTask.setPhoto(updatedTask.getPhoto());
        }    
        
        repository.save(existingTask);
        return new ResponseEntity<>(existingTask, HttpStatus.OK);
    }
    
    @Value("${upload.path}") 
    private String uploadPath;

    @PostMapping("/upload/{taskId}")
    public void uploadPhoto(@PathVariable Long taskId, @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {                
                File uploadDirectory = new File(uploadPath);
                if (!uploadDirectory.exists()) { 
                    uploadDirectory.mkdirs();
                }

                String filePath = uploadPath + File.separator + "task_" + taskId + "_" + file.getOriginalFilename();
                filePath = filePath.replace("\\", "/");

                File dest = new File(filePath);
                FileUtils.writeByteArrayToFile(dest, file.getBytes());
                 
                Task task = repository.findById(taskId);
                if (task != null) {
                    task.setPhoto(filePath);  
                    repository.save(task);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
