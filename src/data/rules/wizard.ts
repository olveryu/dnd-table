// SRD 5.2.1 data — parsed from the System Reference Document 5.2.1 markdown.
// This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
// Text modified/reformatted for app use (CC-BY-4.0 section 3(a)(1)(B)).

export interface ClassFeature {
  level: number;
  name: string;
  text: string;
}

// Wizard class features (levels 1-3), from SRD 5.2.1.
export const WIZARD_FEATURES: ClassFeature[] = [
  {
    level: 0,
    name: "Core Wizard Traits",
    text: "Primary Ability: Intelligence. Hit Point Die: D6 per Wizard level. Saving Throw Proficiencies: Intelligence and Wisdom. Skill Proficiencies: Choose 2: Arcana, History, Insight, Investigation, Medicine, Nature, or Religion. Weapon Proficiencies: Simple weapons. Armor Training: None.",
  },
  {
    level: 1,
    name: "Spellcasting",
    text: "As a student of arcane magic, you have learned to cast spells. See \"Spells\" for the rules on spellcasting. The information below details how you use those rules with Wizard spells, which appear in the Wizard spell list later in the class's description.\n\n_**Cantrips.**_ You know three Wizard cantrips of your choice. _Light_, _Mage Hand_, and _Ray of Frost_ are recommended. Whenever you finish a Long Rest, you can replace one of your cantrips from this feature with another Wizard cantrip of your choice.\n\nWhen you reach Wizard levels 4 and 10, you learn another Wizard cantrip of your choice, as shown in the Cantrips column of the Wizard Features table.\n\n_**Spellbook.**_ Your wizardly apprenticeship culminated in the creation of a unique book: your spellbook. It is a Tiny object that weighs 3 pounds, contains 100 pages, and can be read only by you or someone casting _Identify_. You determine the book's appearance and materials, such as a gilt-edged tome or a collection of vellum bound with twine.\n\nThe book contains the level 1+ spells you know. It starts with six level 1 Wizard spells of your choice. _Detect Magic_, _Feather Fall_, _Mage Armor_, _Magic Missile_, _Sleep_, and _Thunderwave_ are recommended.\n\nWhenever you gain a Wizard level after 1, add two Wizard spells of your choice to your spellbook. Each of these spells must be of a level for which you have spell slots, as shown in the Wizard Features table. The spells are the culmination of arcane research you do regularly.\n\n_**Spell Slots.**_ The Wizard Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.\n\n_**Prepared Spells of Level 1+.**_ You prepare the list of level 1+ spells that are available for you to cast with this feature. To do so, choose four spells from your spellbook. The chosen spells must be of a level for which you have spell slots.\n\nThe number of spells on your list increases as you gain Wizard levels, as shown in the Prepared Spells column of the Wizard Features table. Whenever that number increases, choose additional Wizard spells until the number of spells on your list matches the number in the table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 3 Wizard, your list of prepared spells can include six spells of levels 1 and 2 in any combination, chosen from your spellbook.\n\nIf another Wizard feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Wizard spells for you.\n\n_**Changing Your Prepared Spells.**_ Whenever you finish a Long Rest, you can change your list of prepared spells, replacing any of the spells there with spells from your spellbook.\n\n_**Spellcasting Ability.**_ Intelligence is your spellcasting ability for your Wizard spells.\n\n_**Spellcasting Focus.**_ You can use an Arcane Focus or your spellbook as a Spellcasting Focus for your Wizard spells.\n\n#### Expanding and Replacing a Spellbook\n\nThe spells you add to your spellbook as you gain levels reflect your ongoing magical research, but you might find other spells during your adventures that you can add to the book. You could discover a Wizard spell on a _Spell Scroll_, for example, and then copy it into your spellbook.\n\n_**Copying a Spell into the Book.**_ When you find a level 1+ Wizard spell, you can copy it into your spellbook if it's of a level you can prepare and if you have time to copy it. For each level of the spell, the transcription takes 2 hours and costs 50 GP. Afterward you can prepare the spell like the other spells in your spellbook.\n\n_**Copying the Book.**_ You can copy a spell from your spellbook into another book. This is like copying a new spell into your spellbook but faster, since you already know how to cast the spell. You need spend only 1 hour and 10 GP for each level of the copied spell.\n\nIf you lose your spellbook, you can use the same procedure to transcribe the Wizard spells that you have prepared into a new spellbook. Filling out the remainder of the new book requires you to find new spells to do so. For this reason, many wizards keep a backup spellbook.",
  },
  {
    level: 1,
    name: "Ritual Adept",
    text: "You can cast any spell as a Ritual if that spell has the Ritual tag and the spell is in your spellbook. You needn't have the spell prepared, but you must read from the book to cast a spell in this way.",
  },
  {
    level: 1,
    name: "Arcane Recovery",
    text: "You can regain some of your magical energy by studying your spellbook. When you finish a Short Rest, you can choose expended spell slots to recover. The spell slots can have a combined level equal to no more than half your Wizard level (round up), and none of the slots can be level 6 or higher. For example, if you're a level 4 Wizard, you can recover up to two levels' worth of spell slots, regaining either one level 2 spell slot or two level 1 spell slots.\n\nOnce you use this feature, you can't do so again until you finish a Long Rest.",
  },
  {
    level: 2,
    name: "Scholar",
    text: "While studying magic, you also specialized in another field of study. Choose one of the following skills in which you have proficiency: Arcana, History, Investigation, Medicine, Nature, or Religion. You have Expertise in the chosen skill.",
  },
  {
    level: 3,
    name: "Wizard Subclass",
    text: "You gain a Wizard subclass of your choice. The Evoker subclass is detailed after this class's description. A subclass is a specialization that grants you features at certain Wizard levels. For the rest of your career, you gain each of your subclass's features that are of your Wizard level or lower.",
  },
];
