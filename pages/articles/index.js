import { collectionGroup, getDocs, limit, query } from "@firebase/firestore";
import ArticleList from "../../components/ArticleList";
import { firestore, postToJSON } from "../../lib/firebaseConfig";


const LIMIT=15

export async function getStaticProps() {
  const articlesQuery = query(collectionGroup(firestore, "articles"), limit(LIMIT));

  const articles = (await getDocs(articlesQuery)).docs.map(postToJSON);

  return {
    props: {
      articles
    }
  }
}

export default function Page(props) {

    return (
        <main>
            <ArticleList articles={props.articles}/>
        </main>
    )
}