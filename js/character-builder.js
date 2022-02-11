function removeAllChildNodes(parent) 
{
    while (parent.firstChild) 
    {
        parent.removeChild(parent.firstChild);
    }
}

var character = {};

init();
function init()
{
    document.querySelector('#defaultOpen').click();
    var rs = getComputedStyle(document.querySelector(':root'));
    document.querySelector('.topBox input[type="color"]').value = rs.getPropertyValue('--themeColor');

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) 
    {
        coll[i].addEventListener("click", function() 
        {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight)
            {
                content.style.maxHeight = null;
            }
            else 
            {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
}

document.querySelector('.topBox input[type="color"]').oninput = function()
{
    setThemeColor(this.value);
}

function setThemeColor(color)
{
    document.querySelector(':root').style.setProperty('--themecolor', color);
    localStorage.setItem("themeColor", color);
}

function openTab(evt, tabName) 
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
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.querySelector('#Species select').oninput = function()
{
    var elms = document.querySelectorAll("div.raceOption");
    for (let i = 0; i < elms.length; i++)
    {
        var elm = elms[i];
        elm.style.display = null;
    }

    document.querySelector('#' + this.value).style.display = 'block';
    
    // Update Character
    if (this.value == 'Bothan') 
    {
        character.species = Bothan;
    }
    else if (this.value == 'Droid')
    {
        character.species = Droid;
    }
    else if (this.value == 'Duros')
    {
        character.species = Duros;
    }
    else if (this.value == 'Gran')
    {
        character.species = Gran;
    }
    else if (this.value == 'Human')
    {
        character.species = Human;
    }
    else if (this.value == 'Ithorian')
    {
        character.species = Ithorian;
    }
    else if (this.value == 'MonCalamari')
    {
        character.species = MonCalamari;
    }
    else if (this.value == 'Sullustan')
    {
        character.species = Sullustan;
    }
}

document.querySelector('#Career select').oninput = function()
{
    var elms = document.querySelectorAll("div.careerOption");
    for (let i = 0; i < elms.length; i++)
    {
        var elm = elms[i];
        elm.style.display = null;
    }

    document.querySelector('#' + this.value).style.display = 'block';

    // Set Specializations
    var careerGroup = document.querySelector('optgroup[label="Career Specializations"]');
    var nonCareerGroup = document.querySelector('optgroup[label="Non-Career Specializations"]');

    if (this.value == 'Ace')
    {
        character.career = Ace;
    }
    else if (this.value == 'Commander')
    {
        character.career = Commander;
    }
    else if (this.value == 'Diplomat')
    {
        character.career = Diplomat;
    }
    else if (this.value == 'Engineer')
    {
        character.career = Engineer;
    }
    else if (this.value == 'Soldier')
    {
        character.career = Soldier;
    }
    else if (this.value == 'Spy')
    {
        character.career = Spy;
    }
    else if (this.value == 'Recruit')
    {
        character.career = Recruit;
    }
    var career = character.career;

    removeAllChildNodes(careerGroup);
    removeAllChildNodes(nonCareerGroup);

    // Add the options
    for (let i = 0; i < career.specializations.length; i++) 
    {
        var elm = career.specializations[i];

        var opt = document.createElement('option');
        opt.value = elm.name;
        opt.innerHTML = elm.name;

        careerGroup.appendChild(opt);
    }

    for (let i = 0; i < Careers.length; i++)
    {
        var car = Careers[i];
        for (let b = 0; b < car.specializations.length; b++) 
        {
            if (car === career)
            {
                break;
            }

            var elm = car.specializations[b];
            
            var opt = document.createElement('option');
            opt.value = elm.name;
            opt.innerHTML = elm.name;
    
            nonCareerGroup.appendChild(opt);
        }
    }
};


function updateCharacter()
{

}
