# Use uma imagem base leve do Node.js
FROM node:alpine

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY . .

# Instale o Axios globalmente (você pode remover isso se já estiver instalado localmente)
RUN npm install -g axios

# Exponha a porta que a aplicação frontend utilizará (se necessário)
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
