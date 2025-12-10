package com.example.demo.repository;
import com.example.demo.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
List<Reserva> findByContatoUsuario(String contato);
}