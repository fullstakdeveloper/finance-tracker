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

    //sends the get request to this method
    @GetMapping("/get")
    public void get() {
        System.out.println("The request went through");
        System.out.println("This is the get request, write backend");
    }

    //sends the pst request to this method
    @GetMapping("/post")
    public void post() {
        System.out.println("Write backend to send to the database");
    }
}


