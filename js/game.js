
var skillNames = 
[
    "Astrogation (Int)","Athletics (Br)","Charm (Pr)","Coercion (Will)","Computers (Int)","Cool (Pr)","Coordination (Ag)","Deception (Cun)","Discipline (Will)", "Leadership (Pr)","Mechanics (Int)","Medicine (Int)","Negotiaion (Pr)","Perception (Cun)","Piloting - Planetary (Ag)","Piloting - Space (Ag)","Resilience (Br)",         "Skulduggery (Cun)",      "Stealth (Ag)",           "Streetwise (Cun)",        "Survival (Cun)",          "Vigilance (Will)",   "Brawl (Br)","Gunnery (Ag)","Melee (Br)","Ranged - Light (Ag)","Ranged - Heavy (Ag)","Core Worlds (Int)","Education (Int)","Lore (Int)","Outer Rim (Int)","Underworld (Int)","Warfare (Int)","Xenology (Int)"
];
var skillIDs = 
{
    Astrogation:               0 ,
    Athletics:                 1 ,
    Charm:                     2 ,
    Coercion:                  3 ,
    Computers:                 4 ,
    Cool:                      5 ,
    Coordination:              6 ,
    Deception:                 7 ,
    Discipline:                8 ,
    Leadership:                9 ,
    Mechanics:                 10,
    Medicine:                  11,
    Negotiaion:                12,
    Perception:                13,
    PilotingPlanetary:         14,
    PilotingSpace:             15,
    Resilience:                16,
    Skulduggery:               17,
    Stealth:                   18,
    Streetwise:                19,
    Survival:                  20,
    Vigilance:                 21,
    Brawl:                     22,
    Gunnery:                   23,
    Melee:                     24,
    RangedLight:               25,
    RangedHeavy:               26,
    CoreWorlds:                27,
    Education:                 28,
    Lore:                      29,
    OuterRim:                  30,
    Underworld:                31,
    Warfare:                   32,
    Xenology:                  33
};

const Bothan = 
{
    name: 'Bothan',
    abilitys: [1, 1, 1, 1, 1, 1],
    woundThreshold: 10,
    strainThreshold: 10,
    startingXP: 175
}

const Droid = 
{
    name: 'Droid',
    abilitys: [1, 1, 1, 1, 1, 1],
    woundThreshold: 10,
    strainThreshold: 10,
    startingXP: 175
}

const Duros = 
{
    name: 'Duros',
    abilitys: [1, 2, 3, 2, 2, 2],
    woundThreshold: 11,
    strainThreshold: 10,
    startingXP: 100
}

const Gran = 
{
    name: 'Gran',
    abilitys: [2, 2, 2, 1, 2, 3],
    woundThreshold: 10,
    strainThreshold: 9,
    startingXP: 100
}

const Human = 
{
    name: 'Human',
    abilitys: [2, 2, 2, 2, 2, 2],
    woundThreshold: 10,
    strainThreshold: 10,
    startingXP: 110
}

const Ithorian = 
{
    name: 'Ithorian',
    abilitys: [2, 1, 2, 2, 3, 2],
    woundThreshold: 9,
    strainThreshold: 12,
    startingXP: 90
}

const MonCalamari = 
{
    name: 'Mon Calamari',
    abilitys: [2, 2, 2, 2, 2, 2],
    woundThreshold: 10,
    strainThreshold: 10,
    startingXP: 100
}

const Sullustan = 
{
    name: 'Sullustan',
    abilitys: [2, 3, 2, 1, 2, 2],
    woundThreshold: 10,
    strainThreshold: 10,
    startingXP: 100
}

const Ace = [];
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

const Commander = [];
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

const Diplomat = [];
Diplomat.carreerSkills = 
[
    skillIDs.Charm,
    skillIDs.Deception,
    skillIDs.CoreWorlds,
    skillIDs.Lore,
    skillIDs.OuterRim,
    skillIDs.Xenology,
    skillIDs.Leadership,
    skillIDs.Negotiaion
];
Diplomat.specializations = 
[
    {
        name: 'Ambassador',
        additionalCareerSkills: 
        [
            skillIDs.Charm,
            skillIDs.Discipline,
            skillIDs.CoreWorlds,
            skillIDs.Negotiaion
        ]
    },
    {
        name: 'Agitator',
        additionalCareerSkills: 
        [
            skillIDs.Coercion,
            skillIDs.Deception,
            skillIDs.Underworld,
            skillIDs.Streetwise,
        ]
    },
    {
        name: 'Quartermaster',
        additionalCareerSkills: 
        [
            skillIDs.Computers,
            skillIDs.Negotiaion,
            skillIDs.Skulduggery,
            skillIDs.Vigilance
        ]
    }
];

//-----------TODO-------------
// *** DO THE REST OF THEM ***

const Careers = [Ace, Commander, Diplomat];
