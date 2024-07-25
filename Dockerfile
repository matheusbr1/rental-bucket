# Use a imagem oficial do Node.js 20 como base
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos de dependências para o diretório de trabalho
COPY package*.json ./

# Instale as dependências, incluindo as de desenvolvimento
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que a aplicação Next.js irá utilizar
EXPOSE 3000

# Comando para iniciar a aplicação Next.js em modo de desenvolvimento
CMD ["npm", "run", "dev"]
