function rollFake()
{
    console.log("rolling fake dice pool");
    roll({setback: 0, boost: 0, ability: 1, dificulty: 2, proficency: 3, challenge: 1});
}

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