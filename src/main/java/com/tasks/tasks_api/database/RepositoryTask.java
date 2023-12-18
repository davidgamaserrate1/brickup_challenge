package com.tasks.tasks_api.database;

import com.tasks.tasks_api.entity.Task;

import java.util.List;

import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class RepositoryTask {

    @PersistenceContext
    private EntityManager entityManager;

     public List<Task> findAll() {
        return entityManager.createQuery("SELECT t FROM Task t", Task.class).getResultList();
    }

    public Task findById(Long id) {
        return entityManager.find(Task.class, id);
    }

    public void save(Task task) {
        entityManager.persist(task);
    }

    public Task update(Task updatedTask) {
        return entityManager.merge(updatedTask);
    }
}
