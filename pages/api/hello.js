// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const character = await fetch("https://rickandmortyapi.com/api/character");
  const j = await character.json();
  res.statusCode = 200;
  res.json(j.results);
};
