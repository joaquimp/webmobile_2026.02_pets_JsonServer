import "./globals.css";

export const metadata = {
  title: "Conheça os pets",
  description: "Exemplo de consumo de API com Next.js e JSON Server.",
};

// O layout mantém a estrutura padrão do Next.js. As consultas ficam nos componentes client.
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
