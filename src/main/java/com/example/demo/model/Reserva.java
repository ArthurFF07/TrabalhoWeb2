package com.example.demo.model;
import jakarta.persistence.*;


@Entity
public class Reserva {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;


private Integer carroId;
private String contatoUsuario;
private String dataInicio;
private String horaInicio;
private String status;


public Integer getId() { return id; }
public void setId(Integer id) { this.id = id; }
public Integer getCarroId() { return carroId; }
public void setCarroId(Integer carroId) { this.carroId = carroId; }
public String getContatoUsuario() { return contatoUsuario; }
public void setContatoUsuario(String contatoUsuario) { this.contatoUsuario = contatoUsuario; }
public String getDataInicio() { return dataInicio; }
public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }
public String getHoraInicio() { return horaInicio; }
public void setHoraInicio(String horaInicio) { this.horaInicio = horaInicio; }
public String getStatus() { return status; }
public void setStatus(String status) { this.status = status; }
}