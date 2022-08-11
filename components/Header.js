import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


export default function Header() {


   return (<header>
      <ul className="left">
         <li className="home-link-wrapper">
            <Link href='/' className="home-link">
               <><FontAwesomeIcon icon={faCoffee} /> <p id="home-link-text">Tea Blog</p></>
            </Link>
            </li>
         <li>Article List</li>
         <li>Random Article</li>
      </ul>
   </header>)
}

