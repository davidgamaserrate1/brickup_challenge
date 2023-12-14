package com.tasks.tasks_api.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasks.tasks_api.entity.Task;

public interface RepositoryTask extends JpaRepository<Task,Long>{    
    
}
