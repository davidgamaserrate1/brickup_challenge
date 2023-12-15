package com.tasks.tasks_api.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/images")
public class ImageController {

    @Value("${upload.path}") 
    private String uploadPath;

    @GetMapping("/uploads/{imageName}")
    public ResponseEntity<Resource> getImageFromUploads(@PathVariable String imageName) {
        Path imagePath = Paths.get(uploadPath, imageName);
    
        try {
            Resource resource = new UrlResource(imagePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    
        return ResponseEntity.notFound().build();
    }
}
