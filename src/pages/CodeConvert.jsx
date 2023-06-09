import React, { useState } from "react";
import axios from "axios";
import LinearIndeterminate from "../components/LinearIndeterminate";
import Alert from '@mui/material/Alert';
import logo from './aiimg.png';


function Codeswaper() {
 
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
 
  const [selectedLeftLanguage, setSelectedLeftLanguage] = useState("csharp");
  const [selectedRightLanguage, setSelectedRightLanguage] = useState("python");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const MAX_LENGTH = 2000;
  const handleswap = async () => {
    try {

      if (leftText === "") 
      {
        alert("Please paste code")
        return;
      }
      setIsLoading(true);
      setError(false);
      const data = {
        selectedLeftLanguage: selectedLeftLanguage,
        selectedRightLanguage: selectedRightLanguage,
        leftText: leftText
      };
       
      const response = await axios.post('https://syntaxswapper.azurewebsites.net/api/syntaxswapper', data);
    

      setRightText(response.data.choices[0].text);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
setError(true);
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rightText);
  };

  const handleClear =() => {
    setRightText("");
    setLeftText("");
  }

  const handlLeftTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= MAX_LENGTH) {
    
      setLeftText(newText);
    }
  };

  return (
  <div>
              <div>
      {isLoading ? <LinearIndeterminate /> : <p></p>}  
      </div>

    <div className="container">
      
        <div className="intro-text">
        { isError &&
       
            <Alert  onClose={() => { setError(false)}} severity="error">Error occured swaping. Please try again later.</Alert>
           
        }
      </div>
        <div className="intro-text">
        <img src={logo} alt="Logo" width={120} height={120} />
    <p><b>Welcome to Syntax Swapper! Swap one programming language with AI for FREE!</b><br></br><br></br>
     &#128073; To swap one language to another, select the programming language and paste the code on the left side <br></br><br></br>
     Select the programming language you wish to be swaped, and press swap<br></br>
     <br></br>&#x1F4A1; You can also type a piece of code you wish to generate like fibonacci, recurssive function, etc. on your selected language.</p>
  </div>
        <div className="text-area-container">
          
        <select className="dropdown"
         value={selectedLeftLanguage}
         onChange={(event) => setSelectedLeftLanguage(event.target.value)}>
<option value="abap">ABAP</option>
<option value="ada">ADA</option>
<option value="bash">Bash</option>
<option value="c">C</option>
<option value="cplusplus">C++</option>
<option value="csharp">C#</option>
<option value="cobol">Cobol</option>
<option value="dart">Dart</option>
<option value="erlang">Erlang</option>
<option value="fsharp">F#</option>
<option value="golang">Golang</option>
<option value="groovy">Groovy</option>
<option value="java">Java</option>
<option value="jscript">JavaScript</option>
<option value="julia">Julia</option>
<option value="kotlin">Kotlin</option>
<option value="lisp">Lisp</option>
<option value="lua">Lua</option>
<option value="objective">Objective-C</option>
<option value="perl">Perl</option>
<option value="php">PHP</option>
<option value="prolog">Prolog</option>
<option value="python">Python</option>
<option value="rpg">RPG</option>
<option value="ruby">Ruby</option>
<option value="rust">Rust</option>
<option value="sas">SASA</option>
<option value="scala">Scala</option>
<option value="sol">Solidity</option>
<option value="swift">Swift</option>
<option value="vbnet">VB.NET</option>
          

      </select>
      <textarea id="leftTextarea"
          value={leftText}
          onChange={handlLeftTextChange}
          placeholder="Paste/type your code here. Limit to 2000 characters only" className="text-area"></textarea>
        </div>
    
      
        <div className="arrow-container"> {/* Add this div */}
  <span className="arrow">➡️</span>
        </div>
        
    <div className="text-area-container">
      <select className="dropdown"   id="rightLanguage"
            value={selectedRightLanguage}
            onChange={(event) => setSelectedRightLanguage(event.target.value)}>
      <option value="abap">ABAP</option>
<option value="ada">ADA</option>
<option value="bash">Bash</option>
<option value="c">C</option>
<option value="cplusplus">C++</option>
<option value="csharp">C#</option>
<option value="cobol">Cobol</option>
<option value="dart">Dart</option>
<option value="erlang">Erlang</option>
<option value="fsharp">F#</option>
<option value="golang">Golang</option>
<option value="groovy">Groovy</option>
<option value="java">Java</option>
<option value="jscript">JavaScript</option>
<option value="julia">Julia</option>
<option value="kotlin">Kotlin</option>
<option value="lisp">Lisp</option>
<option value="lua">Lua</option>
<option value="objective">Objective-C</option>
<option value="perl">Perl</option>
<option value="php">PHP</option>
<option value="prolog">Prolog</option>
<option value="python">Python</option>
<option value="rpg">RPG</option>
<option value="ruby">Ruby</option>
<option value="rust">Rust</option>
<option value="sas">SASA</option>
<option value="scala">Scala</option>
<option value="sol">Solidity</option>
<option value="swift">Swift</option>
            <option value="vbnet">VB.NET</option>
            
      </select>
        <textarea className="text-area"
          id="rightTextarea"
          value={rightText}
          readOnly
          placeholder="Swaped code goes here"></textarea>
        </div>
        <div className="charlen-container"> 
        <span className="charlen">{MAX_LENGTH - leftText.length} characters left</span>
        </div>
    <div className="button-container">
      <button className="button" onClick={handleswap}>Swap</button>
      <button className="button" onClick={handleClear}>Clear</button>
      <button className="button copy" onClick={handleCopy}>Copy</button>
    </div>
  </div>
  </div>
    
);
}



export default Codeswaper;
