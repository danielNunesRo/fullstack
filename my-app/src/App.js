import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios.get("http://localhost:8080/produtos")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.error("Erro ao carregar produtos:", error);
        alert("Erro ao carregar produtos. Por favor, tente novamente.");
      });
  }

  const handleAddProduct = () => {
    const newProduct = {
      name: name,
      description: description,
      price: price
    };

    axios.post('http://localhost:8080/produtos', newProduct)
      .then(function (response) {
        setName('');
        setDescription('');
        setPrice('');
        loadProducts();
        alert('Produto cadastrado com sucesso!');
      })
      .catch(function (error) {
        console.error('Erro ao cadastrar produto:', error);
        alert('Erro ao cadastrar produto. Por favor, tente novamente.');
      });
  }

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:8080/produtos/${productId}`)
      .then(function (response) {
        alert('Produto excluído com sucesso!');
        loadProducts();
      })
      .catch(function (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto. Por favor, tente novamente.");
      });
  }

  const handleUpdateProduct = (productId) => {
    const newName = prompt('Digite o novo nome para o produto:');
    const newDescription = prompt('Digite a nova descrição para o produto:');
    const newPrice = parseFloat(prompt('Digite o novo preço para o produto:'));

    if (newName !== null && newDescription !== null && !isNaN(newPrice)) {
      const updatedProduct = {
        name: newName,
        description: newDescription,
        price: newPrice
      };

      axios.put(`http://localhost:8080/produtos/${productId}`, updatedProduct)
        .then(function (response) {
          alert('Produto atualizado com sucesso!');
          loadProducts();
        })
        .catch(function (error) {
          console.error("Erro ao atualizar produto:", error);
          alert("Erro ao atualizar produto. Por favor, tente novamente.");
        });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Cadastro de Produto</h2>
        <div className="input-group">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nome do Produto" />
        </div>
        <div className="input-group">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Descrição do Produto"></textarea>
        </div>
        <div className="input-group">
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" min="0" required placeholder="Valor" />
        </div>
        <button onClick={handleAddProduct} className="green-button">Cadastrar</button>
      </div>

      <div className="container-2">
        <h2>Produtos Cadastrados:</h2>
        <table id="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ações</th> {/* Adicionando uma coluna extra para os botões de ação */}
            </tr>
          </thead>
          <tbody id="products-list">
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
                  <span className="button-separator">|</span>
                  <button onClick={() => handleUpdateProduct(product.id)}>Atualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
