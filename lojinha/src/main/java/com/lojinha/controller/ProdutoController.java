package com.lojinha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lojinha.entities.Produto;
import com.lojinha.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
	
	
	@Autowired
	private ProdutoService service;
	
	@PostMapping
	public ResponseEntity<Produto> createProduct(@RequestBody Produto produto) {
		Produto newProduto = service.create(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduto);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Produto> findById(@PathVariable Long id) {
		var product = service.findById(id);
		return ResponseEntity.ok().body(product);
	}
	
	@GetMapping
	public ResponseEntity<List<Produto>> findAll() {
		List<Produto> allProducts = service.findAll();
		return ResponseEntity.ok().body(allProducts);
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
        Produto updatedProduto = service.update(id, produto);
        return ResponseEntity.ok(updatedProduto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
	
}
