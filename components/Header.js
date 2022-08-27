import { collection, collectionGroup, getDocs, query } from "@firebase/firestore";
import { faCoffee, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firestore, postToJSON } from "../lib/firebaseConfig";
import { useLoaded } from "../lib/hooks";
import { useThemeContext } from "../lib/theme";

export default function Header() {

   const { theme, setTheme } = useThemeContext();
   const loaded = useLoaded();
      const router = useRouter();

   const [ icon, setIcon ] = useState(theme === "light" ? faMoon : faSun);

   const themeClickedCallback = () => {
      setTheme(theme === "light" ? "dark" : "light");
      setIcon(theme === "light" ? faSun : faMoon);
   }

   const randomArticle = async () => {
      const colgroupquery = query(collectionGroup(firestore, 'articles'));
      const docs = ((await getDocs(colgroupquery)).docs.map(postToJSON))
      const docpath = docs[Math.floor(Math.random() * docs.length)].slug;
      router.push(`/articles/${docpath}`)
   }

   useEffect(() => {
      console.log(theme)
      if (theme === "light") {
         document.body.classList.remove("dark");
         document.querySelector("#header").classList.remove("dark");
      } else {
         document.body.classList.add("dark");
         document.querySelector("#header").classList.add("dark");
      }
      
      window.localStorage.setItem("theme", theme); 
    }, [theme])

   return (<header id="header">
      <ul className="left">
         <li className="home-link-wrapper">
            <Link href='/' className="home-link">
               <a><FontAwesomeIcon icon={faCoffee} /> <p id="home-link-text">Home</p></a>
            </Link>
            </li>
         <li><Link href="/articles">Article List</Link></li>
         <li onClick={randomArticle} style={{cursor: "pointer"}}>Random Article </li>
      </ul>
      <div className="right themeButtonWrapper">
         <>{loaded && <FontAwesomeIcon icon={icon} className="themeButton" onClick={themeClickedCallback}/>}</>
         
      </div>
   </header>)
}

