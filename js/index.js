/**
 * Example 3
 * Get data from https://swapi.dev/api/people/1/ using Async Await
 */

console.log("JavaScript is working!");

/**
 * Async function to get the data from the api
 * @returns - returns a promise
 */
async function getData(url) {
  try {
    let response = await fetch(url);
    let sporter = await response.json();
    return sporter;
  } catch (err) {
    console.error("Error: ", err);
  }
}

async function getUserInput() {
  const domElement = document.getElementById("content");
  domElement.innerHTML = '';
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
  let name = ''
  if (lastname !== '') {
    name = `${firstname}%20${lastname}`;
  } else {
    name = `${firstname}`
  }
  
  const players = await getData(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
  if (players.player !== null) {
    players.player.forEach((player) => {
      //DIV
      const div = document.createElement("div");
      div.className = "border center row"

      //LEFTDIV
      const leftDiv = document.createElement("div");
      leftDiv.className = "column"
      div.append(leftDiv);

      //RIGHTDIV
      const rightDiv = document.createElement("div");
      rightDiv.className = "column"
      div.append(rightDiv);

      //H1
      const h1 = document.createElement("h1");
      h1.innerHTML = `${player.strPlayer}`;
      leftDiv.append(h1);
      //IMG
      const img = document.createElement("img");
      img.src = player.strThumb;
      img.className = "image";
      img.alt = "geen afbeelding beschikbaar"
      leftDiv.append(img);

      //H1
      const h1_2 = document.createElement("h1");
      h1_2.innerHTML = "eigenschappen";
      rightDiv.append(h1_2);

      //Table
      const table = document.createElement("table");
      rightDiv.append(table);

      makeTableRow('Sport:', player.strSport, table)
      makeTableRow('Lengte:', player.strHeight, table)
      makeTableRow('Rugnummer:', player.strNumber, table)
      makeTableRow('voorkeursvoet:', player.strSide, table)
      makeTableRow('Land:', player.strNationality, table)
      makeTableRow('Positie:', player.strPosition, table)
      makeTableRow('Team:', player.strTeam, table)

      domElement.append(div);

      //BR
      const br = document.createElement("br");
      domElement.append(br);
    });
  } else {
    //DIV
    const div = document.createElement("div");
    div.className = "border center row"
    domElement.append(div);

    //H1
    const h1 = document.createElement("h1");
    h1.innerHTML = "We hebben helaas geen matchende sporter kunnen vinden<br> Probeer gerust om een ander sporter te zoeken";
    div.append(h1);
  }
}

function makeTableRow(attribute, data, append) {
  //tr
  const tr = document.createElement("tr");
  append.append(tr);
  //td1
  const td1 = document.createElement("td");
  td1.innerHTML = attribute;
  tr.append(td1);
  //td2
  const td2 = document.createElement("td");
  td2.innerHTML = data;
  tr.append(td2);
}