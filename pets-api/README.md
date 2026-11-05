# API de Pets — JSON Server

Projeto independente para iniciar uma API fictícia a partir de um arquivo JSON populado. Não precisa do Next.js para funcionar.

## Executar

Use Node.js 24 LTS e npm. Na raiz deste projeto (`pets-api`):

```sh
npm ci
npm start
```

A API fica em `http://localhost:3001`. Para parar, pressione `Ctrl+C`.

## Arquivos

- `db.json`: seis pets fictícios, com nome, espécie, raça, idade, porte, vacinação, descrição e imagem.
- `package.json`: instala JSON Server **0.17.4**, com versão fixa, e define o comando de execução.
- `package-lock.json`: registra as dependências para instalação com `npm ci`.
- `.nvmrc`: indica Node.js 24 para quem usa nvm.

Não há servidor Next.js nem componentes React neste projeto.

## Como o comando funciona

```sh
json-server --watch db.json --host 0.0.0.0 --port 3001 --read-only
```

- `--watch db.json`: lê os dados e acompanha alterações feitas no arquivo.
- `--host 0.0.0.0`: permite acesso pelo encaminhamento de portas do Codespaces.
- `--port 3001`: separa a API da porta 3000 usada pelo frontend.
- `--read-only`: bloqueia operações de escrita na API.

Este comando usa opções da versão 0.17.4. Não instale a versão 1.x sem adaptar o exemplo. CORS já vem habilitado por padrão para o navegador consultar a API a partir de outra origem.

## Rotas para demonstrar

| Método | Caminho | Resultado |
| --- | --- | --- |
| GET | `/pets` | Array com todos os pets |
| GET | `/pets/1` | Um objeto com o pet de ID 1 |
| GET | `/pets?especie=cachorro` | Array com três cachorros |
| GET | `/pets?especie=gato` | Array com dois gatos |
| GET | `/pets?especie=coelho` | Array com um coelho |
| GET | `/pets?especie=passaro` | Array vazio |
| GET | `/pets/999` | HTTP 404 |

Abra, por exemplo, `http://localhost:3001/pets/1` no navegador. Ou consulte pelo terminal:

```sh
curl http://localhost:3001/pets
curl 'http://localhost:3001/pets?especie=gato'
curl -i http://localhost:3001/pets/999
```

A chave `pets` do objeto principal em `db.json` cria a rota `/pets`. O `id` identifica cada registro. Para alterar ou acrescentar pets, edite o arquivo diretamente e mantenha IDs únicos.

O campo `imagem` contém uma URL HTTPS do Unsplash. O JSON Server entrega essa URL como texto; a foto é carregada pelo navegador ao usar `<img src={pet.imagem}>`. É necessário acesso à internet para carregar as fotos, que são ilustrativas.

## No Codespaces

1. Inicie a API com os mesmos comandos acima.
2. Na aba **Portas / PORTS**, encaminhe a porta **3001**.
3. Neste exemplo com dados fictícios, altere a visibilidade da porta para **Pública / Public** para permitir o GET do frontend em outra origem. O protocolo interno permanece **HTTP**; o endereço encaminhado é HTTPS.
4. Copie o endereço encaminhado, como `https://nome-do-codespace-3001.app.github.dev`.
5. Abra esse endereço com `/pets` no final e confira se aparece JSON sem login.
6. Configure o frontend com essa base em `NEXT_PUBLIC_API_URL`, sem `/pets` nem barra final. Consulte o [guia do Next.js](../pets-web/README.md).

Se a organização proibir portas públicas, esse roteiro exige liberação da organização ou execução local. A porta 3000 da aplicação pode permanecer privada. Os projetos também podem rodar em Codespaces distintos: basta usar a URL encaminhada da API no frontend.

## Referências

- [JSON Server 0.17.4 — documentação da versão usada](https://github.com/typicode/json-server/tree/v0.17.4)
- [Encaminhamento de portas no Codespaces](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)
