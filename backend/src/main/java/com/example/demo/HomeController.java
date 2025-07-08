package com.example.demo;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repository.ExpenseRepo;
import com.example.demo.model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@CrossOrigin(origins = "*") 
@RestController
public class HomeController {

    //What is this doing!
    @Autowired
    private ExpenseRepo expenseRepo;

    //routes the /post request to this function
    @PostMapping("/post")
    public Expense post(@RequestBody Expense expense) {
        System.out.println(expense);

        return expenseRepo.save(expense);
    }

    //routes the /get request to this function  
    @GetMapping("/get")
    public List<Expense> get(){
        return (List<Expense>) expenseRepo.findAll();
    }

    // PathVariables links the "/{id} variable to the parameter"
    @DeleteMapping("/{id}")  
    public void deleteExpense(@PathVariable int id) {
        System.out.println("got request");
        expenseRepo.deleteById(id);
    }   
    
}


