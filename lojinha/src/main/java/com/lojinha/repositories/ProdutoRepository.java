package com.lojinha.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lojinha.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
