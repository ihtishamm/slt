/** Baby sign vocabulary shown on the /baby-sign-language page.
 *
 * Extracted from the legacy page script so the copy is editable as data.
 */
export type BabySign = {
  name: string;
  emoji: string;
  cat: "essentials" | "feelings" | "family" | "animals" | "outside";
  level: "Starter" | "Medium" | "Advanced";
  how: string;
  when: string;
};

export const babySigns: BabySign[] = [
  {
    "name": "More",
    "emoji": "🤲",
    "cat": "essentials",
    "level": "Starter",
    "how": "Bring all fingertips together on each hand, then tap them together repeatedly in front of your chest. Like squeezing two small balls.",
    "when": "Use during meals, play, or reading when baby wants more."
  },
  {
    "name": "All Done",
    "emoji": "🙌",
    "cat": "essentials",
    "level": "Starter",
    "how": "Hold both hands up, palms facing you, then twist them outward so palms face away. Like pushing something away.",
    "when": "Use at the end of meals, activities, or songs."
  },
  {
    "name": "Milk",
    "emoji": "🥛",
    "cat": "essentials",
    "level": "Starter",
    "how": "Squeeze your fist open and closed repeatedly, like milking a cow. Hold hand out in front of chest.",
    "when": "Use before breastfeeding, bottle feeding, or any milk drink."
  },
  {
    "name": "Eat / Food",
    "emoji": "🍽️",
    "cat": "essentials",
    "level": "Starter",
    "how": "Bring all fingertips of one hand together and tap them to your lips a couple of times.",
    "when": "Use before meals or snacks: \"Are you ready to eat?\""
  },
  {
    "name": "Water",
    "emoji": "💧",
    "cat": "essentials",
    "level": "Starter",
    "how": "Make a W shape with three fingers and tap them to your chin twice.",
    "when": "Use when offering water or when you see water."
  },
  {
    "name": "Sleep",
    "emoji": "😴",
    "cat": "essentials",
    "level": "Starter",
    "how": "Hold your open hand above your face, then slowly bring it down across your face as it closes — like pulling down a screen.",
    "when": "Use at naptime and bedtime routines."
  },
  {
    "name": "Help",
    "emoji": "🆘",
    "cat": "essentials",
    "level": "Starter",
    "how": "Place your closed fist on your open palm, then lift both hands upward together.",
    "when": "Use when baby is struggling with a toy or task."
  },
  {
    "name": "Please",
    "emoji": "🙏",
    "cat": "essentials",
    "level": "Starter",
    "how": "Rub your flat hand in a circular motion on your chest. Use consistently when you say \"please.\"",
    "when": "Use with any request to model polite language."
  },
  {
    "name": "Thank You",
    "emoji": "😊",
    "cat": "essentials",
    "level": "Medium",
    "how": "Touch your fingertips to your chin, then move your hand forward and slightly down — like blowing a kiss from your chin.",
    "when": "Use every time you say \"thank you\" to model manners."
  },
  {
    "name": "Again / Repeat",
    "emoji": "🔁",
    "cat": "essentials",
    "level": "Medium",
    "how": "Bend your dominant hand fingers and arc them to tap into your other open palm.",
    "when": "Use when reading the same book or singing a song again."
  },
  {
    "name": "Happy",
    "emoji": "😄",
    "cat": "feelings",
    "level": "Starter",
    "how": "Brush your flat hand upward on your chest twice in a circular motion, like an upward sweep of joy.",
    "when": "Label your baby's positive emotions: \"You're happy!\""
  },
  {
    "name": "Sad",
    "emoji": "😢",
    "cat": "feelings",
    "level": "Starter",
    "how": "Hold both open hands in front of your face, then slowly draw them down — like tears running down.",
    "when": "Use when comforting: \"Are you sad?\""
  },
  {
    "name": "Hurt / Pain",
    "emoji": "🤕",
    "cat": "feelings",
    "level": "Medium",
    "how": "Point both index fingers toward each other and twist them — you can point to the area that hurts.",
    "when": "Use when baby bumps themselves or seems in discomfort."
  },
  {
    "name": "Tired",
    "emoji": "😫",
    "cat": "feelings",
    "level": "Medium",
    "how": "Hold bent hands at chest with fingertips touching your chest, then let them drop and rotate outward.",
    "when": "Use before nap or bedtime to label the feeling."
  },
  {
    "name": "Love",
    "emoji": "❤️",
    "cat": "feelings",
    "level": "Starter",
    "how": "Cross both arms over your chest, fists closed, like giving yourself a hug.",
    "when": "Use freely and often — babies love this one!"
  },
  {
    "name": "Scared",
    "emoji": "😨",
    "cat": "feelings",
    "level": "Medium",
    "how": "Bring both hands toward your chest with fingers spread and a startled expression.",
    "when": "Use during thunderstorms or when baby seems frightened."
  },
  {
    "name": "Mommy",
    "emoji": "👩",
    "cat": "family",
    "level": "Starter",
    "how": "Spread your fingers wide, thumb touching your chin. The chin = female in ASL, the 5-hand = parent.",
    "when": "Use every time Mom enters the room or is mentioned."
  },
  {
    "name": "Daddy",
    "emoji": "👨",
    "cat": "family",
    "level": "Starter",
    "how": "Spread your fingers wide, thumb touching your forehead. Forehead = male, 5-hand = parent.",
    "when": "Use every time Dad enters or is mentioned."
  },
  {
    "name": "Baby",
    "emoji": "👶",
    "cat": "family",
    "level": "Starter",
    "how": "Cradle your bent arms in front of you and rock them gently side to side, like holding a baby.",
    "when": "Use when showing pictures of babies or meeting other infants."
  },
  {
    "name": "Brother",
    "emoji": "👦",
    "cat": "family",
    "level": "Medium",
    "how": "Point to your forehead (male), then bring both index fingers together in front of you.",
    "when": "Use when introducing or talking about siblings."
  },
  {
    "name": "Sister",
    "emoji": "👧",
    "cat": "family",
    "level": "Medium",
    "how": "Point to your chin (female), then bring both index fingers together in front of you.",
    "when": "Use when introducing or talking about siblings."
  },
  {
    "name": "Grandma",
    "emoji": "👵",
    "cat": "family",
    "level": "Medium",
    "how": "Spread fingers, thumb at chin, then bounce hand forward twice — like two generations of female.",
    "when": "Use when grandma visits or appears in photos."
  },
  {
    "name": "Dog",
    "emoji": "🐕",
    "cat": "animals",
    "level": "Starter",
    "how": "Pat your thigh with your dominant hand, then snap your fingers — like calling a dog.",
    "when": "Use when you see dogs in person, in books, or on TV."
  },
  {
    "name": "Cat",
    "emoji": "🐈",
    "cat": "animals",
    "level": "Starter",
    "how": "Use both hands to mime whiskers on each side of your face, pinching outward from your cheeks.",
    "when": "Use when you see or talk about cats."
  },
  {
    "name": "Bird",
    "emoji": "🐦",
    "cat": "animals",
    "level": "Medium",
    "how": "Hold your index finger and thumb near your mouth and open and close them like a beak pecking.",
    "when": "Great to use outdoors when birds are visible."
  },
  {
    "name": "Fish",
    "emoji": "🐠",
    "cat": "animals",
    "level": "Starter",
    "how": "Hold your flat hand to the side and wiggle it forward in a wave-like swimming motion.",
    "when": "Use at the aquarium, with bath toys, or in picture books."
  },
  {
    "name": "Elephant",
    "emoji": "🐘",
    "cat": "animals",
    "level": "Medium",
    "how": "Hold your fist to your nose and swing your arm down and forward like a swinging trunk.",
    "when": "Fun one for zoo trips and animal books!"
  },
  {
    "name": "Bunny",
    "emoji": "🐰",
    "cat": "animals",
    "level": "Starter",
    "how": "Hold up two index and middle fingers like bunny ears behind your head and wiggle them.",
    "when": "Use during Easter, or whenever bunnies appear."
  },
  {
    "name": "Tree",
    "emoji": "🌳",
    "cat": "outside",
    "level": "Medium",
    "how": "Hold your dominant forearm upright on your other open palm — the forearm is the trunk, fingers are branches.",
    "when": "Use on walks and in the garden."
  },
  {
    "name": "Flower",
    "emoji": "🌸",
    "cat": "outside",
    "level": "Medium",
    "how": "Touch your fingertips together and move them from one nostril to the other — like smelling a flower.",
    "when": "Use in the garden, when looking at flowers."
  },
  {
    "name": "Sun",
    "emoji": "☀️",
    "cat": "outside",
    "level": "Starter",
    "how": "Point your index finger upward and draw a small circle above your head, then open your hand like rays.",
    "when": "Use on sunny days: \"Look at the sun!\""
  },
  {
    "name": "Rain",
    "emoji": "🌧️",
    "cat": "outside",
    "level": "Starter",
    "how": "Hold both hands up with fingers spread, then move them downward in a rippling motion like falling rain.",
    "when": "Great for rainy days and weather conversations."
  },
  {
    "name": "Moon",
    "emoji": "🌙",
    "cat": "outside",
    "level": "Medium",
    "how": "Make a C shape with your hand and hold it up near your temple, like the crescent moon framing your face.",
    "when": "Use at bedtime when looking at the night sky."
  },
  {
    "name": "Airplane",
    "emoji": "✈️",
    "cat": "outside",
    "level": "Starter",
    "how": "Extend thumb, index, and little finger (like a shaka/hang loose), then glide your hand forward like a plane flying.",
    "when": "Use when you see or hear planes."
  }
];

export const babySignCategories = [
  { key: "all", label: "All Signs" },
  { key: "essentials", label: "Essentials" },
  { key: "feelings", label: "Feelings" },
  { key: "family", label: "Family" },
  { key: "animals", label: "Animals" },
  { key: "outside", label: "Outside" },
] as const;
