import { collectionGroup, getDocs, limit, orderBy, query } from "@firebase/firestore";
import { useState } from "react";
import ArticleList from "../components/ArticleList";
import { firestore, postToJSON } from "../lib/firebaseConfig";

const LIMIT = 3;

export async function getStaticProps() {
  const articlesQuery = query(collectionGroup(firestore, "articles"), orderBy("createdAt", "desc"), limit(LIMIT));

  const articles = (await getDocs(articlesQuery)).docs.map(postToJSON);

  return {
    props: {
      articles
    }
  }
}

export default function Home(props) {
  const [articles, setArticles] = useState(props.articles)
  
  return (
    <main>
      <ArticleList articles={articles} />

    </main>
  )
}
