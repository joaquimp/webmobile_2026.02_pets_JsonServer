// Este componente faz parte da árvore client iniciada em page.js.
export default function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <img src={pet.imagem} alt={`Foto de ${pet.nome}`} width="640" height="400" loading="lazy" />
      <h3>{pet.nome}</h3>
      <p>{pet.especie}</p>
    </article>
  );
}
