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
var weapons = 
[
    ["Shock Prod", 22, 0, 5, "Engaged", "Stun 3"],
    ["Fusion Cutter", 22, 5, 3, "Engaged", "Breach 1, Burn 3, Vicious 3"]
];
var equipment = 
[
    ["Commlink", "handheld", "186"],
    ["Fusion Cutter", "Can me used as weapon", "197"],
    ["Circular Saw", "", ""],
    ["Fire Extinguisher", "Doubles as smokescreen", ""],
    ["Electrobinoculars", "-<span class=\"setbackIcon\"></span> on Perception checks", "190"],
    ["Toolkit", "", "198"],
    ["Liquid-Cable Launcher", "+<span class=\"boostIcon\"></span> on climbing", ""],
    ["Liquid-Cable Launcher", "+<span class=\"boostIcon\"></span> on climbing", ""],
    ["Periscope", "", ""]
];
var credits = 0;
var xp = [0, 0];
var characterName = "BB-X3 'Exy'"

// Define Constants
var skillAbilitys = 
[abilitys[2],abilitys[0],abilitys[5],abilitys[4],abilitys[2],abilitys[5],abilitys[1],abilitys[3],abilitys[4],abilitys[5],abilitys[2],abilitys[2],abilitys[5],abilitys[3],abilitys[1],abilitys[1],abilitys[0],abilitys[3],abilitys[1],abilitys[3],abilitys[3],abilitys[4],abilitys[0],abilitys[1],abilitys[0],abilitys[1],abilitys[1],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2]]
var skillNames = 
[
    "Astrogation (Int)","Athletics (Br)","Charm (Pr)","Coercion (Will)","Computers (Int)","Cool (Pr)","Coordination (Ag)","Deception (Cun)","Discipline (Will)", "Leadership (Pr)","Mechanics (Int)","Medicine (Int)","Negotiaion (Pr)","Perception (Cun)","Piloting - Planetary (Ag)","Piloting - Space (Ag)","Resilience (Br)",         "Skulduggery (Cun)",      "Stealth (Ag)",           "Streetwise (Cun)",        "Survival (Cun)",          "Vigilance (Will)",   "Brawl (Br)","Gunnery (Ag)","Melee (Br)","Ranged - Light (Ag)","Ranged - Heavy (Ag)","Core Worlds (Int)","Education (Int)","Lore (Int)","Outer Rim (Int)","Underworld (Int)","Warfare (Int)","Xenology (Int)"
];

var creditsBox = document.querySelector("#Inventory input");

function addTD(parent, value)
{
    var td = document.createElement("td");
    td.innerHTML = value;
    parent.appendChild(td);
}

var currentSkillSelected = 0;
document.querySelector('#rollBtn').onclick = rollCheck;
init();
function init()
{
    // Load saved values
    if (localStorage.getItem("currentWounds") == 'null')
    {
        wounds[1] = 0;        
    }
    else
    {        
        wounds[1] = localStorage.getItem("currentWounds");
    }

    if (localStorage.getItem("currentStrain") == 'null')
    {
        strain[1] = 0;        
    }
    else
    {        
        strain[1] = localStorage.getItem("currentStrain");
    }

    if (localStorage.getItem("credits") == 'null')
    {
        credits = 0;        
    }
    else
    {        
        credits = localStorage.getItem("credits");
        creditsBox.value = credits;
    }

    if (localStorage.getItem("otherItems") == 'null')
    {
    }
    else
    {        
        document.querySelector("#inventory-otherItems").innerHTML = localStorage.getItem("otherItems");
    }

    if (localStorage.getItem("xp_0") == 'null')
    {     
        xp[0] = 0;
    }
    else
    {        
        xp[0] = localStorage.getItem("xp_0");
    }

    if (localStorage.getItem("xp_1") == null)
    {     
        xp[1] = 0;
    }
    else
    {        
        xp[1] = localStorage.getItem("xp_1");
    }

    if (localStorage.getItem("themeColor") == null)
    {     
    }
    else
    {        
        setThemeColor(localStorage.getItem("themeColor"));
        document.querySelector("#themeColorPicker").value = localStorage.getItem("themeColor");
    }

    if (localStorage.getItem("backgroundImage") == 'null')
    {     
    }
    else
    {        
        setBackgroundImage(localStorage.getItem("backgroundImage"));
        document.querySelector("#backgroundImagePicker").value = localStorage.getItem("themeColor");
    }

    var skillboxes = document.querySelectorAll(".skillsList li");
    var rollPopup = document.querySelector('#rollPopup');
    document.querySelector('title').innerHTML = characterName;
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

    // Fll in weapons
    var weaponsContainerDiv = document.querySelector("#weaponsTable");
    for (let i = 0; i < weapons.length; i++) 
    {
        var elm = weapons[i];
        var row = document.createElement("tr");
        row.classList.add("rollable");
        weaponsContainerDiv.appendChild(row);

        addTD(row, elm[0]);
        addTD(row, skillNames[elm[1]]);
        addTD(row, elm[2]);
        addTD(row, elm[3]);
        addTD(row, elm[4]);
        addTD(row, elm[5]);

        row.setAttribute("data-indexID", elm[1] );
        row.onclick = function(e){var foo = this.getAttribute("data-indexID"); showRollPopup(e, foo);};
    }

    // Fll in equipment
    var equipmentContainerDiv = document.querySelector("#equipment-table");
    for (let i = 0; i < equipment.length; i++) 
    {
        var elm = equipment[i];
        var row = document.createElement("tr");
        equipmentContainerDiv.appendChild(row);

        addTD(row, elm[0]);
        addTD(row, elm[1]);
        addTD(row, elm[2]);
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

    document.querySelector(".applyThemeColor").onclick = 
    function()
    {
        var color = document.querySelector("#themeColorPicker");
        setThemeColor(color.value);
    };

    document.querySelector(".applyBackground").onclick = 
    function()
    {
        var image = document.querySelector("#backgroundImagePicker");
        setBackgroundImage(image.value);
    };

    document.querySelector("#diceRoller").onclick = 
    function()
    {
        window.open("diceRoller.html", "", "width=600,height=785")
    };
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

healthInit();
function healthInit()
{
    document.querySelector('.box1 button[class="heal"]').onclick = woundsHeal;
    document.querySelector('.box1 button[class="heal"]').onmouseover = function(){woundMouseover('heal', true)};
    document.querySelector('.box1 button[class="heal"]').onmouseout = function(){woundMouseover('heal', false)};
    document.querySelector('.box1 button[class="Damage"]').onclick = woundsDammage;
    document.querySelector('.box1 button[class="Damage"]').onmouseover = function(){woundMouseover('damage', true)};
    document.querySelector('.box1 button[class="Damage"]').onmouseout = function(){woundMouseover('damage', false)};

    document.querySelector('.box2 button[class="heal"]').onclick = strainHeal;
    document.querySelector('.box2 button[class="Damage"]').onclick = strainDamage;
}

var woundCurrent = document.querySelector(".box1 div h1");
var strainCurrent = document.querySelector(".box2 div h1");

function woundMouseover(button, enter)
{
    var input = document.querySelector(".box1 input").value;
    if (!enter) 
    {
        woundCurrent.style.color = null;
        woundCurrent.style.fontSize = null;
        woundCurrent.innerHTML = wounds[1];
        return;
    }

    if ((input != null) && (input != 0) && (input != '0')) 
    {        
        if (button == 'heal') 
        {
            woundCurrent.style.color = "green";
            woundCurrent.innerHTML = input;
        }

        if (button == 'damage') 
        {
            woundCurrent.style.color = "red";
            woundCurrent.style.fontSize = "12pt";
            woundCurrent.innerHTML = wounds[1] + " +<br>" + (input + " - " + soak);
        }
    }
}

function woundsHeal()
{
    var input = document.querySelector(".box1 input").value;
    if (input > wounds[1]) 
    {
        wounds[1] = 0;
    }
    else
    {
        wounds[1] = wounds[1] - input;
    }

    localStorage.setItem("currentWounds", wounds[1]);

    document.querySelector(".box1 input").value = "";
    textboxEditEnd(woundCurrent, wounds[1]);
}

function woundsDammage()
{
    var input = document.querySelector(".box1 input").value;
    if (input > (wounds[0] - wounds[1])) 
    {
        wounds[1] = wounds[0];
    }
    else
    {
        wounds[1] = wounds[1] + Math.max(0, (parseInt(input, 10) - soak));
    }

    localStorage.setItem("currentWounds", wounds[1]);

    document.querySelector(".box1 input").value = "";
    textboxEditEnd(woundCurrent, wounds[1]);
}

function textboxEditEnd(box, val)
{
    box.style.color = null;
    box.style.fontSize = null;
    box.innerHTML = val;
}

function strainHeal()
{
    var input = document.querySelector(".box2 input").value;
    if (input > strain[1]) 
    {
        strain[1] = 0;
    }
    else
    {
        strain[1] = strain[1] - input;
    }

    localStorage.setItem("currentStrain", strain[1]);

    document.querySelector(".box2 input").value = "";
    textboxEditEnd(strainCurrent, strain[1]);
}

function strainDamage()
{
    var input = document.querySelector(".box2 input").value;
    if (input > (strain[0] - strain[1])) 
    {
        strain[1] = strain[0];
    }
    else
    {
        strain[1] = strain[1] + Math.max(0, (parseInt(input, 10)));
    }

    localStorage.setItem("currentStrain", strain[1]);

    document.querySelector(".box2 input").value = "";
    textboxEditEnd(strainCurrent, strain[1]);
}

function saveCredits()
{
    credits = creditsBox.value;
    localStorage.setItem("credits", credits);
}

function saveOtherItems()
{
    localStorage.setItem("otherItems", (document.querySelector("#inventory-otherItems").value));
}

function setThemeColor(color)
{
    document.querySelector(':root').style.setProperty('--themecolor', color);
    localStorage.setItem("themeColor", color);
}

function setBackgroundImage(image)
{
    document.querySelector('body').style.backgroundImage = ("url(" + image + ")");
    localStorage.setItem("backgroundImage", image);
}

var diceRoller = document.querySelector('#diceRoller');
diceRoller.onclick = toggelDiceRoller;
function toggelDiceRoller()
{
    if (diceRoller.classList.contains("active"))
    {
        diceRoller.classList.remove("active");
    }
    else
    {
        diceRoller.classList.add("active");
    }
}
