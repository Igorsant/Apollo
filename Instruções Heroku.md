# Instruções
### (Funcional enquanto os dynos grátis estiverem disponíveis - até 01/03/2023)
---

### 1) Instalar [CLI do Heroku](https://devcenter.heroku.com/articles/heroku-cli)
-  Depois de configurado, upar o projeto para o repositório remoto do heroku
```bash
git push heroku <main ou master>
```

### 2) Não ter um Procfile ou dynos selecionados (worker ou web)

### 3) Configurar as variáveis do projeto
> `DATABASE_URL` disponibilizada como `URL` no ElephantSQL

| Nome | Valor |
| ---- | ----- |
| DATABASE_URL | postgres://wwwkaazb:PxBKph07aeBeN7FBx6donkgd2l-8nIbn@kesavan.db.elephantsql.com/wwwkaazb |
| JWT_LOGIN_SECRET | (qualquer texto, apenas o back assina e envia o token para o front) |
| NODE_ENV | production |
| PORT | 3001 (opcional) |

### 4) Criar um script `start` no `package.json`
```json
"scripts": {
	"start": "node build/src/index.js"
}
```
### 5) Verificar se possui ao menos um processo para executar o projeto
```bash
heroku ps:scale web=1
```

### 6) Pode ser criado um `Procfile` para substituir os passos 2 e 5
```bash
web: npm start;
```
