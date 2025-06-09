package com.example.demo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HomeController {
    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @GetMapping("/api")
    public void result() {
        System.out.println("The request went through");
    }
}


