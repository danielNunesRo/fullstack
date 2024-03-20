document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar e exibir os produtos cadastrados
    function loadProducts() {
        axios.get("http://localhost:8080/produtos")
            .then(function (response) {
                // Limpa a lista de produtos
                var productsTable = document.getElementById("products-list");
                productsTable.innerHTML = '';

                // Itera sobre os produtos retornados pela API
                response.data.forEach(function (product) {
                    // Verifica se os campos estão definidos
                    var id = product.id || 'ID não definido';
                    var name = product.name || 'Nome não definido';
                    var description = product.description || 'Descrição não definida';
                    var preco = product.price ? product.price.toFixed(2) : 'Preço não definido';

                    // Cria uma nova linha na tabela para exibir o produto
                    var newRow = productsTable.insertRow();
                    newRow.innerHTML = `
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${description}</td>
                        <td>R$ ${preco}</td>
                        <td>
                            <button class="delete-button" data-product-id="${id}">Excluir</button>
                            <button class="update-button" data-product-id="${id}">Atualizar</button>
                        </td>
                    `;
                });

                // Adiciona evento de clique para cada botão de delete
                var deleteButtons = document.querySelectorAll('.delete-button');
                deleteButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        var productId = this.getAttribute('data-product-id');
                        var confirmDelete = confirm('Tem certeza que deseja excluir este produto?');
                        if (confirmDelete) {
                            deleteProduct(productId);
                        }
                    });
                });

                // Adiciona evento de clique para cada botão de atualizar
                var updateButtons = document.querySelectorAll('.update-button');
                updateButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        var productId = this.getAttribute('data-product-id');
                        var newName = prompt('Digite o novo nome para o produto:');
                        var newDescription = prompt('Digite a nova descrição para o produto:');
                        var newPrice = parseFloat(prompt('Digite o novo preço para o produto:'));

                        // Verifica se o usuário cancelou a operação
                        if (newName !== null && newDescription !== null && !isNaN(newPrice)) {
                            updateProduct(productId, { name: newName, description: newDescription, price: newPrice });
                        }
                    });
                });
            })
            .catch(function (error) {
                console.error("Erro ao carregar produtos:", error);
                alert("Erro ao carregar produtos. Por favor, tente novamente.");
            });
    }

    // Função para enviar uma solicitação DELETE para excluir um produto
    function deleteProduct(productId) {
        axios.delete(`http://localhost:8080/produtos/${productId}`)
            .then(function (response) {
                alert('Produto excluído com sucesso!');
                // Recarrega os produtos
                loadProducts();
            })
            .catch(function (error) {
                console.error("Erro ao excluir produto:", error);
                alert("Erro ao excluir produto. Por favor, tente novamente.");
            });
    }

    // Função para enviar uma solicitação PUT para atualizar um produto
    function updateProduct(productId, updatedProduct) {
        axios.put(`http://localhost:8080/produtos/${productId}`, updatedProduct)
            .then(function (response) {
                alert('Produto atualizado com sucesso!');
                // Recarrega os produtos após a atualização
                loadProducts();
            })
            .catch(function (error) {
                console.error("Erro ao atualizar produto:", error);
                alert("Erro ao atualizar produto. Por favor, tente novamente.");
            });
    }

    // Função para enviar uma solicitação POST para adicionar um novo produto
    var cadastrarButton = document.getElementById('cadastrar-button');
    cadastrarButton.addEventListener('click', function() {
        // Obtém os valores dos campos do formulário
        var nomeProduto = document.getElementById('nome-produto').value;
        var descricaoProduto = document.getElementById('descricao-produto').value;
        var precoProduto = document.getElementById('preco-produto').value;

        // Cria um objeto com os dados do novo produto
        var novoProduto = {
            name: nomeProduto,
            description: descricaoProduto,
            price: precoProduto
        };

        // Envia uma solicitação POST para adicionar o novo produto
        axios.post('http://localhost:8080/produtos', novoProduto)
            .then(function (response) {
                // Limpa os campos do formulário
                document.getElementById('nome-produto').value = '';
                document.getElementById('descricao-produto').value = '';
                document.getElementById('preco-produto').value = '';

                // Recarrega os produtos após a adição do novo produto
                loadProducts();

                // Exibe uma mensagem de sucesso
                alert('Produto cadastrado com sucesso!');
            })
            .catch(function (error) {
                // Exibe uma mensagem de erro em caso de falha
                console.error('Erro ao cadastrar produto:', error);
                alert('Erro ao cadastrar produto. Por favor, tente novamente.');
            });
    });

    // Chama a função para carregar os produtos quando a página é carregada
    loadProducts();
});