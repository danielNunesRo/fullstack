package com.lojinha.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lojinha.entities.Produto;
import com.lojinha.exception.RequiredObjectIsNullException;
import com.lojinha.exception.ResourceNotFoundException;
import com.lojinha.repositories.ProdutoRepository;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository repository;
	
	
	public Produto create(Produto produto) {
		if (produto.getName() == null || produto.getDescription() == null || produto.getPrice() == null ||
			    produto.getName().isEmpty() || produto.getDescription().isEmpty()) {
			    throw new RequiredObjectIsNullException("Todos os campos name, description e price devem estar preenchidos.");
			}
		var newProduto = repository.save(produto);
		return newProduto;
	}
	
	public Produto findById(Long id) {
		var existingProduct = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nenhum Produto encontrado com esse ID"));
		return existingProduct;
	}
	
	public List<Produto> findAll() {
		return repository.findAll();
	}
	
	public Produto update(Long id, Produto produto) {
		var existingProduct = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nenhum Produto encontrado com esse ID"));
		existingProduct.setName(produto.getName());
		existingProduct.setDescription(produto.getDescription());
		existingProduct.setPrice(produto.getPrice());
		repository.save(existingProduct);
		return existingProduct;
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
	
}
