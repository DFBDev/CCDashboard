import './App.css'
import { useEffect } from 'react';

function App() {
  async function loadData () {
      const resultsContainer: HTMLElement | null = document.querySelector("#tbody");

      //Clearing any content currently in resultsContainer.
      if (resultsContainer?.hasChildNodes) {
        resultsContainer.innerHTML = '';
      }

      //Adding preloader text to appDiv to indicate that server is starting/data is being fetched.
      const preloaderText: Text | null = document.createTextNode("Please wait! Starting server and/or fetching results...");
      resultsContainer?.appendChild(preloaderText);
  
      //Sending GET request.
      const res = await fetch("https://ts-be.onrender.com/test/get", {method: "GET"});
      const resBody = await res.json();

      //Removing preload text once response is received.
      resultsContainer?.removeChild(preloaderText);
      
      for (let i = 0; i < resBody.length; i++) {
        //Creating new element and appending to appDiv everytime refresh button is clicked.
        const recordBox: HTMLElement | null = document.createElement("tr");
        const val1Element: HTMLElement | null = document.createElement("td");
        const val2Element: HTMLElement | null = document.createElement("td");
        const val3Element: HTMLElement | null = document.createElement("td");
        const val1TextNode: Text | null = document.createTextNode(resBody[i].value1);
        const val2TextNode: Text | null = document.createTextNode(resBody[i].value2);
        const val3TextNode: Text | null = document.createTextNode(resBody[i].value3);
        recordBox.setAttribute("class", "recordBox");
        val1Element.setAttribute("class", "val1Box");
        val2Element.setAttribute("class", "val2Box");
        val3Element.setAttribute("class", "val3Box");
        val1Element.appendChild(val1TextNode);
        val2Element.appendChild(val2TextNode);
        val3Element.appendChild(val3TextNode);
        recordBox?.appendChild(val2Element);
        recordBox?.appendChild(val1Element);
        recordBox?.appendChild(val3Element);
        resultsContainer?.appendChild(recordBox);
      }
  }
  useEffect(() => {
    const refreshButton: HTMLElement | null = document.querySelector("#refreshButton");
    loadData();
    refreshButton?.addEventListener("click", () => {
      loadData();
    })
  }, [])
  return (
    <div id="appDiv">
      <div id="tableHeader">
        TSDashboard
        <button id="refreshButton">
          <img id='refreshIMG' src="./refresh.png"></img>
        </button>
      </div>
      <table id='dataTable'>
        <thead id="thead">
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Problem Description</th>
          </tr>
        </thead>
        <tbody id="tbody">
        </tbody>
      </table>
    </div>
  )
}

export default App
