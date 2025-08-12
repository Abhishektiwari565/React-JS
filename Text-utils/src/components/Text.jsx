import { useState } from 'react'
import './Text.css'

export default function Text() {
    //--------------------------------state------------------------------------------------------------------ 
    const [text, setText] = useState("");
    const [length, setLength] = useState(0);
    const [wordsLength,setWordsLength]=useState(0);
    const [upper,setUpper]=useState("")
    const [lower,setLower]=useState("")
    const [timeToRead,setTimeToRead]=useState(0)
    // ---------------------------------handler function-------------------------------------------------------
    const handletText = (e) => setText(e.target.value);
    const handleLength = () => setLength(text.length);
   
    const handleWordsLength=()=>{
        const words=text.split(" ")
        setWordsLength(words.length);
    }

     const handleUppercase=()=>
     {
    const newWords=text.toUpperCase()
    setUpper(newWords);
     }

     const handleLowercase=()=>{
        setLower(text.toLowerCase());
     }

     const handleTime=()=>{
      const time=  wordsLength/200;
    setTimeToRead(time.toFixed(2));
     }
    return (
        <div>
            <input type="text" value={text} placeholder="Enter something..." onChange={handletText} />
            <button onClick={() => {
                handleLength();
                handleWordsLength();
                handleUppercase();
                handleLowercase();
                handleTime();
            }}>Add</button>
            <hr />
            
                <h3>Text Length:{length}</h3>
                <h3>Total words:{wordsLength}</h3>
                <h3>upperCase:{upper}</h3>
                <h3>lowercase:{lower}</h3>
                <h3>Estimated Reading Time:{timeToRead}</h3>
            
        </div>
    )
}