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



var currentSkillSelected = 0;
document.querySelector('#rollBtn').onclick = rollCheck;
init();
function init()
{
    var skillboxes = document.getElementsByClassName("skillsList");
    var rollPopup = document.querySelector('#rollPopup');
    rollPopup.onmouseover = function(){mouseOverRollPopup = true};
    for (let i = 0; i < skillboxes.length; i++) 
    {
        var elm = skillboxes[i];    
        elm.onclick = function(e){showRollPopup(e, i);};
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
    var ability = ability; // TODO: Make based on ability - skill

    var pool = [];
    pool.proficency = proficency;
    pool.ability = ability;

    pool.boost = document.querySelector('#boost').value;
    pool.dificulty = document.querySelector('#dificulty').value;
    pool.challenge = document.querySelector('#challenge').value;
    pool.setback = document.querySelector('#setback').value;

    roll(pool);
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
