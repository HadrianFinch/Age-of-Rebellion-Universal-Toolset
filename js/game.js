class Species
{
    constructor(
        name,
        description,

        woundBase,
        strainBase,
        startingXP,

        brawn,
        agility,
        intellect,
        cunning,
        willpower,
        presence,

        special1 = null,
        special2 = null,
        special3 = null)
    {
        this.m_name = name;
        this.m_description = description;

        this.m_woundBase = woundBase;
        this.m_strainBase = strainBase;
        this.m_startingXP = startingXP;

        this.m_brawn = brawn;
        this.m_agility = agility;
        this.m_intellect = intellect;
        this.m_cunning = cunning;
        this.m_willpower = willpower;
        this.m_presence = presence;

        // this.m_special[0] = special1;
        // this.m_special[1] = special2;
        // this.m_special[2] = special3;
    }

    get brawn()
    {
        return this.m_brawn;
    }
    get agility()
    {
        return this.m_agility;
    }
    get intellect()
    {
        return this.m_intellect;
    }
    get cunning()
    {
        return this.m_cunning;
    }
    get willpower()
    {
        return this.m_willpower;
    }
    get presence()
    {
        return this.m_presence;
    }

    get startingXP()
    {
        return this.m_startingXP;
    }
}

const Duros = new Species(
    'Duros',
    'Description',
    11,
    10,
    100,

    1,2,3,2,2,2,
    'Start with one rank in Piloting (Space)'
);

var Ace = [];
Ace.carreerSkills = [0, 5, 23, 10, 13, 14, 15, 25];
Ace.specializations = 
[
    {
        name: 'Driver',
        additionalCareerSkills: [5, 23, 10, 14]
    },
    {
        name: 'Gunner',
        additionalCareerSkills: [8, 23, 26, 16]
    },
    {
        name: 'Pilot',
        additionalCareerSkills: [0, 23, 14, 15]
    }
];

var Commander = [];
Commander.carreerSkills = [3, 5, 8, 32, 9, 13, 25, 21];
Commander.specializations = 
[
    {
        name: 'Commodore',
        additionalCareerSkills: [0, 4, 28, 30]
    },
    {
        name: 'Squadron Leader',
        additionalCareerSkills: [23, 10, 14, 15]
    },
    {
        name: 'Tactician',
        additionalCareerSkills: [22, 7, 9, 26]
    }
];
