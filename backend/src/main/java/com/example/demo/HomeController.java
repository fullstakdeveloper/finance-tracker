package com.example.demo;
import org.springframework.web.bind.annotation.*;
import java.util.Map; 
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*") 
@RestController
public class HomeController {
    
    //sends the pst request to this method
    @PostMapping("/post")
    public void post(@RequestBody Map<String, String> data) {
        String title = data.get("Name");
        System.out.println("Post request received");
    }
    
}


