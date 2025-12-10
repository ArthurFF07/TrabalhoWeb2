package com.example.demo.model;
import jakarta.persistence.*;
@Entity
public class Carro {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;


private String nome;
private Double preco;
private String contato;
private String fotos; // URLs ou JSON de fotos
private String caracteristicas; // Texto das características do carro
private String comentario; // Comentário exibido na página de detalhes


public Integer getId() { return id; }
public void setId(Integer id) { this.id = id; }
public String getNome() { return nome; }
public void setNome(String nome) { this.nome = nome; }
public Double getPreco() { return preco; }
public void setPreco(Double preco) { this.preco = preco; }
public String getContato() { return contato; }
public void setContato(String contato) { this.contato = contato; }
public String getFotos() { return fotos; }
public void setFotos(String fotos) { this.fotos = fotos; }
public String getCaracteristicas() { return caracteristicas; }
public void setCaracteristicas(String caracteristicas) { this.caracteristicas = caracteristicas; }
public String getComentario() { return comentario; }
public void setComentario(String comentario) { this.comentario = comentario; }
}