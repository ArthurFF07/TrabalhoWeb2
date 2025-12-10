package com.example.demo.controller;


import com.example.demo.model.Carro;
import com.example.demo.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/carros")
@CrossOrigin("*")
public class CarroController {


@Autowired
private CarroRepository repo;


@GetMapping
public List<Carro> listar() {
return repo.findAll();
}


@GetMapping("/{id}")
public Carro obter(@PathVariable int id) {
return repo.findById(id).orElse(null);
}
}