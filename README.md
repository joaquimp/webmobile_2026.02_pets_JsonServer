# Pets — consumo de API para iniciantes

Esta aula contém **dois projetos independentes**, sem dependências ou código compartilhado:

- [`pets-api/`](pets-api/README.md): API de Pets com JSON Server, banco JSON populado e imagens. Porta 3001.
- [`pets-web/`](pets-web/README.md): Next.js em JavaScript, código em `src`, componentes client e CSS puro. Porta 3000.

Comece pelo README da API: instale, inicie e visite `/pets`. Depois siga o README do Next.js para conectar a aplicação à API. Os dois terminais precisam continuar ligados.

O Next.js tem uma única página, faz GET para carregar a lista e filtra os dados no navegador. As fotos são renderizadas com `<img>`. O guia do frontend inclui o passo a passo do GitHub Codespaces, o roteiro de explicação e as verificações manuais.

Cada subpasta pode ser copiada ou publicada em seu próprio repositório sem levar o outro projeto.

## Início rápido

Com Node.js 24 e npm, abra dois terminais na raiz deste repositório.

Terminal 1 — API:

```sh
cd pets-api
npm ci
npm start
```

Terminal 2 — Next.js:

```sh
cd pets-web
npm ci
cp .env.example .env.local
npm run dev
```

Localmente, abra `http://localhost:3000`. No Codespaces, configure a URL da API em `.env.local` conforme o [guia do frontend](pets-web/README.md#executar-no-github-codespaces) antes de iniciar o Next.js.
