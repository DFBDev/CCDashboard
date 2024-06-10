import './App.css'
import { useEffect } from 'react';

function App() {
  async function loadData () {
      const resultsContainer: HTMLElement | null = document.querySelector("#tbody");
      const authKey: string | null = sessionStorage.getItem("authKey");

      //Clearing any content currently in resultsContainer.
      if (resultsContainer?.hasChildNodes) {
        resultsContainer.innerHTML = '';
      }

      //Adding preloader text to appDiv to indicate that server is starting/data is being fetched.
      const preloaderText: Text | null = document.createTextNode("Please wait! Starting server and/or fetching results...");
      resultsContainer?.appendChild(preloaderText);
  
      //Sending GET request.
      const res = await fetch("https://ts-be.onrender.com/actions/DLS2a&l@azLq52&OSE0i", {method: "GET", headers: {"Authorization": authKey!}});
      const resBody = await res.json();

      if (resBody.status == "INVALID AUTHKEY") {
        window.location.replace("https://dfbdev.github.io/CCDL/");
      }
      //Removing preload text once response is received.
      resultsContainer?.removeChild(preloaderText);
      
      for (let i = 0; i < resBody.length; i++) {
        //Creating new element and appending to appDiv everytime refresh button is clicked.
        const recordBox: HTMLElement | null = document.createElement("tr");
        const val1Element: HTMLElement | null = document.createElement("td");
        const val2Element: HTMLElement | null = document.createElement("td");
        const val3Element: HTMLElement | null = document.createElement("td");
        const val4Element: HTMLElement | null = document.createElement("td");
        const val5Element: HTMLElement | null = document.createElement("td");
        const val6Element: HTMLElement | null = document.createElement("td");
        const val7Element: HTMLElement | null = document.createElement("td");
        const val1TextNode: Text | null = document.createTextNode(resBody[i].value1);
        const val2TextNode: Text | null = document.createTextNode(resBody[i].value2);
        const val3TextNode: Text | null = document.createTextNode(resBody[i].value3);
        const val4TextNode: Text | null = document.createTextNode(resBody[i].value4);
        const val5TextNode: Text | null = document.createTextNode(resBody[i].value5);
        const val6TextNode: Text | null = document.createTextNode(resBody[i].value6);
        const val7TextNode: Text | null = document.createTextNode(resBody[i].value7);
        recordBox.setAttribute("class", "recordBox");
        val1Element.setAttribute("class", "val1Box");
        val2Element.setAttribute("class", "val2Box");
        val3Element.setAttribute("class", "val3Box");
        val4Element.setAttribute("class", "val4Box");
        val5Element.setAttribute("class", "val5Box");
        val6Element.setAttribute("class", "val6Box");
        val7Element.setAttribute("class", "val7Box");
        val1Element.appendChild(val1TextNode);
        val2Element.appendChild(val2TextNode);
        val3Element.appendChild(val3TextNode);
        val4Element.appendChild(val4TextNode);
        val5Element.appendChild(val5TextNode);
        val6Element.appendChild(val6TextNode);
        val7Element.appendChild(val7TextNode);
        recordBox?.appendChild(val1Element);
        recordBox?.appendChild(val2Element);
        recordBox?.appendChild(val3Element);
        recordBox?.appendChild(val4Element);
        recordBox?.appendChild(val5Element);
        recordBox?.appendChild(val6Element);
        recordBox?.appendChild(val7Element);
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
            <th>Dial #</th>
            <th>Conv. #</th>
            <th>Appt. Set</th>
            <th>Appt. Complete</th>
            <th>TS</th>
          </tr>
        </thead>
        <tbody id="tbody">
        </tbody>
      </table>
    </div>
  )
}

export default App
