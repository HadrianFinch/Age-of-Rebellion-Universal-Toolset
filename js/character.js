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
    0,
    0
];
var soak = 0;
var wounds = [11, 0];
var strain = [12, 0];
var deffense = [0, 0];

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
        elm.onclick = showRollPopup;
        elm.onmouseout = hideRollPopup;
    }
    rollPopup.onmouseout = mouseLeftRollPopup;

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
}
var mouseOverRollPopup = false;

function mouseLeftRollPopup()
{
    mouseOverRollPopup = false;
    hideRollPopup();
}

function showRollPopup(e)
{
    var popup = document.querySelector('#rollPopup');
    // console.log("Y: " + e.screenY);
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

    var proficency = 2; // TODO: make based on skill
    var ability = 1; // TODO: Make based on ability - skill

    var pool = [];
    pool.proficency = proficency;
    pool.ability = ability;

    pool.boost = document.querySelector('#boost').value;
    pool.dificulty = document.querySelector('#dificulty').value;
    pool.challenge = document.querySelector('#challenge').value;
    pool.setback = document.querySelector('#setback').value;

    roll(pool);
}
