
function removeAllChildNodes(parent) 
{
    while (parent.firstChild) 
    {
        parent.removeChild(parent.firstChild);
    }
}

function rollFake()
{
    console.log("rolling fake dice pool");
    roll({setback: 0, boost: 0, ability: 1, dificulty: 2, proficency: 3, challenge: 1});
}
rollerInit();

function roll(pool)
{
    console.log(pool);
    var results = initEmpty();

    // roll profocency
    var temp = rollProficency(pool.proficency);
    results = combineResults(results, temp);

    // roll ability
    var temp = rollAbility(pool.ability);
    results = combineResults(results, temp);

    // roll dificulty
    var temp = rollDificulty(pool.dificulty);
    results = combineResults(results, temp);

    // roll setback
    var temp = rollSetback(pool.setback);
    results = combineResults(results, temp);

    // roll boost
    var temp = rollBoost(pool.boost);
    results = combineResults(results, temp);

    // roll challenge
    var temp = rollChallenge(pool.challenge);
    results = combineResults(results, temp);

    console.log(results);
    return results;
}

function initEmpty()
{
    var r = [];
    r.advantage = 0;
    r.disadvantage = 0;
    r.sucsess = 0;
    r.failure = 0;
    r.triumph = 0;
    r.despair = 0;

    return r;
}

function combineResults(a, b)
{
    var r = initEmpty();

    // combine
    r.advantage = a.advantage + b.advantage;
    r.disadvantage = a.disadvantage + b.disadvantage;

    r.sucsess = a.sucsess + b.sucsess;
    r.failure = a.failure + b.failure;

    r.triumph = a.triumph + b.triumph;
    r.despair = a.despair + b.despair;

    // handle advantage/disadvantage
    if (r.disadvantage > r.advantage) 
    {
        r.advantage = 0;
        r.disadvantage = r.disadvantage - r.advantage;
    }
    else if (r.advantage > r.disadvantage) 
    {
        r.disadvantage = 0;
        r.advantage = r.advantage - r.disadvantage;
    }
    else
    {
        r.advantage = 0;
        r.disadvantage = 0;
    }

    // handle sucess/failure
    if (r.failure > r.sucsess) 
    {
        r.sucsess = 0;
        r.failure = r.failure - r.sucsess;
    }
    else if (r.sucsess > r.failure) 
    {
        r.failure = 0;
        r.sucsess = r.sucsess - r.failure;
    }
    else
    {
        r.sucsess = 0;
        r.failure = 0;
    }

    // handle triumph/despair
    if (r.despair > r.triumph) 
    {
        r.triumph = 0;
        r.despair = r.despair - r.triumph;
    }
    else if (r.triumph > r.despair) 
    {
        r.despair = 0;
        r.triumph = r.triumph - r.despair;
    }
    else
    {
        r.triumph = 0;
        r.despair = 0;
    }

    return r;
}

function rollProficency(count)
{
    var results = initEmpty();
    if (count == null) 
    {
        return results;
    }

    for (let i = 0; i < count; i++) 
    {
        var num = Math.floor(Math.random() * 12) + 1;
        if (num < 3) 
        {
            results.sucsess = results.sucsess + 1;
        }
        if (num == 3) 
        {
            results.advantage = results.advantage + 1;
        }
        if (num == 4 || num == 5 || num == 6)
        {
            results.sucsess = results.sucsess + 1;
            results.advantage = results.advantage + 1;
        }
        if (num == 7 || num == 8) 
        {
            results.sucsess = results.sucsess + 2;
        }
        if (num == 9 || num == 10)
        {
            results.advantage = results.advantage + 2;
        }
        if (num == 11)
        {
            results.triumph = results.triumph + 1;
            results.sucsess = results.sucsess + 1;
        }
    }
    return results;
}

function rollChallenge(count)
{
    var results = initEmpty();
    if (count == null) 
    {
        return results;
    }
    
    for (let i = 0; i < count; i++) 
    {
        var num = Math.floor(Math.random() * 12) + 1;
        if (num < 3) 
        {
            results.failure = results.failure + 1;
        }
        if (num == 3 || num == 4) 
        {
            results.disadvantage = results.disadvantage + 1;
        }
        if (num == 5 || num == 6)
        {
            results.failure = results.failure + 1;
            results.disadvantage = results.disadvantage + 1;
        }
        if (num == 7 || num == 8) 
        {
            results.failure = results.failure + 2;
        }
        if (num == 9 || num == 10)
        {
            results.disadvantage = results.disadvantage + 2;
        }
        if (num == 11)
        {
            results.despair = results.despair + 1;
            results.failure = results.failure + 1;
        }
    }
    return results;
}

function rollAbility(count)
{
    var results = initEmpty();
    if (count == null) 
    {
        return results;
    }
    
    for (let i = 0; i < count; i++) 
    {
        var num = Math.floor(Math.random() * 8) + 1;
        if (num < 3) 
        {
            results.sucsess = results.sucsess + 1;
        }
        if (num == 3  || num == 4) 
        {
            results.advantage = results.advantage + 1;
        }
        if (num == 5) 
        {
            results.sucsess = results.sucsess + 2;
        }
        if (num == 6) 
        {
            results.advantage = results.advantage + 2;
        }
        if (num == 7) 
        {
            results.sucsess = results.sucsess + 1;
            results.advantage = results.advantage + 1;
        }
    }
    return results;
}

function rollDificulty(count)
{
    var results = initEmpty();
    if (count == null) 
    {
        return results;
    }
    
    for (let i = 0; i < count; i++) 
    {
        var num = Math.floor(Math.random() * 8) + 1;
        if (num < 4) 
        {
            results.disadvantage = results.disadvantage + 1;
        }
        if (num == 4) 
        {
            results.failure = results.failure + 1;
        }
        if (num == 5) 
        {
            results.disadvantage = results.disadvantage + 2;
        }
        if (num == 6) 
        {
            results.failure = results.failure + 2;
        }
        if (num == 7) 
        {
            results.failure = results.failure + 1;
            results.disadvantage = results.disadvantage + 1;
        }
    }
    return results;
}

function rollSetback(count)
{
    var results = initEmpty();
    if (count == null) 
    {
        return results;
    }
    
    for (let i = 0; i < count; i++) 
    {
        var num = Math.floor(Math.random() * 6) + 1;
        if (num < 3) 
        {
            results.failure = results.failure + 1;
        }
        if (num == 3  || num == 4) 
        {
            results.disadvantage = results.disadvantage + 1;
        }
    }
    return results;
}

function rollBoost(count)
{
    var results = initEmpty();
    if (count == null) 
    {
        return results;
    }
    
    for (let i = 0; i < count; i++) 
    {
        var num = Math.floor(Math.random() * 6) + 1;
        if (num == 1) 
        {
            results.sucsess = results.sucsess + 1;
        }
        if (num == 2) 
        {
            results.advantage = results.advantage + 1;
        }
        if (num == 3) 
        {
            results.advantage = results.advantage + 2;
        }
        if (num == 4) 
        {
            results.sucsess = results.sucsess + 1;
            results.advantage = results.advantage + 1;
        }
    }
    return results;
}

var currentSkillSelected = -1;

function displayRollResult(results)
{
    var time = 1;
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

        if (currentSkillSelected == -1) 
        {
            document.querySelector('.diceResult b').innerHTML = "Custom Roll";
        }
        else
        {
            document.querySelector('.diceResult b').innerHTML = skillNames[currentSkillSelected];
            console.log("Current Skill: " + currentSkillSelected);
        }

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

var diceRoller = document.getElementById('diceRoller');
diceRoller.onclick = function(){toggelDiceRoller(true)};
document.querySelector('#diceRoller div.close').onclick = function(e){e.stopPropagation(); toggelDiceRoller(false);};

function toggelDiceRoller(toggel)
{
    if (toggel == true)
    {
        diceRoller.classList.add("active");
    }
    else
    {
        diceRoller.classList.remove("active");
        if (document.querySelector('#diceRoller div.close').classList.contains("active") == true) 
        {
            rollPool();
        }
        
        var b = document.querySelectorAll('#diceRoller div b');
        for (let i = 0; i < b.length; i++) 
        {
            const elm = b[i];
            elm.innerHTML = "0";
        }
    }

}

function rollerInit()
{
    document.querySelector(".diceResult").style.right = "-300pt";

    var elms = document.querySelectorAll("#diceRoller div");
    for (let i = 0; i < (elms.length - 1); i++) 
    {
        const elm = elms[i];
        elm.onclick = function(){incrimentDice(this);};
    }    
}

function incrimentDice(elm)
{
    elm.children[1].innerHTML = (parseInt(elm.children[1].innerHTML, 10) + 1);
    var btn = document.querySelector('#diceRoller div.close');
    btn.classList.add('active');
    btn.children[0].innerHTML = "Roll";
}

function rollPool()
{
    var pool = [];

    var b = document.querySelectorAll('#diceRoller div b');
    for (let i = 0; i < b.length; i++) 
    {
        const elm = b[i];

        if (i == 0) 
        {
            pool.ability = elm.innerHTML;
        }
        if (i == 1) 
        {
            pool.proficency = elm.innerHTML;
        }
        if (i == 2) 
        {
            pool.boost = elm.innerHTML;
        }
        if (i == 3) 
        {
            pool.dificulty = elm.innerHTML;
        }
        if (i == 4)
        {
            pool.challenge = elm.innerHTML;
        }
        if (i == 5) 
        {
            pool.setback = elm.innerHTML;
        }
    }

    currentSkillSelected = -1;

    var btn = document.querySelector('#diceRoller div.close');
    btn.children[0].innerHTML = "❌";
    btn.classList.remove("active");

    var result = roll(pool);
    displayRollResult(result);
}
