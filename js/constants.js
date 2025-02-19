import Cookies from "./cookies.js";
export const cookieNames = Object.freeze({
    allowed: "cookiesAllowed",
    theme: "theme",
});
export const cookies = new Cookies("ds2Checklist_");
export const bonfires = Object.freeze({
    items: [
        { name: "Things Betwixt", items: [{ name: "Fire Keepers' Dwelling" }] },
        { name: "Majula", items: [{ name: "The Far Fire" }] },
        {
            name: "Forest of Fallen Giants",
            items: [
                { name: "The Crestfallen's Retreat" },
                { name: "Cardinal Tower" },
                { name: "Soldier's Rest" },
                { name: "The Place Unbeknownst" },
            ],
        },
        {
            name: "Heide's Tower of Flame",
            items: [{ name: "Heide's Ruin" }, { name: "Tower of Flame" }],
        },
        { name: "Cathedral of Blue", items: [{ name: "The Blue Cathedral" }] },
        { name: "No Man's Wharf", items: [{ name: "Unseen Path to Heide" }] },
        {
            name: "The Lost Bastille",
            items: [
                { name: "Exile Holding Cells" },
                { name: "McDuff's Workshop" },
                { name: "Servants' Quarters" },
                { name: "Straid's Cell" },
                { name: "The Tower Apart" },
            ],
        },
        { name: "Belfry Luna", items: [{ name: "Upper Ramparts" }] },
        { name: "Sinner's Rise", items: [{ name: "The Saltfort" }] },
        {
            name: "Huntsman's Copse",
            items: [
                { name: "Undead Refuge" },
                { name: "Bridge Approach" },
                { name: "Undead Lockaway" },
            ],
        },
        { name: "Undead Purgatory", items: [{ name: "Undead Purgatory" }] },
        {
            name: "Harvest Valley",
            items: [{ name: "Poison Pool" }, { name: "The Mines" }],
        },
        {
            name: "Earthen Peak",
            items: [
                { name: "Lower Earthen Peak" },
                { name: "Central Earthen Peak" },
                { name: "Upper Earthen Peak" },
            ],
        },
        {
            name: "Iron Keep",
            items: [
                { name: "Threshold Bridge" },
                { name: "Ironheart Hall" },
                { name: "Eygil's Idol" },
            ],
        },
        { name: "Belfry Sol", items: [{ name: "Belfry Sol" }] },
        {
            name: "Shaded Woods",
            items: [
                { name: "Old Akelarre" },
                { name: "Ruined Fork Road" },
                { name: "Shaded Ruins" },
            ],
        },
        {
            name: "Doors of Pharros",
            items: [{ name: "Gyrm's Respite" }, { name: "Ordeal's End" }],
        },
        {
            name: "Brightstone Cove Tseldora",
            items: [
                { name: "Royal Army Campsite" },
                { name: "Chapel Threshold" },
                { name: "Lower Brightstone Cove" },
            ],
        },
        {
            name: "Grave of Saints",
            items: [
                { name: "Harval's Resting Place" },
                { name: "Grave Entrance" },
            ],
        },
        {
            name: "The Gutter",
            items: [{ name: "Upper Gutter" }, { name: "Central Gutter" }],
        },
        {
            name: "Black Gulch",
            items: [{ name: "Black Gulch Mouth" }, { name: "Hidden Chamber" }],
        },
        {
            name: "Drangleic Castle",
            items: [
                { name: "King's Gate" },
                { name: "Under Castle Drangleic" },
                { name: "Forgotten Chamber" },
                { name: "Central Castle Drangleic" },
            ],
        },
        {
            name: "Shrine of Amana",
            items: [
                { name: "Tower of Prayer" },
                { name: "Crumbled Ruins" },
                { name: "Rhoy's Resting Place" },
                { name: "Rise of the Dead" },
            ],
        },
        {
            name: "Undead Crypt",
            items: [
                { name: "Undead Crypt Entrance" },
                { name: "Undead Ditch" },
            ],
        },
        {
            name: "Aldia's Keep",
            items: [{ name: "Foregarden" }, { name: "Ritual Site" }],
        },
        { name: "Dragon Aerie", items: [{ name: "Dragon Aerie" }] },
        { name: "Dragon Shrine", items: [{ name: "Shrine Entrance" }] },
        {
            name: "Shulva, Sanctum City",
            items: [
                { name: "Sanctum Walk" },
                { name: "Tower of Prayer" },
                { name: "Priestess' Chamber" },
            ],
        },
        {
            name: "Dragon's Sanctum",
            items: [
                { name: "Hidden Sanctum Chamber" },
                { name: "Lair of the Imperfect" },
                { name: "Sanctum Interior" },
            ],
        },
        { name: "Dragon's Rest", items: [{ name: "Sanctum Nadir" }] },
        {
            name: "Brume Tower",
            items: [
                { name: "Throne Floor" },
                { name: "Upper Floor" },
                { name: "Foyer" },
                { name: "Lowermost Floor" },
                { name: "The Smelter Throne" },
            ],
        },
        { name: "Iron Passage", items: [{ name: "Iron Hallway Entrance" }] },
        {
            name: "Frozen Eleum Loyce",
            items: [
                { name: "Outer Wall" },
                { name: "Abandoned Dwelling" },
                { name: "Inner Wall" },
                { name: "Lower Garrison" },
                { name: "Expulsion Chamber" },
            ],
        },
        { name: "Grand Cathedral", items: [{ name: "Grand Cathedral" }] },
    ],
});
export const bosses = Object.freeze({
    items: [
        {
            name: "Base game",
            items: [
                { name: "The Last Giant" },
                { name: "The Pursuer" },
                { name: "Dragonrider" },
                { name: "Old Dragonslayer" },
                { name: "Flexile Sentry" },
                { name: "Ruin Sentinels" },
                { name: "The Lost Sinner" },
                { name: "Belfry Gargoyles" },
                { name: "Skeleton Lords" },
                { name: "Executioner's Chariot" },
                { name: "Covetous Demon" },
                { name: "Mytha, the Baneful Queen" },
                { name: "Smelter Demon" },
                { name: "Old Iron King" },
                { name: "Scorpioness Najka" },
                { name: "Royal Rat Authority" },
                { name: "Prowling Magus & Congregation" },
                { name: "The Duke's Dear Freja" },
                { name: "Royal Rat Vanguard" },
                { name: "The Rotten" },
                { name: "Dragonriders" },
                { name: "Looking Glass Knight" },
                { name: "Demon of Song" },
                { name: "Velstadt, the Royal Aegis" },
                { name: "Vendrick" },
                { name: "Guardian Dragon" },
                { name: "Ancient Dragon" },
                { name: "Giant Lord" },
                { name: "Throne Defender & Throne Watcher" },
                { name: "Nashandra" },
                { name: "Aldia, Scholar of the First Sin" },
                { name: "Darklurker" },
            ],
        },
        {
            name: "DLC",
            items: [
                { name: "Elana, the Squalid Queen" },
                { name: "Sinh, the Slumbering Dragon" },
                {
                    name: "Afflicted Graverobber, Ancient Soldier Varg & Cerah the Old Explorer",
                },
                { name: "Fume Knight" },
                { name: "Sir Alonne" },
                { name: "Smelter Demon (Iron King DLC)" },
                { name: "Aava, the King's Pet" },
                { name: "Burnt Ivory King" },
                { name: "Lud, the King's Pet & Zallen, the King's Pet" },
            ],
        },
    ],
});
export const npcs = Object.freeze({
    items: [
        {
            name: "Majula",
            items: [
                { name: "Blacksmith Lenigrast" },
                { name: "Carhillion of the Fold" },
                { name: "Laddersmith Gilligan" },
                { name: "Licia of Lindeldt" },
                { name: "Maughlin the Armourer" },
                { name: "Merchant Hag Melentia" },
                { name: "Rosabeth of Melfia" },
                { name: "Saulden the Crestfallen Warrior" },
                { name: "Stone Trader Chloanne" },
                { name: "Sweet Shalquoir" },
            ],
        },
        {
            name: "Elsewhere",
            items: [
                { name: "Aldia, Scholar of the First Sin" },
                { name: "Alsanna, Silent Oracle" },
                { name: "Belfry Guard" },
                { name: "Benhart of Jugo" },
                { name: "Blue Sentinel Targray" },
                { name: "Captain Drummond" },
                { name: "Chancellor Wellager" },
                { name: "Creighton the Wanderer" },
                { name: "Cromwell the Pardoner" },
                { name: "Darkdiver Grandahl" },
                { name: "Felkin the Outcast" },
                { name: "Grave Warden Agdayne" },
                { name: "Head of Vengarl" },
                { name: "Lonesome Gavlan" },
                { name: "Lucatiel of Mirrah" },
                { name: "Magerold of Lanafir" },
                { name: "Manscorpion Tark" },
                { name: "Mild Mannered Pate" },
                { name: "Royal Sorcerer Navlaan" },
                { name: "Sparkling Sisters Dyna and Tillo" },
                { name: "Steady Hand McDuff" },
                { name: "Straid of Olaphis" },
                { name: "Strowen" },
                { name: "The Rat King" },
                { name: "Titchy Gren" },
                { name: "Weaponsmith Ornifex" },
            ],
        },
    ],
});
