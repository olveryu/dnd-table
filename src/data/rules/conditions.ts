// SRD 5.2.1 data — parsed from the System Reference Document 5.2.1 markdown.
// This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
// Text modified/reformatted for app use (CC-BY-4.0 section 3(a)(1)(B)).

export interface Condition {
  id: string;
  name: string;
  cnName: string;
  text: string;
}

export const CONDITIONS: Condition[] = [
  {
    id: "blinded",
    name: "Blinded",
    cnName: "目盲",
    text: "While you have the Blinded condition, you experience the following effects.\n\n_**Can't See.**_ You can't see and automatically fail any ability check that requires sight.\n\n_**Attacks Affected.**_ Attack rolls against you have Advantage, and your attack rolls have Disadvantage.",
  },
  {
    id: "bloodied",
    name: "Bloodied",
    cnName: "浴血",
    text: "A creature is Bloodied while it has half its Hit Points or fewer remaining.",
  },
  {
    id: "charmed",
    name: "Charmed",
    cnName: "魅惑",
    text: "While you have the Charmed condition, you experience the following effects.\n\n_**Can't Harm the Charmer.**_ You can't attack the charmer or target the charmer with damaging abilities or magical effects.\n\n_**Social Advantage.**_ The charmer has Advantage on any ability check to interact with you socially.",
  },
  {
    id: "deafened",
    name: "Deafened",
    cnName: "耳聋",
    text: "While you have the Deafened condition, you experience the following effect.\n\n_**Can't Hear.**_ You can't hear and automatically fail any ability check that requires hearing.",
  },
  {
    id: "exhaustion",
    name: "Exhaustion",
    cnName: "力竭",
    text: "While you have the Exhaustion condition, you experience the following effects.\n\n_**Exhaustion Levels.**_ This condition is cumulative. Each time you receive it, you gain 1 Exhaustion level. You die if your Exhaustion level is 6.\n\n_**D20 Tests Affected.**_ When you make a D20 Test, the roll is reduced by 2 times your Exhaustion level.\n\n_**Speed Reduced.**_ Your Speed is reduced by a number of feet equal to 5 times your Exhaustion level.\n\n_**Removing Exhaustion Levels.**_ Finishing a Long Rest removes 1 of your Exhaustion levels. When your Exhaustion level reaches 0, the condition ends.",
  },
  {
    id: "frightened",
    name: "Frightened",
    cnName: "恐惧",
    text: "While you have the Frightened condition, you experience the following effects.\n\n_**Ability Checks and Attacks Affected.**_ You have Disadvantage on ability checks and attack rolls while the source of fear is within line of sight.\n\n_**Can't Approach.**_ You can't willingly move closer to the source of fear.",
  },
  {
    id: "grappled",
    name: "Grappled",
    cnName: "擒抱",
    text: "While you have the Grappled condition, you experience the following effects.\n\n_**Speed 0.**_ Your Speed is 0 and can't increase.\n\n_**Attacks Affected.**_ You have Disadvantage on attack rolls against any target other than the grappler.\n\n_**Movable.**_ The grappler can drag or carry you when it moves, but every foot of movement costs it 1 extra foot unless you are Tiny or two or more sizes smaller than it.",
  },
  {
    id: "incapacitated",
    name: "Incapacitated",
    cnName: "失能",
    text: "While you have the Incapacitated condition, you experience the following effects.\n\n_**Inactive.**_ You can't take any action, Bonus Action, or Reaction.\n\n_**No Concentration.**_ Your Concentration is broken.\n\n_**Speechless.**_ You can't speak.\n\n_**Surprised.**_ If you're Incapacitated when you roll Initiative, you have Disadvantage on the roll.",
  },
  {
    id: "invisible",
    name: "Invisible",
    cnName: "隐形",
    text: "While you have the Invisible condition, you experience the following effects.\n\n_**Surprise.**_ If you're Invisible when you roll Initiative, you have Advantage on the roll.\n\n_**Concealed.**_ You aren't affected by any effect that requires its target to be seen unless the effect's creator can somehow see you. Any equipment you are wearing or carrying is also concealed.\n\n_**Attacks Affected.**_ Attack rolls against you have Disadvantage, and your attack rolls have Advantage. If a creature can somehow see you, you don't gain this benefit against that creature.",
  },
  {
    id: "paralyzed",
    name: "Paralyzed",
    cnName: "麻痹",
    text: "While you have the Paralyzed condition, you experience the following effects.\n\n_**Incapacitated.**_ You have the Incapacitated condition.\n\n_**Speed 0.**_ Your Speed is 0 and can't increase.\n\n_**Saving Throws Affected.**_ You automatically fail Strength and Dexterity saving throws.\n\n_**Attacks Affected.**_ Attack rolls against you have Advantage.\n\n_**Automatic Critical Hits.**_ Any attack roll that hits you is a Critical Hit if the attacker is within 5 feet of you.",
  },
  {
    id: "petrified",
    name: "Petrified",
    cnName: "石化",
    text: "While you have the Petrified condition, you experience the following effects.\n\n_**Turned to Inanimate Substance.**_ You are transformed, along with any nonmagical objects you are wearing and carrying, into a solid inanimate substance (usually stone). Your weight increases by a factor of ten, and you cease aging.\n\n_**Incapacitated.**_ You have the Incapacitated condition.\n\n_**Speed 0.**_ Your Speed is 0 and can't increase.\n\n_**Attacks Affected.**_ Attack rolls against you have Advantage.\n\n_**Saving Throws Affected.**_ You automatically fail Strength and Dexterity saving throws.\n\n_**Resist Damage.**_ You have Resistance to all damage.\n\n_**Poison Immunity.**_ You have Immunity to the Poisoned condition.",
  },
  {
    id: "poisoned",
    name: "Poisoned",
    cnName: "中毒",
    text: "While you have the Poisoned condition, you experience the following effect.\n\n_**Ability Checks and Attacks Affected.**_ You have Disadvantage on attack rolls and ability checks.",
  },
  {
    id: "prone",
    name: "Prone",
    cnName: "倒地",
    text: "While you have the Prone condition, you experience the following effects.\n\n_**Restricted Movement.**_ Your only movement options are to crawl or to spend an amount of movement equal to half your Speed (round down) to right yourself and thereby end the condition. If your Speed is 0, you can't right yourself.\n\n_**Attacks Affected.**_ You have Disadvantage on attack rolls. An attack roll against you has Advantage if the attacker is within 5 feet of you. Otherwise, that attack roll has Disadvantage.",
  },
  {
    id: "restrained",
    name: "Restrained",
    cnName: "束缚",
    text: "While you have the Restrained condition, you experience the following effects.\n\n_**Speed 0.**_ Your Speed is 0 and can't increase.\n\n_**Attacks Affected.**_ Attack rolls against you have Advantage, and your attack rolls have Disadvantage.\n\n_**Saving Throws Affected.**_ You have Disadvantage on Dexterity saving throws.",
  },
  {
    id: "stunned",
    name: "Stunned",
    cnName: "震慑",
    text: "While you have the Stunned condition, you experience the following effects.\n\n_**Incapacitated.**_ You have the Incapacitated condition.\n\n_**Saving Throws Affected.**_ You automatically fail Strength and Dexterity saving throws.\n\n_**Attacks Affected.**_ Attack rolls against you have Advantage.",
  },
  {
    id: "unconscious",
    name: "Unconscious",
    cnName: "昏迷",
    text: "While you have the Unconscious condition, you experience the following effects.\n\n_**Inert.**_ You have the Incapacitated and Prone conditions, and you drop whatever you're holding. When this condition ends, you remain Prone.\n\n_**Speed 0.**_ Your Speed is 0 and can't increase.\n\n_**Attacks Affected.**_ Attack rolls against you have Advantage.\n\n_**Saving Throws Affected.**_ You automatically fail Strength and Dexterity saving throws.\n\n_**Automatic Critical Hits.**_ Any attack roll that hits you is a Critical Hit if the attacker is within 5 feet of you.\n\n_**Unaware.**_ You're unaware of your surroundings.",
  },
];
