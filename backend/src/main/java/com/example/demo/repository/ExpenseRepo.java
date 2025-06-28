package main.java.com.example.demo.repository;

import com.example.demo.model.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// this provides the crud operations for the entity created
@Repository
public interface ExpenseRepo extends CrudRepository<Company, Long>{ 
} 
