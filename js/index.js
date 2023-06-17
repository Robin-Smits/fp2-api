/**
 * Async function to get the data from the given URL
 * @param {*} url link to the api you want to use
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

/**
 * Gets the input from the user out of the searchbar, sends the request to the api & uses the applyData function to display it
 */
async function getUserInput() {
  const firstname = document.getElementById("fname").value.trim();
  const lastname = document.getElementById("lname").value.trim();
  if (firstname == '' & lastname == '') {
    const domElement = document.getElementById("content");
    domElement.innerHTML = '';
    //DIV
    const div = document.createElement("div");
    div.className = "border center row"
    domElement.append(div);

    //H1
    const h1 = document.createElement("h1");
    h1.innerHTML = "U heeft geen naam van een sporter in gevult, vul eerst een naam in voordat u probeert te zoeken";
    div.append(h1);
  } else {
    let name = ''
    if (lastname !== '') {
      name = `${firstname}%20${lastname}`;
    } else {
      name = `${firstname}`
    }
  
    const players = await getData(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
    applyData(players)
  }
}

/**
 * Funtion that uses te recieved data to display it on the page
 * @param {*} players data to display
 */
function applyData(players) {
  const domElement = document.getElementById("content");
  domElement.innerHTML = '';

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
/**
 * Funtion helps build a table with info and a value
 * @param {*} attribute statistic name you want to display
 * @param {*} data statistic value you want to display
 * @param {*} append the item where it needs to append to
 */
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