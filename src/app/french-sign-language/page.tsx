import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import Translator from "@/components/translator/Translator";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/alphabet-page.css";
import "@/styles/french-sign-language.css";

export const metadata: Metadata = buildMetadata({
  "title": "French Sign Language: Learn Basic Sign & Alphabet",
  "description": "Translate English text to Sign with our free French Sign Language translator. Learn French manual alphabet signs, fingerspelling, and communicate visually with the deaf community.",
  "keywords": "French Sign Language, LSF, langue des signes française, sign language translator, deaf communication, visual language, LSF translator, French signs",
  "path": "/french-sign-language",
  "robots": "index, follow, max-image-preview:large",
  "ogTitle": "French Sign Language | Translator & Alphabet",
  "ogDescription": "Translate English text to Sign with our free French Sign Language translator. Learn LSF signs, fingerspelling, and communicate visually with the deaf community.",
  "ogImage": "/french-sign-language/image.png",
  "ogType": "website",
  "twitterCard": "summary_large_image",
  "twitterTitle": "French Sign Language | Translator & Alphabet",
  "twitterDescription": "Translate English text to Sign with our free French Sign Language translator. Learn LSF signs, fingerspelling, and communicate visually with the deaf community.",
  "twitterImage": "/french-sign-language/image.png"
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "French Sign Language",
  "url": "https://sltranslator.com/french-sign-language/",
  "description": "Translate English text to Sign with our free French Sign Language translator. Learn LSF signs, fingerspelling, and communicate visually with the deaf community.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "Sign Language Translator",
    "url": "https://sltranslator.com/"
  },
  "screenshot": "https://sltranslator.com/french-sign-language/image.png",
  "featureList": [
    "French Sign Language",
    "French Sign Language Translator",
    "French Sign Language Alphabet"
  ]
};

export default function FrenchSignLanguagePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main>
        <div className="container">
          <div className="main-title">
            <h1>
              French Sign Language Translator
            </h1>
            <p>
              French Sign Language (LSF) is used by the deaf and hard-of-hearing community in France and French-speaking parts of Switzerland. Convert English text into French Sign Language symbols with our sltranslator. Just enter your text in the input box and receive a visual representation in sign language in the result section. Create meaningful and expressive messages with our translator.
            </p>
          </div>
        </div>
        <Translator alphabet="lsf" heading={"French Sign Language Translator"} convertLabel={"Convert to French Sign Language"} />
      </main>
      <div className="main-info">
        <h2>
          What is French Sign Language (FSL)
        </h2>
        <p>
          French
          <Link href="/">
            Sign Language
          </Link>
          , known as “LSF (Langue des Signes Française)”, is one of the oldest, richest, and most influential sign languages in the world. It formed American Sign Language, influenced many European Sign Languages, and remains central to Deaf culture in France. However, despite their importance, reliable online guides often fall short of expectations. Either too academic or too basic, it completely misses what beginners really want to know: how LSF works, how to use it, and how it fits into French Deaf culture. This updated, easy-to-read guide fills these gaps.
        </p>
        <p>
          French Sign Language is an illustrated language used by deaf communities in France, Switzerland, Belgium, and some French-speaking countries. It is a completely normal language and is not a variation of the spoken French language. Unlike spoken language (French, which is linear and sonorous), LSF is multidimensional and relies on the eyes, face, and hands.
        </p>
        <h2>
          French Sign Language Alphabet
        </h2>
        <p>
          French Sign Language (FSL), or Langue des Signes Française (LSF), is a visual-manual language used by over 100,000 individuals in France.  It is still widely used today and is considered a precursor to American Sign Language (ASL) and several other national sign languages.
        </p>
        <p>
          French
          <Link href="/sign-language-alphabet">
            Sign language Alphabet
          </Link>
          are unique, three-dimensional language with its own grammar, entirely distinct from spoken French. It uses facial expressions to convey emotion and grammatical cues, spatial positioning to express time and relationships, and a specific word order: time + place + subject + action.
        </p>
        <p>
          Its vocabulary continues to grow, incorporating iconic signs, influences from the French language, and newly invented terms. Today, LSF remains a vital part of Deaf culture and communication in France.
        </p>
      </div>
      <div className="alphabet-grid">
        <div className="alphabet-card">
          <h3>
            A in sign language
          </h3>
          <img src="/french-sign-language/fa.png" alt="A in sign language" width={104} height={112} decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            B in sign language
          </h3>
          <img src="/french-sign-language/fb.png" alt="B in sign language" width={100} height={119} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            C in sign language
          </h3>
          <img src="/french-sign-language/fc.png" alt="C in sign language" width={81} height={113} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            D in sign language
          </h3>
          <img src="/french-sign-language/fd.png" alt="D in sign language" width={71} height={115} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            E in sign language
          </h3>
          <img src="/french-sign-language/fe.png" alt="E in sign language" width={105} height={111} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            f in sign language
          </h3>
          <img src="/french-sign-language/ff.png" alt="F in sign language" width={107} height={123} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            G in sign language
          </h3>
          <img src="/french-sign-language/fg.png" alt="G in sign language" width={102} height={116} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            H in sign language
          </h3>
          <img src="/french-sign-language/fh.png" alt="H in sign language" width={97} height={119} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            I in sign language
          </h3>
          <img src="/french-sign-language/fi.png" alt="I in sign language" width={99} height={118} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            J in sign language
          </h3>
          <img src="/french-sign-language/fj.png" alt="J in sign language" width={108} height={109} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            K in sign language
          </h3>
          <img src="/french-sign-language/fk.png" alt="k in sign language" width={115} height={115} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            L in sign language
          </h3>
          <img src="/french-sign-language/fl.png" alt="L in sign language" width={98} height={115} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            M in sign language
          </h3>
          <img src="/french-sign-language/fm.png" alt="M in sign language" width={102} height={108} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            N in sign language
          </h3>
          <img src="/french-sign-language/fn.png" alt="N in sign language" width={112} height={108} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            O in sign language
          </h3>
          <img src="/french-sign-language/fo.png" alt="O in sign language" width={104} height={113} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            P in sign language
          </h3>
          <img src="/french-sign-language/fp.png" alt="p in sign language" width={105} height={112} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            Q in sign language
          </h3>
          <img src="/french-sign-language/fq.png" alt="Q in sign language" width={100} height={122} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            R in sign language
          </h3>
          <img src="/french-sign-language/fr.png" alt="r in sign language" width={106} height={120} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            S in sign language
          </h3>
          <img src="/french-sign-language/fs.png" alt="S in sign language" width={107} height={121} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            T in sign language
          </h3>
          <img src="/french-sign-language/ft.png" alt="t in sign language" width={114} height={120} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            U in sign language
          </h3>
          <img src="/french-sign-language/fu.png" alt="U in sign language" width={108} height={116} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            V in sign language
          </h3>
          <img src="/french-sign-language/fv.png" alt="v in sign language" width={108} height={114} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            W in sign language
          </h3>
          <img src="/french-sign-language/fw.png" alt="W in sign language" width={105} height={111} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            X in sign language
          </h3>
          <img src="/french-sign-language/fx.png" alt="X in sign language" width={108} height={121} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            Y in sign language
          </h3>
          <img src="/french-sign-language/fy.png" alt="Y in sign language" width={103} height={118} loading="lazy" decoding="async" />
        </div>
        <div className="alphabet-card">
          <h3>
            Z in sign language
          </h3>
          <img src="/french-sign-language/fz.png" alt="z in sign language" width={122} height={116} loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="main-info">
        <h2>
          Why French Sign Language is Important Today
        </h2>
        <p>
          LSF is required for communication within the deaf community, inclusion in education, the workplace, and public life, translation services, preservation of culture, availability in media and government, and global research on sign language. In 2005, France officially recognized LSF as a complete language, giving deaf people the right to access LSF education and public services.
        </p>
        <h2>
          Clear Timeline of LSF History
        </h2>
        <p>
          Many articles briefly mention the origins of LSF, but few explain the entire process. Here is a simple and accurate overview.
        </p>
        <h3>
          Before 1700 - Local Community Signs
        </h3>
        <p>
          In France, deaf people used signs in their homes and villages long before official education existed.
        </p>
        <h3>
          1760 - Épée Monastery and First School for the Deaf
        </h3>
        <p>
          Abbot Charles Michel de l'Épée opened the world's first public school for the deaf in Paris. Although he documented the first form of LSF, he did not invent it, but rather codified what deaf people were already using.
        </p>
        <h3>
          1800s - LSF Spread Around the World
        </h3>
        <p>
          Deaf French teachers such as Laurent Clerc went abroad. In the United States, LSF was mixed with local sign languages to form American Sign Language (ASL).
        </p>
        <h3>
          1880 - Prohibition of Sign Language (Milan Congress)
        </h3>
        <p>
          Teachers banned sign language in schools around the world and replaced it with spoken language. LSF survived in the Deaf community.
        </p>
        <h3>
          1970s - 1990s - Updates and Research
        </h3>
        <p>
          Linguists recognized LSF as a real language. Deaf teachers gradually returned to the classroom.
        </p>
        <h3>
          2005 - Legal Approval
        </h3>
        <p>
          The French government legally recognized LSF and supported bilingual education (LSF plus written French).
        </p>
        <h3>
          Today
        </h3>
        <p>
          LSF continues to grow through social networks, online courses, TV translation, cultural actions, and improvements in accessibility laws.
        </p>
        <h2>
          LSF and ASL (and Other Sign Languages)
        </h2>
        <p>
          Although LSF and ASL have common historical roots, they are not mutually intelligible. This is one of the biggest misconceptions on the internet. Below is a quick comparison of key differences:
        </p>
        <ul>
          <li>
            <strong>
              Origin:
            </strong>
            LSF originated in France in the 18th century, while ASL developed in the USA in the early 19th century
          </li>
          <li>
            <strong>
              Impact:
            </strong>
            ASL was influenced by LSF plus local signage
          </li>
          <li>
            <strong>
              Grammar structure:
            </strong>
            LSF uses Topic → Comments → Details, while ASL is visual-spatial with active use of classifiers
          </li>
          <li>
            <strong>
              Fingerspelling:
            </strong>
            LSF uses a one-handed alphabet, as does ASL
          </li>
          <li>
            <strong>
              Mutual understanding:
            </strong>
            Low between the two languages
          </li>
          <li>
            <strong>
              Cultural background:
            </strong>
            LSF reflects Deaf culture in France, while ASL reflects Deaf culture in America
          </li>
        </ul>
        <h2>
          LSF and French Conversation: The Differences
        </h2>
        <p>
          Although LSF is used in France, it is not French. Their structure is very different.
        </p>
        <h3>
          Key Differences
        </h3>
        <ul>
          <li>
            French uses sound, while LSF uses movement
          </li>
          <li>
            French is linear, while LSF uses 3D space
          </li>
          <li>
            French has fixed grammar, while LSF grammar is spatial and flexible
          </li>
          <li>
            French uses tones, while LSF uses facial expressions and movement intensity
          </li>
          <li>
            French conveys order from side to side, while LSF conveys relationships via position and orientation
          </li>
        </ul>
        <p>
          These differences make LSF a complete language rather than a translation.
        </p>
        <h2>
          Mechanism of LSF Grammar (Brief Explanation)
        </h2>
        <p>
          LSF's syntax is very clear. The most important rule is the topic-comment structure: Subject → Comments on subject → Details. For example, "The weather is rainy - tomorrow - heavy rain" means "It will rain heavily tomorrow."
        </p>
        <h3>
          LSF Grammar Components
        </h3>
        <ul>
          <li>
            <strong>
              Hand shape:
            </strong>
            Fisted, flat, V-shaped, open palm
          </li>
          <li>
            <strong>
              Movement:
            </strong>
            Fast, slow, circular, repetitive, sharp - each has its own meaning
          </li>
          <li>
            <strong>
              Location:
            </strong>
            Signs near the head are often linked with thoughts and emotions, while signs close to the body refer to actions
          </li>
          <li>
            <strong>
              Direction:
            </strong>
            The sign changes completely depending on whether the palm is facing up, down, sideways, or facing
          </li>
          <li>
            <strong>
              Facial expressions (non-hand signals):
            </strong>
            Raised eyebrows indicate yes/no questions, head tilt shows emphasis, mouth movements represent adverbs
          </li>
          <li>
            <strong>
              Using spaces (role reversal):
            </strong>
            Signers can reverse roles by rotating their bodies to bring stories, dialogue, and explanations to life
          </li>
        </ul>
        <h2>
          Fingerspelling with LSF
        </h2>
        <p>
          LSF uses a one-handed alphabet that is similar in arrangement to, but not identical to, ASL. Beginners rely more on fingerspelling than fluent signers. Fingerspelling is used for names, cities, loan words from French, abbreviations, specifications, and explanation of meaning. Natural signers prefer established sign languages whenever possible.
        </p>
        <h2>
          How LSF Signs Are Structured
        </h2>
        <p>
          LSF signs are made up of smaller components, like letters that make up words. The five signature components are:
        </p>
        <ol>
          <li>
            Hand shape
          </li>
          <li>
            Location
          </li>
          <li>
            Movement
          </li>
          <li>
            Direction
          </li>
          <li>
            Facial expression
          </li>
        </ol>
        <p>
          Changing one component frequently results in the creation of a new sign.
        </p>
        <h2>
          Regional Differences (Dialects) in LSF
        </h2>
        <p>
          LSF varies by district, just as spoken French does. Known dialect regions include Paris, Toulouse, Lyon, Marseille, Lille, and Rouen. Regional differences are obvious in vocabulary, favorite signs, idioms, and slang. These differences make LSF active and culturally rich.
        </p>
        <h2>
          LSF and Deaf Culture
        </h2>
        <p>
          Studying LSF means immersing yourself in a dynamic culture. Deaf culture principles include visual communication, narration, community, public meetings, Deaf humor, poetry in sign language, and tradition and history. LSF is central to Deaf identity in France. It guarantees connection, equality, and belonging.
        </p>
        <h2>
          How to Learn French Sign Language (Roadmap for Beginners)
        </h2>
        <p>
          Many articles list resources but don't explain how to actually get started. Here's a step-by-step learning path for true beginners.
        </p>
        <h3>
          Step 1: Learn Basic Vocabulary
        </h3>
        <p>
          Start with simple categories such as greetings, numbers, emotions, family signs, and everyday verbs.
        </p>
        <h3>
          Step 2: Follow Local Signers Daily
        </h3>
        <p>
          LSF is very visual. Observing natural learners is very important. Good sources include YouTube channels, LSF TV news, children's cartoons with sign language explanation, and Deaf social media influencers.
        </p>
        <h3>
          Step 3: Use Video Dictionaries
        </h3>
        <p>
          LSF dictionaries help you see hand shapes and actions at the same time. Use them to check accuracy.
        </p>
        <h3>
          Step 4: Attend Deaf Community Events
        </h3>
        <p>
          This is where real learning happens. Join deaf cafes, silent dinners, cultural festivals, and LSF seminars. Live communication will develop your fluency faster than any book.
        </p>
        <h3>
          Step 5: Take a Structured LSF Course
        </h3>
        <p>
          Many organizations offer lessons for beginners, intermediate masterclasses, grammar lessons, and storytelling sessions. Universities and community centers also offer certificate programs.
        </p>
        <h3>
          Step 6: Train Every Day
        </h3>
        <p>
          Practice short sentence explanations about your day, your feelings, your projects, and your environment. Consistency is more important than speed.
        </p>
        <h3>
          Step 7: Be Patient and Enjoy the Process
        </h3>
        <p>
          LSF is expressive and fun. Every time you communicate visually, you make more progress.
        </p>
        <h2>
          Common Mistakes Made by Beginners (and How to Fix Them)
        </h2>
        <p>
          Learning French Sign Language may seem exciting at first, but many beginners rapidly realize that visual language requires a new way of thinking. Most errors occur because learners try to relate spoken or written French skills. Rather than relying on words or sounds, LSF uses space, movement, and expression to create meaning. Another issue is mixing signs from different sign languages without proper guidance. Through continuous practice and an open mind, beginners will quickly learn how to communicate confidently and naturally with LSF.
        </p>
        <h3>
          Common Mistakes and Solutions
        </h3>
        <ul>
          <li>
            <strong>
              Using French grammar instead of LSF grammar:
            </strong>
            Think visually instead of writing in French
          </li>
          <li>
            <strong>
              Ignoring facial expressions:
            </strong>
            Remember that non-hand signals are half of the grammar
          </li>
          <li>
            <strong>
              Gesturing too close to the body:
            </strong>
            Hold signs in front of your chest and face
          </li>
          <li>
            <strong>
              Mixing ASL and LSF:
            </strong>
            Remember that LSF is not equal to ASL
          </li>
          <li>
            <strong>
              Looking at your hands, not your face:
            </strong>
            Faces indicate the type of text and emotional background
          </li>
          <li>
            <strong>
              Fingerspelling abuse:
            </strong>
            Look for natural signs first
          </li>
        </ul>
        <p>
          Avoiding these mistakes will save you months of relearning later.
        </p>
        <h2>
          LSF in Modern Technology
        </h2>
        <p>
          Technology is changing access to sign language like never before. Modern tools include character recognition apps using artificial intelligence, LSF online courses, video relay services (VRS), subtitle tools, gesture-based interpretation, and VR and AR for interactive learning. These innovations improve communication, education, and independence.
        </p>
        <h3>
          Technologies That Help You Learn LSF
        </h3>
        <ul>
          <li>
            <strong>
              Video Dictionary:
            </strong>
            Apps featuring clips of signers themselves
          </li>
          <li>
            <strong>
              LSF Courses:
            </strong>
            Online schools and beginner programs
          </li>
          <li>
            <strong>
              AI Translators:
            </strong>
            Experimental tools for recognizing hand shapes
          </li>
          <li>
            <strong>
              Subtitle Tools:
            </strong>
            Auto-generated captions to learn context
          </li>
          <li>
            <strong>
              Social Networks:
            </strong>
            Deaf creators post signs and stories
          </li>
        </ul>
        <h2>
          LSF in Education and Society
        </h2>
        <p>
          LSF is gradually more present in social life across multiple areas.
        </p>
        <h3>
          Education
        </h3>
        <ul>
          <li>
            Bilingual programs (LSF plus written French)
          </li>
          <li>
            Hearing-impaired teachers in the classroom
          </li>
          <li>
            Translation support
          </li>
        </ul>
        <h3>
          Media
        </h3>
        <p>
          LSF appears in TV news, political statements, museums, cultural festivals, and children's programs.
        </p>
        <h3>
          Legal Rights
        </h3>
        <p>
          Thanks to the LSF 2005 Act, deaf users have the right to school translators, understanding at the hospital, court interpreters, and access to community information.
        </p>
        <h3>
          Workplace Participation
        </h3>
        <p>
          Many companies now offer LSF training for colleagues, visual warning systems, and improved accessibility tools. These measures move society closer to full inclusion.
        </p>
        <h2>
          French Sign Language Around the World
        </h2>
        <p>
          LSF influences ASL (American Sign Language), Quebec Sign Language (LSQ), Belgian French Sign Language, West African Sign Languages, and European sign languages developed by French missionaries. LSF is one of the most powerful sign languages ever recorded in the world.
        </p>
        <h2>
          LSF Learning Resources
        </h2>
        <h3>
          Recommended Resources by Category
        </h3>
        <ul>
          <li>
            <strong>
              YouTube Channels:
            </strong>
            Native speakers, LSF lessons, Deaf influencers
          </li>
          <li>
            <strong>
              Websites:
            </strong>
            Free study guides, grammar videos, PDFs
          </li>
          <li>
            <strong>
              Mobile Apps:
            </strong>
            LSF dictionaries, beginner courses, quizzes
          </li>
          <li>
            <strong>
              Books:
            </strong>
            LSF grammar textbooks, vocabulary reference for beginners
          </li>
          <li>
            <strong>
              Social Events:
            </strong>
            Silent cafes, festivals, silent dinners, masterclasses
          </li>
        </ul>
        <h2>
          Frequently Asked Questions
        </h2>
        <h3>
          Is it difficult to learn French Sign Language?
        </h3>
        <p>
          LSF is visual, intuitive, and simpler than many spoken languages.
        </p>
        <h3>
          How long does it take to learn LSF?
        </h3>
        <p>
          Basic conversation takes 3-6 months, while mastery requires 2-3 years.
        </p>
        <h3>
          Is LSF used outside France?
        </h3>
        <p>
          Yes, in Switzerland, Belgium, and certain French-speaking regions of Africa.
        </p>
        <h3>
          Is LSF the same everywhere in France?
        </h3>
        <p>
          No, there are dialects depending on the region.
        </p>
        <h3>
          Is LSF universal in Europe?
        </h3>
        <p>
          No, each country has its own sign language.
        </p>
        <h2>
          Conclusion
        </h2>
        <p>
          French Sign Language is more than just a communication system; it is a living culture, a visual language, and a gateway to connection. It conveys centuries of history, originality, and creative talent. LSF continues to shape the lives of millions of people, bridging the gap between deaf and hearing communities. Its richness of appearance, movement, and space makes it one of the most enjoyable languages to learn.
        </p>
        <p>
          Unlike the spoken word, LSF encourages people to understand communication in a new dimension through the body, face, and environment. This form of expression fosters empathy, awareness, and inclusion in those who learn it.
        </p>
        <p>
          Learning LSF will help you achieve inclusion, accessibility, cultural respect, multilingual understanding, and meaningful relationships. Whether for personal interest, professional use, or curiosity, LSF offers new ways to see and express the world. It opens doors visually, culturally, and expressively.
        </p>
      </div>
    </>
  );
}
