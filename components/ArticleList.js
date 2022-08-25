import Image from "next/image"
import Link from "next/link";


export default function ArticleList({admin, articles}) {

    return (<ul className="article-list">
        {articles && articles.map((article, idx) => <Article article={article} key={article.slug} admin={admin} first={idx === 0}/>)}
    </ul>)
}

function Article({admin, article, first}) {

    
    

    return (<li className="article-card">


            <div className="left">
                    <Link href={`/article/${article.slug}`}>
                        <h2>
                            <a>{article.title}</a>
                        </h2>
                    </Link>
                <div className="image-wrapper">
                    <Link href={`/article/${article.slug}`}>
                        <Image src={article.imageUrl} width={first ? 800 : 400} height={first ? 400 : 200} className="article-image"></Image>
                    </Link>
                </div>
                
                       <p>{article.content.slice(0, 10)}...</p>
            </div>
            {admin && 
            <div className="right">
                <Link href={`/admin/${article.slug}`}>Edit</Link>
            </div>}

    </li>)
}