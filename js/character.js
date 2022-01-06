// Define Character
var abilitys = [1, 2, 3, 2, 2, 1];
var skills = 
[
    1,
    0,
    1,
    0,
    2,
    0,
    0,
    1,
    0,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0
];
var soak = 3;
var wounds = [11, 0];
var strain = [12, 0];
var deffense = [0, 0];

// Define Constants
var skillAbilitys = 
[abilitys[2],abilitys[0],abilitys[5],abilitys[4],abilitys[2],abilitys[5],abilitys[1],abilitys[3],abilitys[4],abilitys[5],abilitys[2],abilitys[2],abilitys[5],abilitys[3],abilitys[1],abilitys[1],abilitys[0],abilitys[3],abilitys[1],abilitys[3],abilitys[3],abilitys[4],abilitys[0],abilitys[1],abilitys[0],abilitys[1],abilitys[1],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2]]
var skillNames = 
[
    "Astrogation (Int)","Athletics (Br)","Charm (Pr)","Coercion (Will)","Computers (Int)","Cool (Pr)","Coordination (Ag)","Deception (Cun)","Discipline (Will)", "Leadership (Pr)","Mechanics (Int)","Medicine (Int)","Negotiaion (Pr)","Perception (Cun)","Piloting - Planetary (Ag)","Piloting - Space (Ag)","Resilience (Br)",         "Skulduggery (Cun)",      "Stealth (Ag)",           "Streetwise (Cun)",        "Survival (Cun)",          "Vigilance (Will)",   "Brawl (Br)","Gunnery (Ag)","Melee (Br)","Ranged - Light (Ag)","Ranged - Heavy (Ag)","Core Worlds (Int)","Education (Int)","Lore (Int)","Outer Rim (Int)","Underworld (Int)","Warfare (Int)","Xenology (Int)"
]


var currentSkillSelected = 0;
document.querySelector('#rollBtn').onclick = rollCheck;
init();
function init()
{
    var skillboxes = document.querySelectorAll(".skillsList li");
    var rollPopup = document.querySelector('#rollPopup');
    rollPopup.onmouseover = function(){mouseOverRollPopup = true};
    for (let i = 0; i < skillboxes.length; i++) 
    {
        var elm = skillboxes[i];
        elm.setAttribute("data-indexID", i);
        elm.onclick = function(e){var foo = this.getAttribute("data-indexID"); showRollPopup(e, foo);};
        elm.onmouseout = hideRollPopup;
    }
    rollPopup.onmouseout = mouseLeftRollPopup;

    // Fill in abilitys
    var abilityBoxes = document.querySelectorAll('.statsBox h1');
    for (let i = 0; i < abilityBoxes.length; i++) 
    {
        var elm = abilityBoxes[i];
        elm.innerHTML = abilitys[i];
    }

    // Auto add ▰▰▱▱▱
    var rollerListElements = document.querySelectorAll('ul[class="skillsList"] li');
    for (let i = 0; i < skills.length; i++) 
    {
        var elm = rollerListElements[i];
        var text = "";
        for (let a = 0; a < skills[i]; a++) 
        {
            text = text + "▰";
        }
        
        for (let b = 0; b < (5 - skills[i]); b++) 
        {
            text = text + "▱";
        }
        elm.innerHTML = elm.innerHTML + text;
    }
    document.getElementById("defaultOpen").click();

    document.querySelector('#soakBox h1').innerHTML = soak;
    document.querySelector('#rangedD h1').innerHTML = deffense[0];
    document.querySelector('#meleeD h1').innerHTML = deffense[1];
    
    document.querySelector('.box1 div h1').innerHTML = wounds[1];
    document.querySelector('.box1 div h1[class="2"]').innerHTML = wounds[0];
    
    document.querySelector('.box2 div h1').innerHTML = strain[1];
    document.querySelector('.box2 div h1[class="2"]').innerHTML = strain[0];
    
    document.querySelector(".diceResult").style.right = "-300pt";
}
var mouseOverRollPopup = false;

function mouseLeftRollPopup()
{
    mouseOverRollPopup = false;
    hideRollPopup();
}

function showRollPopup(e, i)
{
    currentSkillSelected = i;
    var popup = document.querySelector('#rollPopup');
    console.log("Y: " + e.screenY);
    if (e.screenY < 100) 
    {
        popup.style.bottom = "";
        popup.style.top = (e.screenY + 20 + document.documentElement.scrollTop) + "px";
    }
    else
    {
        popup.style.top = "";
        popup.style.bottom = ((window.innerHeight - e.screenY) - 20 - document.documentElement.scrollTop) + "px";
    }
    popup.style.left = e.screenX + "px";
    popup.style.display = 'block';
}

function hideRollPopup(e)
{
    setTimeout(function() 
    {
        if (!mouseOverRollPopup) 
        {
            var popup = document.querySelector('#rollPopup');
            popup.style.display = 'none';        
        }
    }, 1);
}

function rollCheck()
{
    mouseOverRollPopup = false;
    hideRollPopup();

    var proficency = skills[currentSkillSelected]; // TODO: make based on skill
    var _ability = skillAbilitys[currentSkillSelected]; // TODO: Make based on ability - skill
    _ability = _ability - proficency;

    var pool = [];
    pool.proficency = proficency;
    pool.ability = _ability;

    pool.boost = document.querySelector('#boost').value;
    pool.dificulty = document.querySelector('#dificulty').value;
    pool.challenge = document.querySelector('#challenge').value;
    pool.setback = document.querySelector('#setback').value;

    var results = roll(pool);
    displayRollResult(results);
}

function openTab(evt, cityName) 
{
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
    {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) 
    {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function removeAllChildNodes(parent) 
{
    while (parent.firstChild) 
    {
        parent.removeChild(parent.firstChild);
    }
}

function displayRollResult(results)
{
    var time = 1
    if (document.querySelector(".diceResult").style.right != "-300pt") 
    {
        document.querySelector(".diceResult").style.animationPlayState = 'paused';
        document.querySelector(".diceResult").style.animationName = 'animate-popout-right';
        document.querySelector(".diceResult").style.animationPlayState = 'running';
        document.querySelector(".diceResult").style.right = "-300pt";
        time = 500;
    }
    setTimeout(function() 
    {        
        removeAllChildNodes(document.querySelector(".diceResult div"));
        for (let i = 0; i < results.sucsess; i++)
        {                       
            var img = document.createElement("img");
            img.src = "images/success.png";
            document.querySelector(".diceResult div").appendChild(img);
        }
        
        for (let i = 0; i < results.failure; i++)
        {                       
            var img = document.createElement("img");
            img.src = "images/failure.png";
            document.querySelector(".diceResult div").appendChild(img);
        }
    
        for (let i = 0; i < results.advantage; i++)
        {                       
            var img = document.createElement("img");
            img.src = "images/advantage.png";
            document.querySelector(".diceResult div").appendChild(img);
        }
        
        for (let i = 0; i < results.disadvantage; i++)
        {                       
            var img = document.createElement("img");
            img.src = "images/disadvantage.png";
            document.querySelector(".diceResult div").appendChild(img);
        }
        
        for (let i = 0; i < results.triumph; i++)
        {                       
            var img = document.createElement("img");
            img.src = "images/triumph.png";
            document.querySelector(".diceResult div").appendChild(img);
        }
        
        for (let i = 0; i < results.despair; i++)
        {                       
            var img = document.createElement("img");
            img.src = "images/despair.png";
            document.querySelector(".diceResult div").appendChild(img);
        }

        document.querySelector('.diceResult b').innerHTML = skillNames[currentSkillSelected];
        console.log("Current Skill: " + currentSkillSelected);

        var resultsText = document.querySelector('.diceResult p');
        resultsText.innerHTML = "";
        if (results.sucsess > 0) 
        {
            resultsText.innerHTML = resultsText.innerHTML + (results.sucsess + " success");
        }
        if (results.failure > 0) 
        {
            if (resultsText.innerHTML != ""){resultsText.innerHTML = resultsText.innerHTML + ", "};
            resultsText.innerHTML = resultsText.innerHTML + (results.failure + " failure");
        }
        if (results.advantage > 0) 
        {
            if (resultsText.innerHTML != ""){resultsText.innerHTML = resultsText.innerHTML + ", "};
            resultsText.innerHTML = resultsText.innerHTML + (results.advantage + " advantage");
        }
        if (results.disadvantage > 0) 
        {
            if (resultsText.innerHTML != ""){resultsText.innerHTML = resultsText.innerHTML + ", "};
            resultsText.innerHTML = resultsText.innerHTML + (results.disadvantage + " disadvantage");
        }
        if (results.triumph > 0) 
        {
            if (resultsText.innerHTML != ""){resultsText.innerHTML = resultsText.innerHTML + ", "};
            resultsText.innerHTML = resultsText.innerHTML + (results.triumph + " triumph");
        }
        if (results.despair > 0) 
        {
            if (resultsText.innerHTML != ""){resultsText.innerHTML = resultsText.innerHTML + ", "};
            resultsText.innerHTML = resultsText.innerHTML + (results.despair + " despair");
        }
        
        document.querySelector(".diceResult").style.animationName = 'animate-popin-right';
        document.querySelector(".diceResult").style.animationPlayState = 'running';
        document.querySelector(".diceResult").style.right = "25pt";
        
        setTimeout(function() 
        {
            document.querySelector(".diceResult").style.animationPlayState = 'paused';
            document.querySelector(".diceResult").style.animationName = 'animate-popout-right';
            
            document.querySelector(".diceResult").onclick = function()
            {
                document.querySelector(".diceResult").style.animationPlayState = 'running';
                document.querySelector(".diceResult").style.right = "-300pt";
            };
            
        }, 500); // the time of the animation
    
    }, time); // the time of the animation
}
