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
    let character = await response.json();
    return character;
  } catch (err) {
    console.error("Error: ", err);
  }
}

async function getUserInput() {
    const domElement = document.getElementById("content");
    const firstname = document.getElementById("fname").value;
    const lastname = document.getElementById("lname").value;
    let name = ''
    if (lastname !== '') {
        name = `${firstname}%20${lastname}`;
    } else {
        name = `${firstname}` 
    }
    const players = await getData(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
    console.log(players);
    for (let i = 0; i < players.length; i++) {
        const div = document.createElement("li");
        const p = document.createElement("p")
        p.innerHTML = player.strPlayer
        p.append(div)
        div.append(domElement);
      }

}
