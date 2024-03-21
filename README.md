<h1>Trabalho de Desenvolvimento em Nuvem</h1>
<p>Este é o repositório do trabalho da disciplina Ambiente de Desenvolvimento em Nuvem, que consiste em uma aplicação com backend em Java utilizando JPA, Spring e Postgres, rodando em um container Docker, e frontend em React também executado em um container Docker separado.</p>
    <h2>Backend</h2>
    <p>O backend foi desenvolvido em Java, utilizando JPA para persistência de dados, Spring para o framework de aplicação e Maven para gerenciamento de dependências. Ele roda em um container Docker, integrado a uma rede que inclui o banco de dados Postgres.</p>
    <h3>Endpoints do Backend</h3>
    <p>Aqui estão os principais endpoints do backend:</p>
    <ul>
        <li><strong>POST /produtos:</strong> Cria um novo produto.</li>
        <li><strong>GET /produtos/{id}:</strong> Busca um produto pelo ID.</li>
        <li><strong>GET /produtos:</strong> Retorna todos os produtos.</li>
        <li><strong>PUT /produtos/{id}:</strong> Atualiza um produto existente.</li>
        <li><strong>DELETE /produtos/{id}:</strong> Remove um produto.</li>
    </ul>
    <h3>Configuração do Backend com Docker Compose</h3>
    <p>Para configurar e executar o backend, siga estas etapas:</p>
    <ol>
        <li>Certifique-se de ter o Docker e o Docker Compose instalados.</li>
        <li>No diretório raiz do projeto, crie um arquivo chamado <code>docker-compose.yml</code> com o seguinte conteúdo:</li>
        <pre><code>
version: '3.5'
services:
  api-backend:
    image: minha-api:v1
    environment:
      spring.profiles.active: prod
    depends_on:
      - db
    ports:
      - "8080:8080"
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: lojadb
        </code></pre>
        <li>Certifique-se de ter o arquivo Dockerfile no diretório do backend com o seguinte conteúdo:</li>
        <pre><code>
FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
        </code></pre>
        <li>Certifique-se de ter o arquivo <code>application-prod.properties</code> no diretório do backend com o seguinte conteúdo:</li>
        <pre><code>
spring.datasource.url=jdbc:postgresql://db:5432/lojadb
spring.datasource.password=123
spring.datasource.username=postgres
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
        </code></pre>
        <li>No terminal, execute o comando <code>docker-compose up</code> para iniciar o backend.</li>
    </ol>
    <h2>Frontend</h2>
    <p>O frontend foi desenvolvido em React e também é executado em um container Docker separado do backend.</p>
    <h3>Configuração do Frontend com Docker</h3>
    <p>Para configurar e executar o frontend, siga estas etapas:</p>
    <ol>
        <li>Certifique-se de ter o Docker instalado.</li>
        <li>No diretório raiz do projeto frontend, crie um arquivo chamado <code>Dockerfile</code> com o seguinte conteúdo:</li>
        <pre><code>
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
        </code></pre>
        <li>No terminal, navegue até o diretório raiz do projeto frontend e execute o comando <code>docker build -t meu-frontend .</code> para construir a imagem Docker.</li>
        <li>Em seguida, execute o comando <code>docker run -p 3000:3000 meu-frontend</code> para iniciar o frontend.</li>
    </ol>
    <h2>Contribuindo</h2>
    <p>Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests neste repositório.</p>

