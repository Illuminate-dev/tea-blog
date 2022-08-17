import Image from "next/image"
import Link from "next/link";


export default function ArticleList({articles}) {

    return (<ul className="articleList">
        {articles && articles.map(article => <Article article={article} key={article.slug}/>)}
    </ul>)
}

function Article({article}) {
    
    

    return (<li className="article-card">

        <Link href={`/article/${article.slug}`}>
            <h2>
                <a>{article.title}</a>
            </h2>
        </Link>

       <p>{article.content.slice(0, 20)}</p> 

    </li>)
}