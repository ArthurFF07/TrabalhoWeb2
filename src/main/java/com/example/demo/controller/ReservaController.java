package com.example.demo.controller;


import com.example.demo.model.Reserva;
import com.example.demo.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/reservas")
@CrossOrigin("*")
public class ReservaController {


@Autowired
private ReservaRepository repo;


@PostMapping
public Reserva criar(@RequestBody Reserva r) {
r.setStatus("Em andamento");
return repo.save(r);
}


@GetMapping("/{contato}")
public List<Reserva> listar(@PathVariable String contato) {
return repo.findByContatoUsuario(contato);
}
}