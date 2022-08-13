import Image from "next/image"

export default function ArticleList() {
    
    return (<ul>
    </ul>)
}

function Article(props) {
    return (<li>
        <h2>{props.title}</h2>
        <Image src={props.image} alt={props.title} width={300} height={200} />
    </li>)
}