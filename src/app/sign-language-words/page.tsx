import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/sign-language-words.css";

export const metadata: Metadata = buildMetadata({
  "title": "Sign Language Words - Everyday Phrases With Pictures",
  "description": "Learn Sign Language words in ASL with clear images and step-by-step instructions. Search popular signs like Mom, Dad, Help, I Love You, Please & more. Free to view & download.",
  "keywords": "sign language words, ASL words, American Sign Language words, sign language dictionary, learn sign language, ASL signs with pictures, sign language images, sign language phrases",
  "path": "/sign-language-words",
  "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  "ogTitle": "Sign Language Words – ASL Signs with Images & How-To Guide",
  "ogDescription": "Search thousands of ASL sign language words with images. Learn how to sign Mom, Dad, I Love You, Help, Please and more — free image downloads included.",
  "ogImage": "/sign-language-words/i-love-you-in-sign-language.webp",
  "ogType": "website",
  "twitterCard": "summary_large_image",
  "twitterTitle": "Sign Language Words – ASL Signs with Images & How-To Guide",
  "twitterDescription": "Learn 1000+ ASL sign language words with images. Search, read instructions, and download signs for free. Perfect for beginners and learners.",
  "twitterImage": "/sign-language-words/i-love-you-in-sign-language.webp"
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sign Language Words – ASL Signs with Images",
  "url": "https://sltranslator.com/sign-language-words/",
  "description": "Search and compare thousands of ASL sign language words with images and step-by-step signing instructions. The largest free collection of sign language word images online.",
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "name": "SLTranslator",
    "url": "https://sltranslator.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sltranslator.com/sign-language-words/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "SLTranslator",
    "url": "https://sltranslator.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sltranslator.com/assets/images/sltranslatorlogo.png"
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sltranslator.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sign Language Words",
        "item": "https://sltranslator.com/sign-language-words/"
      }
    ]
  }
};

export default function SignLanguageWordsPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main>
        <div className="main-title">
          <h1>
            Sign Language Words With Pictures Free
          </h1>
          <p>
            Learn the most popular and useful sign language words with our free online ASL learning resource at SLTranslator. Whether you're a complete beginner, a parent of a deaf child, a teacher, or simply curious, this page gives you the largest free collection of ASL sign language words with pictures and step-by-step instructions. Here you'll find clear images and easy how-to guides for the most searched signs including Mom, Dad, Help, I Love You, Please, Hello, Sorry, Happy Birthday, Family, and many more. Every word includes a real photo and a simple written description so you can learn the correct handshape, placement, and movement. No video required.
          </p>
        </div>
        <div id="vr-wrapper-main">
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Mom In Sign Language
            </h2>
            <img src="/sign-language-words/mom-in-sign-language.webp" alt="Teen girl signing MOM in American Sign Language with open hand thumb touching chin" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign mom in American Sign Language (ASL), open your dominant hand with fingers spread (a 5 handshape) and tap your thumb against your chin.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Dad in Sign Language
            </h2>
            <img src="/sign-language-words/dad-in-sign-language.webp" alt="Girl demonstrating DAD in American Sign Language with open hand raised to forehead" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign Dad in American Sign Language (ASL), extend and spread your fingers on your dominant hand to form a 5 handshape, then tap your thumb against your forehead twice.
              </p>
            </div>
          </div>
        </div>
        <div id="vr-wrapper-main">
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Help In Sign Language
            </h2>
            <img src="/sign-language-words/help-in-sign-language.webp" alt="Girl showing HELP sign in ASL with thumbs-up hand resting on open flat palm" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign help in American Sign Language (ASL), place your dominant hand in a thumbs-up (or A) shape on top of your flat, palm-up non-dominant hand and move both hands upward together.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Have a Good Day in Sign Language
            </h2>
            <img src="/sign-language-words/have-a-good-day-in-sign-language.webp" alt="Child signing Have a Good Day in ASL with crossed arms and index finger pointing outward" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign Have a Good Day in American Sign Language (ASL), follow these three steps: 1)
                <b>
                  HAVE:
                </b>
                Place both hands in bent 'B' shapes, bringing fingertips to your chest. 2)
                <b>
                  GOOD:
                </b>
                Touch your dominant hand fingertips to your chin, moving it down to meet your non-dominant hand. 3)
                <b>
                  DAY:
                </b>
                Extend your non-dominant arm horizontally. Place your dominant elbow on your non-dominant hand, then arc your dominant hand down in a sunset motion.
              </p>
            </div>
          </div>
        </div>
        <div id="vr-wrapper-main">
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Hi in American Sign Language
            </h2>
            <img src="/sign-language-words/hi-in-american-sign-language.webp" alt="Woman demonstrating HI in American Sign Language with open flat hand raised beside face" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign "Hi" (or Hello) in American Sign Language (ASL), place your dominant hand near your forehead (near the temple) with fingers together and palm facing slightly outward, then move it outward and away from your body, similar to a salute.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              How Are You In ASL
            </h2>
            <img src="/sign-language-words/how-are-you-in-asl.webp" alt="Man signing How Are You in ASL with both thumbs up facing outward" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign How are you? in ASL, bring both hands into a curved shape with knuckles together, palm-down, and roll them forward to palm-up, finishing by pointing toward the person.
              </p>
            </div>
          </div>
        </div>
        <div id="vr-wrapper-main">
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              More In American Sign Language
            </h2>
            <img src="/sign-language-words/more-in-sign-language.webp" alt="Child demonstrating MORE in ASL by bringing both pinched hands together at fingertips" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                In American Sign Language (ASL), the sign for "more" is made by forming both hands into flattened O shapes (tips of fingers and thumbs touching) and tapping the fingertips together.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              I Love You In Sign Language
            </h2>
            <img src="/sign-language-words/i-love-you-in-sign-language.webp" alt="Girl making I Love You handshape in ASL with pinky, index finger, and thumb extended" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign I love you" in American Sign Language (ASL), extend your thumb, index finger, and pinky finger while keeping your middle and ring fingers closed against your palm. Hold your hand up with the palm facing forward, often with a slight back-and-forth movement for emphasis.
              </p>
            </div>
          </div>
        </div>
        <div id="vr-wrapper-main">
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Wait In American Sign Language
            </h2>
            <img src="/sign-language-words/wait-in-sign-language.webp" alt="Girl showing WAIT in ASL with one hand on chest and other hand open palm facing up" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign wait in American Sign Language (ASL), hold both hands out at chest level with palms facing upward and fingers spread apart, then wiggle or flutter your fingers. This motion often looks like you are "waiting" or wiggling your fingers patiently
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Please In Sign Language
            </h2>
            <img src="/sign-language-words/please-in-sign-language.webp" alt="Woman signing PLEASE in ASL with flat hand rubbing circular motion on chest" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign please in American Sign Language (ASL), place your flat dominant hand (fingers together, thumb extended) on the center of your chest and rub it in a circular, clockwise motion a few times.
              </p>
            </div>
          </div>
        </div>
        <div id="vr-wrapper-main">
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              What In American Sign Language
            </h2>
            <img src="/sign-language-words/what-in-asl.webp" alt="Woman demonstrating WHAT in American Sign Language with both palms open and spread outward" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign what in American Sign Language (ASL), hold both hands in front of you with palms up and fingers relaxed or slightly open, then shake them gently side-to-side while furrowing your eyebrows.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Your Wecome In Sign Language
            </h2>
            <img src="/sign-language-words/youe-welcome-in-sign-language.webp" alt="Woman signing YOU'RE WELCOME in ASL with flat hand moving forward from chin outward" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                In American Sign Language (ASL), You're Welcome is commonly signed by placing an open dominant hand (palm toward chest) on your chest and moving it forward in a polite gesture, often acknowledging thanks.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Happy Birthday In Sign Language
            </h2>
            <img src="/sign-language-words/happy-birthday-in-sign-language.webp" alt="Man demonstrating Happy Birthday in American Sign Language ASL with two-step hand gestures" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                In American Sign Language (ASL), Happy Birthday is signed by first doing the happy sign circling both open palms on your chest followed by the birthday sign—touching your middle finger from your chin to your chest.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Family In Sign Language
            </h2>
            <img src="/sign-language-words/family-sign-language.webp" alt="Person showing Family sign in ASL forming F-handshapes in a circle with both hands" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign family in American Sign Language (ASL), make the letter F with both hands, touch your thumbs and index fingers together, and move them in a circle until your pinkies touch in front of you.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Sorry In Sign Language
            </h2>
            <img src="/sign-language-words/sorry-sign-language.webp" alt="Child demonstrating Sorry in ASL with closed fist making circular motion on chest" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign sorry in American Sign Language (ASL), make a fist with your dominant hand (using an A or S handshape), place it on the center of your chest, and rub it in a small clockwise circle.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              All Done In Sign Language
            </h2>
            <img src="/sign-language-words/all-done-sign-language.webp" alt="Man signing All Done in ASL with both open palms facing outward at chest level" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign all done or finished in American Sign Language (ASL), hold both hands up with palms facing toward you, then rotate them outward to face away. This motion is frequently used for babies, toddlers, and in general conversation to indicate that a task or meal is completed.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              Hello In Sign Language
            </h2>
            <img src="/sign-language-words/hello-in-sign-langauge.webp" alt="Smiling girl demonstrating Hello in ASL with flat hand salute moving away from forehead" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                To sign hello in American Sign Language (ASL), start with your dominant hand near your forehead (like a salute) with fingers together, then move it outward and away from your body. A friendly, slight smile often accompanies this gesture to convey warmth, making it look similar to a casual salute.
              </p>
            </div>
          </div>
          <div className="vr-single-card">
            <h2 className="vr-card-heading">
              No In Sign Language
            </h2>
            <img src="/sign-language-words/no-sign-language.webp" alt="Boy showing No sign in American Sign Language ASL with index and middle fingers tapping thumb" className="vr-card-image" />
            <div className="vr-content-box">
              <p className="main-title">
                In American Sign Language (ASL), the sign for no is made by tapping your index and middle fingers against your thumb, similar to a snapping motion or a mouth closing, often accompanied by a head shake.
              </p>
            </div>
          </div>
          <article className="article">
            <h2>
              FAQs About Sign Language Words
            </h2>
            <h3>
              What are sign language words?
            </h3>
            <p>
              Sign language words are visual gestures, hand movements, facial expressions, and body language used to communicate ideas and emotions. Each sign represents a word, phrase, or concept in a specific sign language. 🤟
            </p>
            <h3>
              Are sign language words the same in every country?
            </h3>
            <p>
              No, sign language words are different across countries and regions. For example, American Sign Language (ASL) and British Sign Language (BSL) use many different signs and grammar systems. 🌍
            </p>
            <h3>
              Why are facial expressions important in sign language?
            </h3>
            <p>
              Facial expressions play a major role in sign language because they help show emotions, tone, and meaning. Without expressions, a sign can sometimes become unclear or change meaning completely. 😊
            </p>
            <h3>
              Can one sign have multiple meanings?
            </h3>
            <p>
              Yes, some signs can have different meanings depending on context, facial expressions, or movement. Just like spoken words, the meaning often depends on how and where the sign is used. ✨
            </p>
            <h3>
              Do sign language words follow grammar rules?
            </h3>
            <p>
              Yes, sign languages have their own grammar and sentence structure. The order of signs may be different from spoken languages, and movement or space can also affect meaning. 📚
            </p>
            <h3>
              Are fingerspelling and sign language words the same?
            </h3>
            <p>
              No, fingerspelling uses hand shapes to spell individual letters, while sign language words are complete signs that represent ideas or concepts directly. Fingerspelling is often used for names or unfamiliar words. 🔤
            </p>
            <h3>
              How many sign language words are there?
            </h3>
            <p>
              There are thousands of signs in every sign language, and new signs continue to develop over time. The vocabulary grows naturally as communities create signs for modern terms and technology. 📖
            </p>
            <h3>
              Can children learn sign language words easily?
            </h3>
            <p>
              Yes, children can learn sign language words very quickly, especially when exposed to them regularly. Many children use signs naturally to communicate before they fully develop spoken language skills. 👶
            </p>
            <h3>
              Do sign language words change over time?
            </h3>
            <p>
              Yes, sign language evolves just like spoken languages. New signs are created, older signs may change, and different communities can develop their own styles and variations. ⏳
            </p>
            <h3>
              Why is learning sign language words important?
            </h3>
            <p>
              Learning sign language words helps improve communication with deaf and hard-of-hearing individuals, promotes inclusion, and allows people to connect with diverse communities more effectively. 🤝
            </p>
          </article>
        </div>
      </main>
    </>
  );
}
