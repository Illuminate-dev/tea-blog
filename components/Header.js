import { faCoffee, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeContext } from "../lib/theme";

export default function Header() {

   const { theme, setTheme } = useThemeContext();

   const [ icon, setIcon ] = useState(theme === "light" ? faMoon : faSun);

   const themeClickedCallback = () => {
      setTheme(theme === "light" ? "dark" : "light");
      setIcon(theme === "light" ? faSun : faMoon);
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
         <li>Article List</li>
         <li>Random Article</li>
      </ul>
      <div className="right themeButtonWrapper">
         <FontAwesomeIcon icon={icon} className="themeButton" onClick={themeClickedCallback}/>
      </div>
   </header>)
}

