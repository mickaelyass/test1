import { useState } from "react";


const Home =()=>{

    // Liste de citations
    const citations = [
        { text: 'Le savoir est une arme.', auteur: 'Victor Hugo', couleur: 'blue' },
        { text: 'Rêve grand, travaille dur.', auteur: 'Anonyme', couleur: 'green' },
        { text: 'Sois le changement que tu veux voir.', auteur: 'Gandhi', couleur: 'purple' },
        { text: 'Le succès est la somme de petits efforts répétés.', auteur: 'Anonyme', couleur: 'orange' },
      ];

 // State pour garder l'index de la citation affichée
  const [indexActuel, setIndexActuel] = useState(0);

  // Fonction pour passer à la citation suivante
  const citationSuivante = () => {
    setIndexActuel((prevIndex) => (prevIndex + 1) % citations.length);
  };

  // Récupère la citation en cours
  const citation = citations[indexActuel];

    return(
        <div className="min-h-screen flex items-center justify-center  p-4" style={{ backgroundColor: citation.couleur }}>
        <div
          className="w-[400px] h-[300px] p-8 rounded-2xl shadow-2xl  flex flex-col justify-between transition duration-500"
          style={{ backgroundColor: 'white', color: citation.couleur }}
        >
          <div id="quote-box">
            <p  id="text" className="text-xl mb-4 text-center font-semibold italic">"{citation.text}"</p>
            <p  id="author" className="text-base mb-16 text-center font-medium">— {citation.auteur}</p> 
            
        <a href="twitter.com/intent/tweet" id="tweet-quote" className="  px-2  py-1 justify-start rounded-lg text-white" style={{ backgroundColor: citation.couleur }}target="_blank" rel="noopener noreferrer">Tw</a>

        <a href="https://www.facebook.com/sharer/sharer.php?u=example.org" className=" mx-2 py-1 px-2 rounded-lg justify-start text-white" style={{ backgroundColor: citation.couleur }} target="_blank" rel="noopener noreferrer"> Fa</a>
          <button
            onClick={citationSuivante} style={{ backgroundColor:citation.couleur , color: 'white' }} id="new-quote"
            className=" ml-44 px-3 py-1 rounded-lg  justify-end font-medium hover:bg-gray-200"
          >
            Citation suivante
          </button>

          </div>
         
        </div>
      </div>
      
    )
}
export default Home;