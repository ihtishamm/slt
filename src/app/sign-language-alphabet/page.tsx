import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/sign-language-alphabet.css";

export const metadata: Metadata = buildMetadata({
  "title": "Sign Language Alphabet: ASL & 8+ World Finger Alphabets",
  "description": "Learn Sign Language Alphabets from around the world — ASL, BSL, Auslan, LSF, JSL, LSE, LSM, CSL & Arabic. Explore free A–Z finger alphabet charts.",
  "keywords": "Sign Language Alphabets, sign language translator, Alphabet in sign language, word in sign language, ASL translator, asl dictionary, sign language words, sign language translator, sign language dictionary",
  "path": "/sign-language-alphabet",
  "robots": "index, follow",
  "ogTitle": "Sign Language Alphabets from Around the World",
  "ogDescription": "Explore sign language alphabets in 8+ languages. Learn finger alphabets to communicate better with the Deaf community worldwide.",
  "ogImage": "/sign-language-alphabet/image.png",
  "ogType": "website",
  "twitterCard": "summary_large_image",
  "twitterTitle": "Sign Language Alphabets from Around the World",
  "twitterDescription": "Compare and learn different sign language alphabets from across the globe.",
  "twitterImage": "/sign-language-alphabet/image.png"
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the sign language alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The sign language alphabet, also called the finger alphabet or manual alphabet, uses hand shapes to represent individual letters of a written language. It is used for fingerspelling — spelling out words letter by letter — especially for names, places, and words that do not have a dedicated sign. Different countries have their own finger alphabets, such as ASL (American), BSL (British), Auslan (Australian), LSF (French), JSL (Japanese), LSE (Spanish), LSM (Mexican), CSL (Chinese), and Arabic Sign Language."
      }
    },
    {
      "@type": "Question",
      "name": "What is the ASL alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The American Sign Language (ASL) alphabet, also known as the American Manual Alphabet, consists of 26 one-handed handshapes representing each letter of the English alphabet (A to Z). It is used by Deaf communities in the United States and Canada. ASL was influenced by French Sign Language (LSF) and is primarily used for fingerspelling proper nouns such as names, cities, and brand names."
      }
    },
    {
      "@type": "Question",
      "name": "How many letters are in the ASL alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ASL alphabet has 26 letters, matching the 26 letters of the English alphabet from A to Z. Each letter is represented by a unique one-handed handshape. Two letters — J and Z — also involve a movement or motion, tracing the shape of the letter in the air."
      }
    },
    {
      "@type": "Question",
      "name": "Is the ASL alphabet one-handed or two-handed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ASL (American Sign Language) alphabet is one-handed. All 26 letters are signed using only one hand. This is different from BSL (British Sign Language) and Auslan (Australian Sign Language), which use a two-handed fingerspelling alphabet."
      }
    },
    {
      "@type": "Question",
      "name": "What is the BSL alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The BSL (British Sign Language) alphabet is the fingerspelling system used by the Deaf community in the United Kingdom. Unlike ASL, BSL uses a two-handed alphabet where both hands work together to form each letter. It is used in England, Scotland, and Wales, with slight regional differences in some signs."
      }
    },
    {
      "@type": "Question",
      "name": "Is BSL alphabet different from ASL alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the BSL and ASL alphabets are completely different. BSL uses a two-handed fingerspelling system, while ASL uses one hand only. Although both the UK and USA use English as their spoken language, their sign languages developed independently and are not mutually intelligible."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Auslan alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auslan (Australian Sign Language) uses a two-handed fingerspelling alphabet, similar to BSL, because Auslan evolved from British Sign Language. It is the primary sign language of the Deaf community in Australia. The Auslan alphabet is used for names, places, brands, and technical words that do not have a dedicated Auslan sign."
      }
    },
    {
      "@type": "Question",
      "name": "What is the French Sign Language (LSF) alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The French Sign Language (LSF) alphabet is a one-handed fingerspelling system used by the Deaf community in France, Belgium, and parts of Switzerland. LSF is historically significant because it directly influenced American Sign Language (ASL). While both LSF and ASL are one-handed, their handshapes differ and they should be treated as separate languages."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Japanese Sign Language (JSL) alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Japanese Sign Language (JSL) does not use an A–Z alphabet. Instead, it uses a one-handed fingerspelling system based on the Japanese syllabary (Hiragana), representing syllable sounds such as a, i, u, e, o, ka, ki, ku, and so on. This reflects the structure of the Japanese written language, which is syllable-based rather than letter-based. JSL fingerspelling is used for names, borrowed words, and place names."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Spanish Sign Language (LSE) alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Spanish Sign Language (LSE) alphabet is a one-handed fingerspelling system used by the Deaf community in Spain. It is unique to Spain and is not the same as Mexican Sign Language (LSM) or other Latin American sign systems. The LSE alphabet is used for fingerspelling names, locations, technical terms, and words that do not have a specific LSE sign."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Mexican Sign Language (LSM) alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Mexican Sign Language (LSM) alphabet is a one-handed fingerspelling system used by the Deaf community in Mexico. Although Spanish is Mexico's spoken language, LSM has its own grammar, structure, and alphabet that is different from Spanish Sign Language (LSE). The LSM alphabet is used to spell names, places, and words without dedicated signs."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Chinese Sign Language (CSL) alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chinese Sign Language (CSL) is the primary sign language of the Deaf community in mainland China. Because Chinese writing is character-based rather than alphabetic, CSL does not follow a traditional A–Z finger alphabet. Instead, CSL uses expressive gestures and handshapes that reflect Chinese culture and visual communication. It has its own grammar and structure independent of spoken Mandarin."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Arabic Sign Language alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arabic Sign Language (ArSL) uses a one-handed fingerspelling system that represents the Arabic alphabet — including letters such as Alif (ا), Ba (ب), and Ta (ت) — rather than the English A–Z. It is used across many Arabic-speaking countries including Saudi Arabia, UAE, Jordan, Egypt, and Kuwait. Because Arabic is written right-to-left, many ArSL handshapes also reflect that directional flow."
      }
    },
    {
      "@type": "Question",
      "name": "How many sign language alphabets are there in the world?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There are dozens of sign language alphabets around the world, as each country or region has developed its own. Major ones include ASL (USA and Canada), BSL (UK), Auslan (Australia), LSF (France), JSL (Japan), LSE (Spain), LSM (Mexico), CSL (China), and Arabic Sign Language (Middle East and North Africa). Some are one-handed, some two-handed, and some syllable-based depending on the written language of that country."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a universal sign language alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, there is no universal sign language alphabet. Each country or region has developed its own sign language and finger alphabet based on its culture, written language, and Deaf community history. International Sign (IS) exists as a contact language used at international Deaf events, but it is not universally adopted as a standardized global sign language."
      }
    },
    {
      "@type": "Question",
      "name": "What is fingerspelling in sign language?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fingerspelling is the practice of spelling out words letter by letter using a manual or finger alphabet in sign language. It is used for proper nouns such as names and places, technical terms, or any word that does not have a dedicated sign in that language. Every major sign language has its own fingerspelling system tied to its regional alphabet."
      }
    },
    {
      "@type": "Question",
      "name": "How do I learn the sign language alphabet fast?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The fastest way to learn the sign language alphabet is to: 1) Study a visual finger alphabet chart for your chosen language. 2) Practice each handshape slowly in front of a mirror. 3) Drill the alphabet daily in order, then out of order. 4) Practice fingerspelling common words, your name, and short phrases. 5) Use online fingerspelling practice tools to build speed and receptive skills. For English speakers, the ASL alphabet is the best starting point as it is one-handed and straightforward."
      }
    },
    {
      "@type": "Question",
      "name": "Can hearing people learn the sign language alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, anyone can learn the sign language alphabet. Hearing people, parents of Deaf children, teachers, healthcare workers, and anyone wishing to communicate with the Deaf community can benefit from learning finger alphabets. It is often the first step toward learning a full sign language such as ASL or BSL."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between sign language and the sign language alphabet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The sign language alphabet (finger alphabet) is just one small part of a full sign language. A complete sign language like ASL or BSL has its own vocabulary of thousands of signs, grammar rules, sentence structure, and facial expressions. The finger alphabet is used only for fingerspelling specific words — mainly names and technical terms — and does not represent the full language."
      }
    },
    {
      "@type": "Question",
      "name": "Who uses sign language alphabets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sign language alphabets are primarily used by Deaf and hard-of-hearing individuals and their communities. They are also used by hearing people who communicate with Deaf friends, family, or colleagues. Additionally, individuals with disabilities such as Autism, Apraxia of Speech, Cerebral Palsy, and Down Syndrome may use sign language alphabets as a communication support tool."
      }
    }
  ]
};

export default function SignLanguageAlphabetPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <div className="container">
        <center>
          <h1>
            Sign Language Alphabets
          </h1>
          <p>
            Learn Sign Language Alphabets in 8+ Languages. Explore sign language alphabets from over 8 languages. Simply switch the tab to view the finger alphabet for your selected language. Sign language alphabets, also known as manual or finger alphabets, use hand shapes and movements to represent individual letters. Sign language itself is a visual communication method that relies on hand signals, gestures, facial expressions, and body language. While it is the primary mode of communication for the Deaf community, sign language is also beneficial for others. Individuals with disabilities such as Autism, Apraxia of Speech, Cerebral Palsy, and Down Syndrome may use sign language to support or enhance communication.
          </p>
        </center>
        <br />
        <div className="language-selector" id="languageSelector"></div>
        <div className="alphabet-container" id="alphabetContainer"></div>
        <div className="main-info">
          <div className="sign-language-alphabets">
            <h2>
              American Sign Language Alphabets
            </h2>
            <img src="/sign-language-alphabet/american-sign-language-alphabet.png" alt="Chart of American Sign Language Alphabet" width={867} height={511} decoding="async" />
            <p>
              The
              <strong>
                American
                <Link href="/">
                  Sign Language
                </Link>
                (ASL) alphabet
              </strong>
              , or
              <em>
                American Manual Alphabet
              </em>
              , is a visual language used by Deaf communities in the United States and Canada to communicate through signs. However, it is not a universal language. ASL uses handshapes, movement, location, palm orientation, and non-manual signals, such as facial expressions, to convey meaning. ASL developed from French Sign Language (LSF) and includes regional variations, just like spoken languages. The ASL alphabet uses one-handed handshapes to represent each letter of the English alphabet and is commonly used for fingerspelling names, places, or words that do not have a specific sign.
            </p>
            <h2>
              Spanish Sign Language (LSE) Alphabet
            </h2>
            <img src="/sign-language-alphabet/spanish-sign-language-alphabet.png" alt="Spanish Sign Language Alphabet Chart" width={753} height={569} loading="lazy" decoding="async" />
            <p>
              <strong>
                Lengua de Signos Española (LSE)
              </strong>
              is the primary visual language used by the Deaf community in Spain. It’s a beautiful and expressive language that uses handshapes, movements, and facial expressions to represent ideas and emotions.

While Spain shares a spoken language with many countries, “
              <Link href="/">
                Spanish Sign Language
              </Link>
              is unique” to Spain and is not the same as Mexican Sign Language (LSM) or Latin American sign systems. Each region within Spain,  like Madrid, Andalusia, or Catalonia, even has small variations in the way some signs are used.

The LSE alphabet is one-handed, and it’s used for fingerspelling names, locations, technical words, or any word that doesn’t have a specific sign.
            </p>
            <h2>
              Chinese Sign Language (CSL) Alphabet
            </h2>
            <img src="/sign-language-alphabet/chinese-sign-language-alphabet.png" alt="Chinese Sign Language Fingerspelling Chart" width={712} height={502} loading="lazy" decoding="async" />
            <p>
              <strong>
                <Link href="/chinese-sign-language">
                  Chinese Sign Language (CSL)
                </Link>
              </strong>
              is the primary language of the Deaf community in mainland China. It's one of the world's most fascinating sign languages because it beautifully blends visual symbols, Chinese culture, and the unique structure of the written Chinese language
CSL is not simply a signed version of Mandarin. It has its own grammar, expressions, and rhythm that reflect China’s deep linguistic diversity. While Mandarin Chinese has thousands of written characters, CSL simplifies many ideas into expressive gestures, a bridge between hand, thought, and meaning. Common Chinese Sign Language Words
            </p>
            <h2>
              Mexican Sign Language (LSM) Alphabet
            </h2>
            <img src="/sign-language-alphabet/mexian-sign-language-alphabet.png" alt="Mexican Sign Language Alphabet" width={842} height={462} loading="lazy" decoding="async" />
            <p>
              <strong>
                <Link href="/mexican-sign-language">
                  Lengua de Señas Mexicana (LSM)
                </Link>
              </strong>
              is the official sign language used by the “Deaf community in Mexico”. It is a visual and spatial language, meaning it uses handshapes, movement, facial expression, and body posture to communicate ideas.

Although Spanish is the spoken language of Mexico, LSM has its own grammar and structure and is not the same as Spanish Sign Language (LSE). It evolved naturally within Mexico’s Deaf community and reflects the country’s unique culture and linguistic identity.

The LSM alphabet is one-handed, like ASL, and is used to spell names, places, and unfamiliar words that don’t have dedicated signs.
            </p>
            <h2>
              British Sign Language (BSL) Alphabet
            </h2>
            <img src="/sign-language-alphabet/british-sign-language-alphabet.png" alt="British Sign Language Alphabet with Two Hands" width={921} height={555} loading="lazy" decoding="async" />
            <p>
              <strong>
                <Link href="/british-sign-language">
                  British Sign Language (BSL)
                </Link>
              </strong>
              is the major communicative language for the "Deaf community in the United Kingdom". Unlike ASL and LSM, both one-handed systems, BSL uses a two-handed alphabet, making it visually unique and rich in culture.
BSL is a language in its own right, with a structure, vocabulary, and syntax not founded on the word order of English. BSL developed organically within the Deaf community of the UK and is used in England, Scotland, and Wales, though there are small regional differences in some signs. The BSL alphabet is used mainly to spell out names and places or words that don't have signs. It is two-handed, so it does take a bit of coordination, but it is also highly expressive and easily recognizable once you learn it.
            </p>
            <h2>
              Australian Sign Language (Auslan) Alphabet
            </h2>
            <img src="/sign-language-alphabet/british-sign-language-alphabet.png" alt="Australian Sign Language Alphabet Chart" width={921} height={555} loading="lazy" decoding="async" />
            <p>
              <strong>
                <Link href="/australian-sign-language">
                  Auslan (Australian Sign Language)
                </Link>
              </strong>
              is the main language of the "Deaf community in Australia", which evolved from "British Sign Language (BSL)", and Scottish Sign Language (SSL). Due to this common historical background, Auslan uses a two-handed fingerspelling alphabet, just like BSL.
  
  Auslan is a fully natural language with its own grammar, sentence structure, and vocabulary. It is not derived from English, though it incorporates some English-based signs, and it has strong cultural roots within the Australian Deaf community. It varies regionally, mainly in the Northern and Southern dialects, but the fingerspelling system remains largely consistent throughout Australia.

The Auslan alphabet is used for names, places, brands, technical words, and when it's essential to make it distinct from another similar-looking sign. The two-handed structure makes it visually clear and distinct from other sign languages.
            </p>
            <h2>
              Japanese Sign Language (JSL) Alphabet
            </h2>
            <img src="/sign-language-alphabet/japanese-sign-language-alphabet.png" alt="Japanese Sign Language Syllabary Chart" width={428} height={639} loading="lazy" decoding="async" />
            <p>
              <strong>
                <Link href="/japanese-sign-language">
                  Japanese Sign Language (JSL)
                </Link>
              </strong>
              is the visual language used by the Deaf community in Japan. It is a full-fledged and natural language with its grammar, expressions, and cultural identity, not based on the word order of spoken Japanese.

In contrast to ASL or BSL, JSL does not include an A–Z alphabet. The Japanese writing system does not include any alphabetic writing, so JSL uses a one-handed fingerspelling system based on the Japanese syllabary, Hiragana* sounds, such as a, i, u, e, o, ka, ki, ku, ke, ko, and so on.

The uniqueness, expressiveness, and deep relationship with Japanese linguistic structure make the JSL manual alphabet very special. It is mostly used for **names, borrowed words, emphasis, and place names.
            </p>
            <h2>
              French Sign Language (LSF) Alphabet
            </h2>
            <img src="/sign-language-alphabet/french-sign-language-alphabet.png" alt="French Sign Language Alphabet Chart" width={451} height={633} loading="lazy" decoding="async" />
            <p>
              <strong>
                <Link href="/french-sign-language">
                  Langue des Signes Française (LSF)
                </Link>
              </strong>
              is one of the oldest and most highly influential sign languages in the world. It is used by the Deaf community across France, as well as parts of Switzerland and Belgium. LSF plays a historical role due to the fact that it influenced many modern sign languages, including American Sign Language (ASL).

LSF is a system of one-handed fingerspelling, as is ASL, but the shapes and movements are specific to French Deaf culture. It has its own full grammar, set of facial expressions, and natural linguistic structure, which is not based on spoken French.

The LSF alphabet is mainly used for names, places, technical terms, and borrowed words. Although this is a one-handed manual alphabet, several handshapes differ from ASL, and LSF should be learned as its own language rather than assuming similarities. .
            </p>
            <h2>
              Arabic Sign Language Alphabet
            </h2>
            <img src="/sign-language-alphabet/arabicalphabets.webp" alt="Arabic Sign Language Alphabet Chart" width={780} height={682} loading="lazy" decoding="async" />
            <p>
              It is known as Arabic Sign Language in several countries of the Middle East and North Africa: Saudi Arabia, the UAE, Jordan, Egypt, Kuwait, and others. Though it may have local peculiarities, it also has a standardized fingerspelling system devised to facilitate communication in everyday contexts, provide education, and thus support Deaf communities throughout the Arabic-speaking world.

ArSL utilizes the one-handed fingerspelling alphabet, yet instead of representing the English letters A–Z, it represents the Arabic alphabet, such as “ا (Alif), ب (Ba), ت (Ta)” and so on. These handshapes are visually expressive and often mirror the written shapes of Arabic letters.

ArSL is generally used for the names, countries, brands, Quranic terms, and words that don't have a specific sign. Since Arabic is written right-to-left, many ArSL signs also reflect that directional flow.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
