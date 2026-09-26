// SRD 5.2.1 data — parsed from the System Reference Document 5.2.1 markdown.
// This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
// Text modified/reformatted for app use (CC-BY-4.0 section 3(a)(1)(B)).

export interface Skill {
  id: string;
  name: string;
  cnName: string;
  ability: string;
  cnAbility: string;
  uses: string;
}

export const SKILLS_INTRO = "Most ability checks involve using a skill, which represents a category of things creatures try to do with an ability check. If a creature is proficient in a skill, the creature applies its Proficiency Bonus to ability checks involving that skill. Without proficiency, the creature can still make the check but doesn't add its Proficiency Bonus.";

export const SKILLS: Skill[] = [
  {
    id: "acrobatics",
    name: "Acrobatics",
    cnName: "特技",
    ability: "Dexterity",
    cnAbility: "敏捷",
    uses: "Stay on your feet in a tricky situation, or perform an acrobatic stunt.",
  },
  {
    id: "animal_handling",
    name: "Animal Handling",
    cnName: "驯兽",
    ability: "Wisdom",
    cnAbility: "感知",
    uses: "Calm or train an animal, or get an animal to behave in a certain way.",
  },
  {
    id: "arcana",
    name: "Arcana",
    cnName: "奥秘",
    ability: "Intelligence",
    cnAbility: "智力",
    uses: "Recall lore about spells, magic items, and the planes of existence.",
  },
  {
    id: "athletics",
    name: "Athletics",
    cnName: "运动",
    ability: "Strength",
    cnAbility: "力量",
    uses: "Jump farther than normal, stay afloat in rough water, or break something.",
  },
  {
    id: "deception",
    name: "Deception",
    cnName: "欺瞒",
    ability: "Charisma",
    cnAbility: "魅力",
    uses: "Tell a convincing lie, or wear a disguise convincingly.",
  },
  {
    id: "history",
    name: "History",
    cnName: "历史",
    ability: "Intelligence",
    cnAbility: "智力",
    uses: "Recall lore about historical events, people, nations, and cultures.",
  },
  {
    id: "insight",
    name: "Insight",
    cnName: "洞悉",
    ability: "Wisdom",
    cnAbility: "感知",
    uses: "Discern a person's mood and intentions.",
  },
  {
    id: "intimidation",
    name: "Intimidation",
    cnName: "威吓",
    ability: "Charisma",
    cnAbility: "魅力",
    uses: "Awe or threaten someone into doing what you want.",
  },
  {
    id: "investigation",
    name: "Investigation",
    cnName: "调查",
    ability: "Intelligence",
    cnAbility: "智力",
    uses: "Find obscure information in books, or deduce how something works.",
  },
  {
    id: "medicine",
    name: "Medicine",
    cnName: "医药",
    ability: "Wisdom",
    cnAbility: "感知",
    uses: "Diagnose an illness, or determine what killed the recently slain.",
  },
  {
    id: "nature",
    name: "Nature",
    cnName: "自然",
    ability: "Intelligence",
    cnAbility: "智力",
    uses: "Recall lore about terrain, plants, animals, and weather.",
  },
  {
    id: "perception",
    name: "Perception",
    cnName: "察觉",
    ability: "Wisdom",
    cnAbility: "感知",
    uses: "Using a combination of senses, notice something that's easy to miss.",
  },
  {
    id: "performance",
    name: "Performance",
    cnName: "表演",
    ability: "Charisma",
    cnAbility: "魅力",
    uses: "Act, tell a story, perform music, or dance.",
  },
  {
    id: "persuasion",
    name: "Persuasion",
    cnName: "游说",
    ability: "Charisma",
    cnAbility: "魅力",
    uses: "Honestly and graciously convince someone of something.",
  },
  {
    id: "religion",
    name: "Religion",
    cnName: "宗教",
    ability: "Intelligence",
    cnAbility: "智力",
    uses: "Recall lore about gods, religious rituals, and holy symbols.",
  },
  {
    id: "sleight_of_hand",
    name: "Sleight of Hand",
    cnName: "巧手",
    ability: "Dexterity",
    cnAbility: "敏捷",
    uses: "Pick a pocket, conceal a handheld object, or perform legerdemain.",
  },
  {
    id: "stealth",
    name: "Stealth",
    cnName: "隐匿",
    ability: "Dexterity",
    cnAbility: "敏捷",
    uses: "Escape notice by moving quietly and hiding behind things.",
  },
  {
    id: "survival",
    name: "Survival",
    cnName: "求生",
    ability: "Wisdom",
    cnAbility: "感知",
    uses: "Follow tracks, forage, find a trail, or avoid natural hazards.",
  },
];
