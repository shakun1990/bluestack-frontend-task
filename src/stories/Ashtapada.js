import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Ashtapada(props) {
  const n = props.n;  
  const [matrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));
  const handleClick = (row, column, event) => {
    event.target.className = '';
    event.target.className = 'new';
    const newNodesLength = document.querySelectorAll(".new").length;
    const allNodesLength = document.getElementsByTagName("td").length;
    if(newNodesLength == allNodesLength){
        clearInterval(interval)
        alert("You Win");
    }
  };

  useEffect(() => {
    const coloredNodes = document.querySelectorAll(".new");
    const coloredNodesArray = Array.from(coloredNodes);
    if(coloredNodesArray.length > 0) {
      for(let k= 1; k <=props.y; k++) {
        coloredNodesArray[k].removeAttribute('class');
        coloredNodesArray[k].classList.add('active');
      }
    }
  });


  let interval = setInterval(() => {  
    const coloredNodes = document.querySelectorAll(".new");
    const coloredNodesArray = Array.from(coloredNodes)
    if(!coloredNodesArray.length){
      clearInterval(interval)
      alert("You Lose");
    } else {
      document.querySelector(".new").className = 'active'; 
    }
  }, props.z * 1000);

  return (
    <div className="sheet">
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td className="new" key={columnIndex} onClick={e => handleClick(rowIndex, columnIndex, e)}>                  
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};