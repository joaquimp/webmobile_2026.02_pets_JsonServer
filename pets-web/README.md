# Pets — Next.js e JSON Server

Exemplo para iniciantes: consumir uma API com JavaScript, `fetch`, `useState` e `useEffect`. Usa App Router, código em `src`, componentes client e CSS puro, sem Tailwind ou TypeScript.

## Organização

```text
pets-web/
├── src/
│   ├── app/
│   │   ├── layout.js        # Estrutura HTML e CSS global
│   │   ├── page.js          # Client: consulta inicial e filtro local
│   │   └── globals.css
│   └── components/
│       └── PetCard.js       # Card com foto, nome e espécie
├── .env.example             # Modelo da URL pública da API
├── .nvmrc
├── next.config.mjs
├── package.json
└── package-lock.json
```

A API está no projeto independente [`../pets-api`](../pets-api/README.md). A aplicação e a API são dois processos, em dois terminais. Cada uma tem seu próprio `package.json`. Não há API implementada em `src/app/api`; quem responde às consultas é o JSON Server.

## Executar localmente

Use Node.js 24 LTS e npm. Com nvm instalado, execute `nvm install` e `nvm use` na pasta deste projeto.

No terminal 1, partindo da pasta que contém os dois projetos:

```sh
cd pets-api
npm ci
npm start
```

Abra `http://localhost:3001/pets`. Deve aparecer um array JSON com seis pets. Deixe esse terminal ligado.

No terminal 2, também partindo da pasta que contém os dois projetos:

```sh
cd pets-web
npm ci
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`. Para encerrar cada processo, use `Ctrl+C` no respectivo terminal. Se publicar cada projeto em um repositório próprio, comece na raiz de cada um e ajuste os comandos `cd`. Eles não dependem de arquivos compartilhados.

## Executar no GitHub Codespaces

1. Envie o projeto para um repositório GitHub e abra um Codespace.
2. Confira `node -v`. Use Node.js 24; se necessário, na pasta do projeto, execute `nvm install` e `nvm use`.
3. Execute os comandos do terminal 1 acima para instalar e iniciar a API.
4. Na aba **PORTS / Portas**, encaminhe a porta **3001**. Para este exemplo com dados fictícios, altere a visibilidade dessa porta para **Public / Pública**. Mantenha o protocolo da porta como **HTTP**, pois o JSON Server serve HTTP internamente; o endereço encaminhado pelo GitHub será HTTPS.
5. Copie o endereço encaminhado da porta 3001. Exemplo: `https://nome-do-codespace-3001.app.github.dev`.
6. Abra esse endereço com `/pets` no final e confirme que aparece JSON, sem uma página de login. A porta pública permite a consulta pelo navegador em outra origem. Se sua organização bloquear portas públicas, este roteiro depende de liberação da organização ou de execução local.
7. No terminal 2, entre na pasta do projeto, execute `npm ci` e `cp .env.example .env.local`. Edite `.env.local` antes de iniciar o Next.js:

   ```dotenv
   NEXT_PUBLIC_API_URL=https://nome-do-codespace-3001.app.github.dev
   ```

8. Execute `npm run dev`. Encaminhe a porta **3000** e abra o endereço dela no navegador. Essa porta pode permanecer privada.

Use o endereço real copiado da porta 3001, sem `/pets` e sem barra no final. `localhost:3001` no navegador aponta para o computador do aluno, enquanto a API está no Codespace. Por isso a variável precisa mudar nesse ambiente. Reinicie o Next.js sempre que alterar `.env.local`; no build de produção, essa variável é incorporada durante `npm run build`.

`next.config.mjs` permite o domínio de desenvolvimento `*.app.github.dev`. A configuração não cria nem encaminha portas. O JSON Server já habilita CORS por padrão, permitindo a consulta entre os endereços das portas 3000 e 3001.

## Consultas GET

Substitua a base local pelo endereço da porta 3001 se estiver no Codespaces.

| Consulta | URL local | Resposta |
| --- | --- | --- |
| Listar todos | `http://localhost:3001/pets` | Array de pets |
| Filtrar espécie | `http://localhost:3001/pets?especie=gato` | Array de gatos |
| Consultar pelo ID | `http://localhost:3001/pets/1` | Um objeto pet |
| Filtro sem resultados | `http://localhost:3001/pets?especie=passaro` | Array vazio `[]` |
| ID inexistente | `http://localhost:3001/pets/999` | HTTP 404 |

A página consulta `/pets` na montagem e guarda todos os pets em estado. O filtro usa `pets.filter(...)` no navegador, sem novas requisições e sem alterar o array original. As URLs de filtro da tabela continuam disponíveis para demonstrar consultas diretamente à API, mas não são usadas pelo seletor da aplicação. A interface tem uma única página com a lista e o filtro, sem consulta de detalhes.

A dependência da API está fixada em **JSON Server 0.17.4**, que oferece os comandos `--watch` e `--read-only` usados neste material. A linha 1.x tem diferenças; não substitua a versão sem adaptar o exemplo. `--read-only` bloqueia operações de escrita. O frontend só faz GET e não contém cadastro, edição ou exclusão. Para modificar os exemplos, edite `../pets-api/db.json` diretamente; `--watch` acompanha as mudanças.

## Roteiro de explicação

1. Abra `../pets-api/db.json`: explique objeto, array, propriedades, valores e ID. A chave `pets` origina a rota `/pets`.
2. Inicie apenas a API e visite as URLs da tabela. Compare um array com um objeto e uma lista vazia com um erro 404.
3. Abra `src/app/page.js`: `"use client"` habilita a parte interativa. `useState` guarda pets, filtro, carregamento e erro. `useEffect` com dependências `[]` inicia a consulta na montagem da página. Alterar a espécie renderiza a página novamente e recalcula `petsFiltrados`, sem repetir o efeito.
4. Acompanhe o trecho `fetch` → `resposta.ok` → `resposta.json()` → `setPets`. `fetch` não lança erro automaticamente quando recebe 404 ou 500; por isso há verificação de status.
5. Mostre o `filter`, seguido do `map` e da prop `key`, e como cada objeto pet chega ao componente `PetCard` pela prop `pet`.
6. Abra as ferramentas do navegador, aba **Network / Rede**, filtro **Fetch/XHR**. Recarregue a página e selecione **Gato**. Confira que a listagem faz GET `/pets` e o filtro não faz outra requisição.
7. Selecione **Pássaro** para demonstrar a lista vazia. Após a lista carregar, pare a API e troque a espécie: o filtro continua funcionando com os dados em memória. Recarregue a página com a API desligada para demonstrar erro; ligue a API e recarregue para recuperar a lista.

Na listagem, o efeito usa `[]` e não precisa coordenar consultas provocadas pela troca de filtro, por isso o exemplo não usa a variável `ignorar` nessa página. Em desenvolvimento, o Strict Mode do React pode executar o efeito novamente, mesmo com `[]`, produzindo consultas GET duplicadas na aba Rede. O array vazio significa que mudanças de estado não repetem o efeito; uma nova montagem executa o efeito novamente.

O `layout.js` continua como o layout padrão do App Router. O consumo da API acontece no navegador, em `page.js`. `PetCard` também integra a árvore client porque é importado pela página client.

## Verificações manuais

- Ao abrir a aplicação, aparecem seis pets.
- O filtro local mostra três cachorros, dois gatos ou um coelho, sem novas consultas à API.
- Pássaro exibe a mensagem de lista vazia.
- Trocar rapidamente a espécie mantém o resultado do último filtro.
- Após carregar os pets, desligar a API não impede o filtro local. Recarregar a página com a API desligada exibe erro; religue a API e recarregue para tentar novamente.
- Para observar carregamento, use uma rede lenta na aba Network do navegador.
- Uma consulta direta a `/pets/999` retorna 404.

## Build

Na pasta do projeto Next.js:

```sh
npm run build
npm start
```

Pare o servidor de desenvolvimento antes de `npm start`, pois ambos usam a porta 3000. A API deve continuar ligada na porta 3001. O build não consulta os pets; eles são carregados pelo navegador ao abrir a aplicação.

## Referências

- [Instalação do Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [allowedDevOrigins](https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins)
- [JSON Server 0.17.4 e opções da CLI](https://github.com/typicode/json-server/tree/v0.17.4#cli-usage)
- [Encaminhamento de portas no Codespaces](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)

## Imagens

O campo `imagem` de cada pet contém uma URL HTTPS do Unsplash. Os cards usam a tag HTML `<img>`, com `alt`, `width` e `height`, sem importar `next/image`. O navegador carrega as fotos diretamente; é necessário acesso à internet para visualizá-las. Os dados e as fotos são ilustrativos.
