package com.example.demo.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

// this marks it as a JPA entity
@Entity
public class Expense {
    // defines the primary key
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    String title;
    int value;
    Boolean recurr;
    LocalDateTime createdAt = LocalDateTime.now();

    public Expense() {}

    public Expense(String title, int value) {
        this.title = title;
        this.value = value;
    }

    public String gettitle() {
        return(this.title);
    }

    public int getvalue() {
        return(this.value);
    }

    public int getid() {
        return(this.id);
    }

    public void settitle(String newtitle) {
        this.title = newtitle;
    }
}
