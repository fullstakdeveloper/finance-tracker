package com.example.demo.repository;
import com.example.demo.model.Expense;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// this provides the crud operations for the entity created
@Repository
public interface ExpenseRepo extends CrudRepository<Expense, Integer>{ 
} 
