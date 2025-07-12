package com.example.demo.model;
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
    Boolean recurr;
    String date;

    public Expense() {}

    public Expense(String title, int value, Boolean recurr, String date) {
        this.title = title;
        this.value = value;
        this.recurr = recurr;
        this.date = date;
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

    public Boolean getrecurr() {
        return this.recurr;
    }

    public String getdate() {
        return this.date;
    }

    public void settitle(String newtitle) {
        this.title = newtitle;
    }

    public void setvalue(int newvalue) {
        this.value = newvalue;
    }

    public void setrecurr(Boolean newrecurr) {
        this.recurr = newrecurr;
    }

    public void setdate(String newdate) {
        this.date = newdate;
    }
}
