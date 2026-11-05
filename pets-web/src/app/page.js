"use client";

import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Home() {
  const [pets, setPets] = useState([]);
  const [especie, setEspecie] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarPets() {
      try {
        // fetch usa GET por padrão. Aqui o método está explícito para a aula.
        const resposta = await fetch(`${API_URL}/pets`, { method: "GET" });
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status} ao consultar os pets.`);
        }

        const dados = await resposta.json();
        setPets(dados);
      } catch (erro) {
        setErro(`${erro.message} Verifique a API e a URL, depois recarregue a página.`);
      } finally {
        setCarregando(false);
      }
    }

    buscarPets();
  }, []);

  // O filtro usa os dados já carregados, sem fazer outra requisição.
  const petsFiltrados = pets.filter((pet) => {
    return especie === "" || pet.especie === especie;
  });

  return (
    <main>
      <h1>Pets</h1>

      <section aria-labelledby="titulo-lista">
        <h2 id="titulo-lista">Lista de pets</h2>
        <label htmlFor="especie">Espécie: </label>
        <select id="especie" value={especie} onChange={(evento) => {
          setEspecie(evento.target.value);
        }}>
          <option value="">Todas</option>
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
          <option value="coelho">Coelho</option>
          <option value="passaro">Pássaro</option>
        </select>

        {carregando && <p role="status">Carregando pets...</p>}
        {erro && <p role="alert" className="erro">{erro}</p>}
        {!carregando && !erro && petsFiltrados.length === 0 && (
          <p role="status">Nenhum pet encontrado para esta espécie.</p>
        )}
        {!carregando && !erro && petsFiltrados.length > 0 && (
          <ul className="lista-pets">
            {petsFiltrados.map((pet) => (
              <li key={pet.id}>
                <PetCard pet={pet} />
              </li>
            ))}
          </ul>
        )}
      </section>

    </main>
  );
}
