var abilitys = [];
var skills = [];
var soak = 0;
var wounds = [];
var strain = [];
var deffense = [];

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
    popup.style.left = e.clientX + "pt";
    popup.style.bottom = (e.clienty - 5) + "pt";
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
