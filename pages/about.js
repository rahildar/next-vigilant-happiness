export default function About({ message, data }) {
  const singleItem = data.results[1];

  return (
    <div>
      About Page - {message}
      <div>
        <pre>{JSON.stringify(singleItem, null, 2)}</pre>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const req = await fetch("https://rickandmortyapi.com/api/character");
  const data = await req.json();

  return {
    props: {
      data,
      message: "message from props",
    },
  };
}
