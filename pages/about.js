import { useQuery } from "react-query";

async function getTodos() {
  const test = await fetch("/api/hello");
  return await test.json();
}

export default function About({ message, data }) {
  const singleItem = data.results[1];
  const { data: queryData = [] } = useQuery("results", getTodos);

  return (
    <div>
      About Page - {message}
      <ul>
        {queryData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
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
