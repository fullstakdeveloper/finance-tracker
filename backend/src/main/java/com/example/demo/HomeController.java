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
        expenseRepo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Expense put(@PathVariable int id, @RequestBody Expense expenseUpdate) {
        Expense expense = expenseRepo.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));
        expense.settitle(expenseUpdate.gettitle());
        expense.setvalue(expenseUpdate.getvalue());
        expense.setrecurr(expenseUpdate.getrecurr());
        return expenseRepo.save(expense);
    }

    @GetMapping("/get/link_token")
    public String create_link_token() {
        
    }

}


