package main.java.com.example.demo.model;

import jakarta.persistence.*;

// this marks it as a JPA entity
@Entity
public class Expense {
    // defines the primary key
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    String title;
    int value;

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

    // String name;
    // Double expense_val;
    // boolean recurr;

    // //jpa requires this for some reason
    // public Expense() {}

    // //actual constructor
    // public Expense(String name, Double expense_val, boolean recurr) {
    //     this.name = name;
    //     this.expense_val = expense_val;
    //     this.recurr = recurr;
    // }

    // public Integer getId() {
    //     return(this.id);
    // }

    //the rest are just method on this class, I will deal with later
}
