// Define Character
var abilitys = [0, 0, 0, 0, 0, 0];
var skills = [];
var soak = 0;
var wounds = [10, 0];
var strain = [10, 0];
var deffense = [0, 0];
var weapons = 
[
    ["Shock Prod", 22, 0, 5, "Engaged", "Stun 3"]
];
var equipment = 
[
    ["Commlink", "handheld", "186"]
];
var credits = 0;
var xp = [0, 0];
var characterName = "AoR Character Sheets"

var creditsBox = document.querySelector("#Inventory input");

// Define Constants
var skillAbilitys = [];
function addTD(parent, value)
{
    var td = document.createElement("td");
    td.innerHTML = value;
    parent.appendChild(td);
    return td;
}

var firstInit = true;

document.querySelector('#rollBtn').onclick = rollCheck;
init();
function init()
{
    // Wipe curremt page
    var abilityBoxes = document.querySelectorAll('.statsBox h1');
    var weaponsContainerDiv = document.querySelector("#weaponsTable");
    var equipmentContainerDiv = document.querySelector("#equipment-table");
    var rollerListElements = document.querySelectorAll('ul[class="skillsList"] li');

    // wipe weapons
    for (let i = weaponsContainerDiv.children.length - 1; i > 0; i--) 
    {
        var elm = weaponsContainerDiv.children[i];
        elm.remove();
    }

    // wipe equipment
    for (let i = equipmentContainerDiv.children.length - 1; i > 0; i--) 
    {
        var elm = equipmentContainerDiv.children[i];
        elm.remove();
    }

    // Wipe ▰▰▱▱▱
    for (let i = 0; i < rollerListElements.length; i++) 
    {
        var elm = rollerListElements[i];
        var char = elm.innerHTML.charAt(elm.innerHTML.length -1 );
        if (char != ' ')
        {
            elm.innerHTML = elm.innerHTML.substring(0, elm.innerHTML.length - 5);
        }
    }

    // Load saved values
    if (sessionStorage.getItem('characterLoaded') != null)
    {
        if (firstInit == true)
        {
            var ret = sessionStorage.getItem('characterLoaded');
            if ((ret == true) ||
                (ret == 'true'))
            {
                // Load the last character
                setTimeout(() => 
                {
                    loadLastUsedCharacter();
                }, 0);
            }
        }
    }

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
    creditsBox.value = credits;
    
    if (localStorage.getItem("xp_0") == 'null')
    {     
        xp[0] = 0;
    }
    else
    {        
        xp[0] = localStorage.getItem("xp_0");
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
    
    skillAbilitys = [abilitys[2],abilitys[0],abilitys[5],abilitys[4],abilitys[2],abilitys[5],abilitys[1],abilitys[3],abilitys[4],abilitys[5],abilitys[2],abilitys[2],abilitys[5],abilitys[3],abilitys[1],abilitys[1],abilitys[0],abilitys[3],abilitys[1],abilitys[3],abilitys[3],abilitys[4],abilitys[0],abilitys[1],abilitys[0],abilitys[1],abilitys[1],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2],abilitys[2]];

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
    for (let i = 0; i < abilityBoxes.length; i++) 
    {
        var elm = abilityBoxes[i];
        elm.innerHTML = abilitys[i];
    }

    // Fll in weapons
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
        row.onclick = function(e)
        {
            var foo = this.getAttribute("data-indexID"); 
            showRollPopup(e, foo);
        };
    }

    // Fll in equipment
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

    document.querySelector(".applyThemeColor").onclick = function()
    {
        var color = document.querySelector("#themeColorPicker");
        setThemeColor(color.value);
    };

    document.querySelector(".applyBackground").onclick = function()
    {
        var image = document.querySelector("#backgroundImagePicker");
        setBackgroundImage(image.value);
    };

    // document.querySelector("#diceRoller").onclick = function()
    // {
    //     window.open("diceRoller.html", "", "width=600,height=785")
    // };

    firstInit = false;
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
        // woundCurrent.innerHTML = wounds[1];
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

creditsBox.onkeyup = saveCredits;
function saveCredits()
{
    credits = creditsBox.value;
    xml.getElementsByTagName('credits')[0].innerHTML = credits;
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

var apply = document.querySelector('.characterSelectorApply');
var filePicker = document.querySelector('#characterSelector');

var parser = new DOMParser();
var xml;

apply.onclick = function()
{
    loadFile(null, filePicker);
};

function replaceIcons(text)
{
    text = text.replace("SETBACK", "<span class=\"setbackIcon\"></span>");
    text = text.replace("BOOST", "<span class=\"boostIcon\"></span>");
    return text;
}

function parseXML()
{
    // Set the name
    characterName = xml.getElementsByTagName("character")[0].getAttribute("name");

    // set abilitys
    var xmlAbilitys = xml.getElementsByTagName("ability");
    for (let i = 0; i < xmlAbilitys.length; i++) 
    {
        var elm = xmlAbilitys[i];
        abilitys[i] = elm.innerHTML;
    }

    // Set the skills
    var xmlSkills = xml.getElementsByTagName("skill");
    for (let i = 0; i < xmlSkills.length; i++) 
    {
        var elm = xmlSkills[i];
        var rank =  elm.getAttribute("rank");
        skills[i] = rank;
    }

    // Set Inventory
    var xmlEquipment = xml.getElementsByTagName("item");
    equipment = [];
    for (let i = 0; i < xmlEquipment.length; i++) 
    {
        var elm = xmlEquipment[i];
        var equip = [elm.getAttribute("name"), replaceIcons(elm.getAttribute("quickNotes")), elm.getAttribute("page")];
        equipment[equipment.length] = equip;
    }

    // Set Weapons
    var xmlWeapons = xml.getElementsByTagName("weapon");
    weapons = [];
    for (let i = 0; i < xmlWeapons.length; i++) 
    {
        var elm = xmlWeapons[i];
        var weapon = 
        [
            elm.innerHTML,
            elm.getAttribute("skillID"),
            elm.getAttribute("damage"),
            elm.getAttribute("crit"),
            elm.getAttribute("range"),
            elm.getAttribute("properties")
        ];
        weapons[weapons.length] = weapon;
    }

    // Set Health
    var xmlWound = xml.getElementsByTagName("wound")[0];
    var xmlStrain = xml.getElementsByTagName("strain")[0];
    wounds[0] = xmlWound.getAttribute("threshold");
    strain[0] = xmlStrain.getAttribute("threshold");

    // Set Modifiers
    var soakMod = 0;
    var woundMod = 0;
    var strainMod = 0;
    var xmlModifiers = xml.getElementsByTagName("modifier");
    for (let i = 0; i < xmlModifiers.length; i++)
    {
        var elm = xmlModifiers[i];
        var value = parseInt(elm.getAttribute("value"), 10);
        var score = elm.getAttribute("score");
        
        if (score == 'soak') 
        {
            soakMod += value;
        }
        if (score == 'woundThreshold') 
        {
            woundMod += value;
        }
        if (score == 'strainThreshold') 
        {
            strainMod += value;
        }
    }

    soak = parseInt(abilitys[0]) + soakMod;
    wounds[0] = (parseInt(wounds[0], 10) + woundMod);
    strain[0] = (parseInt(strain[0], 10) + strainMod);

    credits = xml.getElementsByTagName('credits')[0].innerHTML;

    init();
}

var xmlFileName;
document.querySelector('.exportXML').onclick = exportXML;
function exportXML()
{
    var blob = new Blob([(new XMLSerializer).serializeToString(xml)], {type: "application/xhtml+xml;charset=" + document.characterSet});
    var a = document.createElement("a");
    a.download = xmlFileName;
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function loadFile(prefile, filePickerElm)
{
    if (prefile == null)
    {
        var file;
        var files = filePickerElm.files;
        if (files.length == 0)
        {
            return;
        }
        
        file = files[0];
    
        xmlFileName = file.name;
    }
    
    let reader = new FileReader();
    
    reader.onload = function(e)
    {
        var filedata;
        if (prefile == null)
        {
            filedata = e.target.result;
            localStorage.setItem("LastLoadedFile", filedata);
            localStorage.setItem("LastLoadedFile-name", xmlFileName);
        }
        else
        {
            filedata = prefile;
        }
  
        // This is a regular expression to identify carriage 
        // Returns and line breaks
        var lines = filedata.split(/\r\n|\n/);
        var text = lines.join('\n');

        // alert(text);
        xml = parser.parseFromString(text, "text/xml");
        parseXML();
    };
  
    reader.onerror = (e) => alert(e.target.error.name);
  
    if (prefile == null)
    {
        reader.readAsText(file);
    }
    else
    {
        reader.onload();
    }
}

document.querySelector(".blackoutModal div div input").onchange = function onModalFileInputChange()
{
    loadFile(null, document.querySelector(".blackoutModal div input"));
    sessionStorage.setItem("characterLoaded", true);

    document.querySelector(".blackoutModal").style.display = 'none';
}

document.querySelector("#LoadCharacter-Modal").onclick = function()
{
    document.querySelector(".blackoutModal div div input").click();
    sessionStorage.setItem("characterLoaded", true);
}

document.querySelector("#LoadLastCharacter-Modal").onclick = loadLastUsedCharacter;
function loadLastUsedCharacter()
{
    /* LOAD LAST USED CHARACTER SHEET */
    if ((localStorage.getItem("LastLoadedFile") == 'null') ||
        (localStorage.getItem("LastLoadedFile") == null))
    {
        alert('No character saved!\n\nLoad a character by clicking "Load Character"');
    }
    else
    {
        var file = localStorage.getItem("LastLoadedFile");
        xmlFileName = localStorage.getItem("LastLoadedFile-name");

        loadFile(file, null);
        sessionStorage.setItem("characterLoaded", true);

        document.querySelector(".blackoutModal").style.display = 'none';
    }
}

document.querySelector("#MakeNewCharacter-Modal").onclick = function()
{
    document.location.href = "characterBuilder.html";
}

var weaponsEditActive = false;
document.querySelector(".editHeadder.weapons").onclick = function()
{
    if (weaponsEditActive == true)
    {
        return;
    }

    weaponsEditActive = true;

    var editButtonsDiv = document.querySelector('.contentEditable.weapons');
    editButtonsDiv.style.display = 'block';
    var weaponsTable = document.querySelector('#weaponsTable');
    weaponsTable.setAttribute("contenteditable", 'true');

    var addedRows = [];
    for (let i = 1; i < weaponsTable.children.length; i++) 
    {
        var row = weaponsTable.children[i];
        row.children[1].innerHTML = row.getAttribute("data-indexID");
        row.removeAttribute("data-indexID");
        row.onclick = null;

        row.style.cursor = 'text';
        
        var td = addTD(row, "⛔");
        td.style.cursor = 'pointer';
        td.onclick = function()
        {
            this.parentElement.remove();
        };

        addedRows[addedRows.length] = row;
    }

    editButtonsDiv.children[0].onclick = function()
    {
        var row = document.createElement('tr');
        weaponsTable.appendChild(row);
        row.classList.add("rollable");
        row.style.cursor = 'text';

        addTD(row, "New Weapon");
        addTD(row, "Skill ID");
        addTD(row, "Damage");
        addTD(row, "Crit");
        addTD(row, "Range");
        addTD(row, "Special");

        var td = addTD(row, "⛔");
        td.style.cursor = 'pointer';
        td.onclick = function()
        {
            this.parentElement.remove();
        };

        addedRows[addedRows.length] = row;
    }

    // On save click
    editButtonsDiv.children[1].onclick = function()
    {
        weaponsEditActive = false;
        var xmlWeapons = xml.getElementsByTagName("weapon");
        for (let i = xmlWeapons.length - 1; i > -1; i--) 
        {
            var elm = xmlWeapons[i];
            elm.remove();
        }

        for (let i = 0; i < addedRows.length; i++) 
        {
            var row = addedRows[i];
            var num = parseInt(row.children[1].innerHTML, 10);
            var skillName = skillNames[num];
            row.children[1].innerHTML = skillName;
            row.setAttribute("data-indexID", num);

            row.children[row.children.length - 1].remove();

            row.style.cursor = "";
            
            row.onclick = function(e)
            {
                var foo = this.getAttribute("data-indexID"); 
                showRollPopup(e, foo);
            };

            var xmlement = xml.createElement("weapon");
            xml.getElementsByTagName('inventory')[0].appendChild(xmlement);
            xmlement.innerHTML = row.children[0].innerHTML;
            xmlement.setAttribute("skillID", row.children[1].innerHTML);
            xmlement.setAttribute("damage", row.children[2].innerHTML);
            xmlement.setAttribute("crit", row.children[3].innerHTML);
            xmlement.setAttribute("range", row.children[4].innerHTML);
            xmlement.setAttribute("properties", row.children[5].innerHTML);
        }

        editButtonsDiv.style.display = 'none';
        weaponsTable.setAttribute("contenteditable", 'false');
    }
}

var equipmentEditActive = false;
document.querySelector(".editHeadder.equipment").onclick = function()
{
    if (equipmentEditActive == true)
    {
        return;
    }

    equipmentEditActive = true;

    var editButtonsDiv = document.querySelector('.contentEditable.equipment');
    editButtonsDiv.style.display = 'block';
    var equipmentTable = document.querySelector('#equipment-table');
    equipmentTable.setAttribute("contenteditable", 'true');

    for (let i = 1; i < equipmentTable.children.length; i++) 
    {
        var row = equipmentTable.children[i];
        row.style.cursor = 'text';
        
        var td = addTD(row, "⛔");
        td.style.cursor = 'pointer';
        td.onclick = function()
        {
            this.parentElement.remove();
        };
    }

    editButtonsDiv.children[0].onclick = function()
    {
        var row = document.createElement('tr');
        equipmentTable.appendChild(row);
        row.style.cursor = 'text';

        addTD(row, "New Item");
        addTD(row, "Info");
        addTD(row, "Page");

        var td = addTD(row, "⛔");
        td.style.cursor = 'pointer';
        td.onclick = function()
        {
            this.parentElement.remove();
        };
    }

    // Save button click
    editButtonsDiv.children[1].onclick = function()
    {
        equipmentEditActive = false;
        var xmlItems = xml.getElementsByTagName("item");
        for (let i = xmlItems.length - 1; i > -1; i--) 
        {
            var elm = xmlItems[i];
            elm.remove();
        }

        for (let i = 1; i < equipmentTable.children.length; i++) 
        {
            var row = equipmentTable.children[i];
            row.children[row.children.length - 1].remove();

            row.style.cursor = "";
            
            var xmlement = xml.createElement("item");
            xml.getElementsByTagName('inventory')[0].appendChild(xmlement);
            xmlement.setAttribute("name", row.children[0].innerHTML);
            xmlement.setAttribute("quickNotes", row.children[1].innerHTML);
            xmlement.setAttribute("page", row.children[2].innerHTML);
        }

        editButtonsDiv.style.display = 'none';
        equipmentTable.setAttribute("contenteditable", 'false');
    }
}
