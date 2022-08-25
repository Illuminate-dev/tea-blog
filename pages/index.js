import { collectionGroup, getDocs, limit, orderBy, query } from "@firebase/firestore";
import { useState } from "react";
import ArticleList from "../components/ArticleList";
import { firestore, postToJSON } from "../lib/firebaseConfig";

const LIMIT = 5;

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
      <div className="article-list-wrapper">
        <ArticleList articles={articles} />
      </div>

    </main>
  )
}
