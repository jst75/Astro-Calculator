var planets = [ 
    ['Pluto', 0.06], 
    ['Neptune', 1.148], 
    ['Uranus', 0.917], 
    ['Saturn', 1.139], 
    ['Jupiter', 2.640], 
    ['Mars', 0.3895], 
    ['Moon', 0.1655], 
    ['Earth', 1], 
    ['Venus', 0.9032], 
    ['Mercury', 0.377], 
    ['Sun', 27.9] 
];
planets.reverse();
const planetTag = document.getElementById("planets");
planets.forEach(function(elem) {
    var newPlanet = document.createElement("option");
    newPlanet.setAttribute("value",elem[0]);
    newPlanet.text = elem[0];
    planetTag.appendChild(newPlanet);
});
function calculateWeight(weight, planetName) { 
    const planet = planets.find(p => p[0] === planetName);
    const multiplier = planet ? planet[1] : 0;
    return weight * multiplier;
} 
function handleClickEvent(e) {
    var userWeight = Number(document.getElementById("user-weight").value);
    if (userWeight == isNaN) return;
    const planetName = document.getElementById("planets").selectedOptions[0].text;
    var result = calculateWeight(userWeight,planetName);
    console.log(result);
    const displayText = "If you were on " + planetName + ", you would weigh " + result + "lbs!";
    document.getElementById("output").innerHTML = displayText;
} 
document.getElementById("calculate-button").onclick = handleClickEvent;