import { useState } from "react";
import { marked } from 'marked'

const Home =()=>{

  

const [message, setMessage] = useState(`Titre principal :\n

Sous-titre : \n

un [lien]:(https://www.google.com)\n

un  ligne :\n


Bloc de code ici : \n


- Item 1
- Item 2

 une citation :\n

![Image] :(https://via.placeholder.com/150)\n

**Texte en gras**
  `);

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      

        <form>
          <label htmlFor="editot text-2lx ">Message</label><br />
          <textarea id="editor"  className="w-full h-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Écrivez votre message ici..."
            rows="10" cols='50' >
           
          </textarea>
        </form>
        <div className="flex items-center  flex-col w-2/3 justify-center mt-4 ">
        <h2>Preview</h2>
        <div id='preview'  className="bg-slate-400 p-4 w-full "
         dangerouslySetInnerHTML={{ __html: marked(message) }}></div>
        </div>
        
      </div>
      
    )
}
export default Home;