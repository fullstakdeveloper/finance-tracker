package com.example.demo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.repository.ExpenseRepo;
import com.example.demo.model.Expense;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "*") 
@RestController
public class HomeController {

     @Autowired
    private ExpenseRepo expenseRepo;
    
    //sends the pst request to this method
    @PostMapping("/post")
    public Expense post(@RequestBody Expense expense) {
        return expenseRepo.save(expense);
    }
    
}


