import { useRouter } from "next/router";

export default function Post({ message, data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      Viewing data for {id} {message}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  const results = data.results;

  // Get the paths we want to pre-render based on posts
  const paths = results
    .map((post) => `/posts/${post.id}`)
    .filter((item, index) => index < 2);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { id } }) {
  const req = await fetch("https://rickandmortyapi.com/api/character");
  const alldata = await req.json();
  const results = alldata.results;

  const data = results.filter((item) => {
    return item.id == id;
  });

  return {
    props: {
      data,
      message: "message from props",
    },
  };
}
