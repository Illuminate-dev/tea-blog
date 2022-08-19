import Image from "next/image"
import Link from "next/link";


export default function ArticleList({admin, articles}) {

    return (<ul className="article-list">
        {articles && articles.map(article => <Article article={article} key={article.slug} admin={admin}/>)}
    </ul>)
}

function Article({admin, article}) {
    
    

    return (<li className="article-card">


            <div className="left">
                <Link href={`/article/${article.slug}`}>
                    <h2>
                        <a>{article.title}</a>
                    </h2>
                </Link>
                <Image src={article.imageUrl} width={400} height={200}></Image>
                
                       <p>{article.content.slice(0, 10)}...</p>
            </div>
            {admin && 
            <div className="right">
                <Link href={`/admin/${article.slug}`}>Edit</Link>
            </div>}

    </li>)
}