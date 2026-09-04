import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Translator from "@/components/translator/Translator";
import { ImageZoomProvider, ZoomableImage } from "@/components/ui/ImageZoom";
import LazyVideo from "@/components/ui/LazyVideo";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/home.css";

export const metadata: Metadata = buildMetadata({
  "title": "Sign Language Translator | Learn ASL Alphabets & Words",
  "description": "Convert text to sign language instantly with SLTranslator.com. Use our free ASL translator to learn the American Sign Language alphabet, words, and visual hand signs. ",
  "keywords": "asl translator, asl, sign language translator, american sign language, asl alphabet, asl dictionary sign language alphabet, english to asl, asl dictionary, fingerspelling translator, deaf communication, sign language converter, asl learning tool",
  "path": "/",
  "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  "ogTitle": "Sign Language Translator |  ASL Dictionary & More",
  "ogDescription": "SLTranslator.com is a free sign language translator and generator that converts text to ASL and sign language to English. Easy-to-use tool for translating ASL and more.",
  "ogImage": "/assets/images/iloveyou.png",
  "ogType": "website",
  "twitterCard": "summary_large_image",
  "twitterTitle": "Sign Language Translator |  ASL Dictionary & More",
  "twitterDescription": "SLTranslator.com is a free sign language translator and generator that converts text to ASL and sign language to English. Easy-to-use tool for translating ASL and more.",
  "twitterImage": "/assets/images/iloveyou.png"
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Sign Language Translator",
      "url": "https://sltranslator.com/",
      "description": "Free online tool to convert English text to ASL signs and sign language to English. Supports ASL, BSL, Auslan, and more.",
      "applicationCategory": "EducationApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "image": "https://sltranslator.com/assets/images/iloveyou.png",
      "publisher": {
        "@type": "Organization",
        "name": "SLTranslator",
        "url": "https://sltranslator.com/",
        "logo": "https://sltranslator.com/assets/images/sltranslatorlogo.png",
        "email": "info@sltranslator.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is sign language universal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. There are over 300 sign languages worldwide, and they are generally not mutually intelligible."
          }
        },
        {
          "@type": "Question",
          "name": "Can Google Translate do sign language?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, Google Translate does not currently support live sign language translation. Dedicated tools like SLTranslator are used for this purpose."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to learn sign language?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Basic conversational ASL can be learned in 3–6 months with regular practice. Full fluency may take several years."
          }
        },
        {
          "@type": "Question",
          "name": "How to say please in sign language?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Place your flat right hand on the center of your chest and move it in a small clockwise circle."
          }
        }
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
    <ImageZoomProvider>
        <main>
          <div className="main-title">
            <h1>
              Sign Language Translator
            </h1>
            <p>
              Translate English text into ASL signs using our powerful online sign language tool. It is a free sign language generator & translator to convert asl to english and more. Convert sign language words to english or text to asl with our free asl translator. Enjoy effortless, real-time American sign language translation instantly accessible on both desktop and mobile. This tool converts text into sign language and displays the results on screen to assist Deaf and hard-of-hearing individuals.
            </p>
          </div>
          <Translator alphabet="asl" heading={"Text To American Sign Language"} convertLabel={"Convert to ASL Sign Language"} />
        </main>
        <div className="container">
          <article className="article">
            <h2>
              About SLTranslator (Sign Language Generator)
            </h2>
            <div className="row">
              <div className="col-md-4">
                <LazyVideo videoId="dqmuJrdLO1Y" thumbnail="/assets/images/peoples-in-sign-language.webp" alt={"how to call Different peoples in sign langauge"} />
              </div>
              <div className="col-md-8">
                <p>
                  American Sign Language (ASL) is a natural language used by the deaf and hard-of-hearing communities in the USA and Canada. It is one of the most widely used sign languages in the world. ASL uses a one-hand fingerspelling system for the English alphabet.
                </p>
                <p>
                  This SLTranslator tool easily converts English text into sign language hand symbols. You can use this tool for both teaching and learning American Sign Language. Translating text into sign language is also helpful for students to complete sign language assignments. It allows them to produce accurate answers, and because the visual remains on screen, students can follow the hand movements at their own pace.
                </p>
                <p>
                  This page is designed as a tool that translates text into sign language representations, primarily focusing on American Sign Language (ASL). It allows users to input the text in an input box to generate the sign language. After entering text, users click the "Convert to ASL Sign Language" button to generate visual sign language representations in the results section below.
                </p>
                <p>
                  We also offer several customization options for the translation like capitalized letters and adjusting the overall size of the sign representations using a dropdown menu. Results area also offers two viewing modes Words View and Letters View allowing users to see either complete word translations or individual letter signs.
                </p>
                <p>
                  Additionally, the show alphabet button displays the complete ASL alphabet for reference. This site also supports multiple sign languages like British, Chinese, French, Mexican, Spanish, and Australian sign language translation options.
                </p>
              </div>
              <h2>
                Popular Words in American Sign Language
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <ZoomableImage src="/assets/images/peoples-in-sign-language.webp" alt="How to say Mother, Father, Baby, Friend, Boy, Girl, Woman, Man, Sister, Brother, Grandma, Grandpa, Teacher, Family, Neighbor in sign Language" style={{ width: "100%", maxWidth: "48%", height: "auto", cursor: "pointer" }}  />
                <ZoomableImage src="/assets/images/expresion-in-sign-language.webp" alt="How to say You're Welcome, Please, Thank You, No, Yes, Hello, Sorry, Help, More, Goodbye, Excuse Me, Sign, Fingerspell, Okay, Time/Now in Sign Language" style={{ width: "100%", maxWidth: "48%", height: "auto", cursor: "pointer" }}  />
              </div>
              <br />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <ZoomableImage src="/assets/images/feeling-in-sign-language.webp" alt="How to say Love, Hurt, Finished, Hungry, Tired, Think, Have, Feel, Silly, Good, Bad, Know, Like, Understand in Sign Language" style={{ width: "100%", maxWidth: "48%", height: "auto", cursor: "pointer" }}  />
                <ZoomableImage src="/assets/images/places-in-sign-language.webp" alt="How to say House, Work, Home, Outside, Bathroom, Milk, School, Water, Bath, Bed, Cat, Dog, Store, Name, Food in Sign Language" style={{ width: "100%", maxWidth: "48%", height: "auto", cursor: "pointer" }}  />
              </div>
              <br />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <ZoomableImage src="/assets/images/popular-words-in-sign-language.webp" alt="How to say ASL, Hello, Deaf, Love, I Love You, Mother, Father, Baby, Friend, School, Yes, No, Please, Thank You, Bathroom in Sign Language" style={{ width: "100%", maxWidth: "48%", height: "auto", cursor: "pointer" }}  />
                <ZoomableImage src="/assets/images/all-feeling-in-sign-language.webp" alt="How to say Yes, No, Thank You, Sorry, Hello, I Love You, Goodbye, Please, You Are Welcome, Family, House, Love in Sign Language" style={{ width: "100%", maxWidth: "48%", height: "auto", cursor: "pointer" }}  />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Thank You in ASL
                  </h2>
                  <img src="/assets/images/thank-you-in-american-sign-language.webp" alt="Two-step guide showing woman signing Thank You in ASL — hand to chin then extending forward" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    How Are You In ASL
                  </h2>
                  <img src="/assets/images/how-are-you-in-asl.webp" alt="Man demonstrating How Are You in ASL sign language with both thumbs up gesture on white background" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    I Love You In ASL
                  </h2>
                  <img src="/assets/images/i-love-you-in-american-sign-language.webp" alt="Man signing I Love You in American Sign Language with pinky, index finger, and thumb extended" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    What in American Sign Language
                  </h2>
                  <img src="/assets/images/what-in-american-sign-language.webp" alt="Woman demonstrating What in ASL sign language with both palms up and surprised facial expression" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Hi in American Sign Language
                  </h2>
                  <img src="/assets/images/hi-in-american-sign-language.webp" alt="What In ASL" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Please in American Sign Language
                  </h2>
                  <img src="/assets/images/please-in-asl.webp" alt="Woman demonstrating Please in ASL by rubbing flat hand in circles on chest with motion arrows" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    More In American Sign Language
                  </h2>
                  <img src="/sign-language-words/more-in-sign-language.webp" alt="Child demonstrating MORE in ASL by bringing both pinched hands together at fingertips" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Wait In American Sign Language
                  </h2>
                  <img src="/sign-language-words/wait-in-sign-language.webp" alt="Girl showing WAIT in ASL with one hand on chest and other hand open palm facing up" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    You're Welcome In Sign Language
                  </h2>
                  <img src="/sign-language-words/youe-welcome-in-sign-language.webp" alt="Woman signing YOU'RE WELCOME in ASL with flat hand moving forward from chin outward" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Happy Birthday In Sign Language
                  </h2>
                  <img src="/sign-language-words/happy-birthday-in-sign-language.webp" alt="Man demonstrating Happy Birthday in American Sign Language ASL with two-step hand gestures" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Family In Sign Language
                  </h2>
                  <img src="/sign-language-words/family-sign-language.webp" alt="Person showing Family sign in ASL forming F-handshapes in a circle with both hands" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Sorry In Sign Language
                  </h2>
                  <img src="/sign-language-words/sorry-sign-language.webp" alt="Child demonstrating Sorry in ASL with closed fist making circular motion on chest" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    All Done In Sign Language
                  </h2>
                  <img src="/sign-language-words/all-done-sign-language.webp" alt="Man signing All Done in ASL with both open palms facing outward at chest level" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
                <div style={{ flex: "1 1 calc(50% - 10px)", minWidth: "280px", boxSizing: "border-box" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 10px" }}>
                    Hello In Sign Language
                  </h2>
                  <img src="/sign-language-words/hello-in-sign-langauge.webp" alt="Smiling girl demonstrating Hello in ASL with flat hand salute moving away from forehead" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", marginBottom: "10px" }} width={540} height={540} loading="lazy" decoding="async" />
                </div>
              </div>
              <h2>
                How to Use Sign Language Translator?
              </h2>
              <p>
                Our sign language translator converts your input letters or words into sign language hand signs. Simply enter your text and click the convert button to view the sign images. It’s simple and easy to use. Here's how to use this Sign Language Translator:
              </p>
              <div className="row">
                <div className="col-lg-4">
                  <div className="step-card">
                    <div className="step-icon">
                      1
                    </div>
                    <div className="step-content">
                      <h5>
                        Input Alphabets
                      </h5>
                      <p>
                        Enter or paste your Alphabets into the top text box and see the cool previews of hands instantly.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="step-card">
                    <div className="step-icon">
                      2
                    </div>
                    <div className="step-content">
                      <h5>
                        View The Hands Style
                      </h5>
                      <p>
                        You can view below the sign of those Alphabets in the below result section and view all Alphabets.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="step-card">
                    <div className="step-icon">
                      3
                    </div>
                    <div className="step-content">
                      <h5>
                        Select The Translator
                      </h5>
                      <p>
                        Selected translator is ASL, You can choose language and get accurate alphabets translation below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2>
                  About Best Sign Language Translator
                </h2>
                <p>
                  SLTranslator.com is a free and easy-to-use online Sign Language translator tool. Instantly convert text into hand signs and learn sign language visually. Whether you're exploring the ASL alphabet or translating common words, our tool provides clear visual guides for effective learning.
                </p>
                <p>
                  Generate visual sign messages in seconds, perfect for learning, teaching, or communication support. Start using the ASL Translator or explore other supported languages by entering your text in the input box and viewing the translated signs instantly in the output.
                </p>
                <p>
                  This tool quickly converts English text into sign language symbols, making it an excellent resource for teaching and learning American Sign Language (ASL). For Example, I have written
                  <b>
                    I Love You
                  </b>
                  . Now check below the translation of this input.
                </p>
                <img src="/assets/images/iloveyou.png" alt=" I Love You" width={1207} height={402} loading="lazy" decoding="async" />
                <h2>
                  American Sign Language Alphabet A-Z & 0-9
                </h2>
                <p>
                  ASL is one of the most widely used sign languages in the world. Although it uses the same alphabet as English for fingerspelling, it is not a subset of the English language. The sentence structure and grammar in ASL are distinct from English, following its own unique linguistic rules. We have created a list of alphabets in sign language using the Show Alphabet button. You can also view the preview of all American sign language (ASL) alphabets below.
                </p>
                <img src="/assets/images/alphabets-in-sign-language.png" alt="Alphabet In Sign Language" width={867} height={511} loading="lazy" decoding="async" />
                <p>
                  Now Check the list of all Alphabet In Sign Language from A To Z and 0 to 9 with a proper sign. We have also list a most common word in sign language below.
                </p>
              </div>
              <div className="alphabet-grid">
                <div className="alphabet-card">
                  <h3>
                    A
                  </h3>
                  <img src="/assets/images/a.webp" alt="A in sign language" width={135} height={156} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    B
                  </h3>
                  <img src="/assets/images/b.webp" alt="B in sign language" width={160} height={136} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    C
                  </h3>
                  <img src="/assets/images/c.webp" alt="C in sign language" width={166} height={140} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    D
                  </h3>
                  <img src="/assets/images/d.webp" alt="D in sign language" width={145} height={130} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    E
                  </h3>
                  <img src="/assets/images/e.webp" alt="E in sign language" width={155} height={134} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    F
                  </h3>
                  <img src="/assets/images/f.webp" alt="F in sign language" width={140} height={122} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    G
                  </h3>
                  <img src="/assets/images/g.webp" alt="G in sign language" width={143} height={154} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    H
                  </h3>
                  <img src="/assets/images/h.webp" alt="G in sign language" width={159} height={148} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    I
                  </h3>
                  <img src="/assets/images/i.webp" alt="I in sign language" width={141} height={147} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    J
                  </h3>
                  <img src="/assets/images/j.webp" alt="J in sign language" width={138} height={148} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    K
                  </h3>
                  <img src="/assets/images/k.webp" alt="k in sign language" width={151} height={155} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    L
                  </h3>
                  <img src="/assets/images/l.webp" alt="k in sign language" width={138} height={146} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    M
                  </h3>
                  <img src="/assets/images/m.webp" alt="M in sign language" width={139} height={151} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    N
                  </h3>
                  <img src="/assets/images/n.webp" alt="N in sign language" width={148} height={151} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    O
                  </h3>
                  <img src="/assets/images/o.webp" alt="O in sign language" width={153} height={144} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    P
                  </h3>
                  <img src="/assets/images/p.webp" alt="p in sign language" width={140} height={150} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    Q
                  </h3>
                  <img src="/assets/images/q.webp" alt="Q in sign language" width={141} height={145} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    R
                  </h3>
                  <img src="/assets/images/r.webp" alt="r in sign language" width={145} height={154} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    S
                  </h3>
                  <img src="/assets/images/s.webp" alt="S in sign language" width={137} height={149} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    T
                  </h3>
                  <img src="/assets/images/t.webp" alt="t in sign language" width={143} height={147} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    U
                  </h3>
                  <img src="/assets/images/u.webp" alt="U in sign language" width={119} height={153} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    V
                  </h3>
                  <img src="/assets/images/v.webp" alt="v in sign language" width={146} height={147} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    W
                  </h3>
                  <img src="/assets/images/w.webp" alt="W in sign language" width={156} height={145} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    X
                  </h3>
                  <img src="/assets/images/x.webp" alt="X in sign language" width={141} height={145} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    Y
                  </h3>
                  <img src="/assets/images/y.webp" alt="Y in sign language" width={129} height={136} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    Z
                  </h3>
                  <img src="/assets/images/z.webp" alt="z in sign language" width={138} height={153} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    0
                  </h3>
                  <img src="/assets/images/0.webp" alt="0 in sign language" width={155} height={157} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    1
                  </h3>
                  <img src="/assets/images/1.webp" alt="1 in sign language" width={151} height={145} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    2
                  </h3>
                  <img src="/assets/images/z.webp" alt="2 in sign language" width={138} height={153} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    3
                  </h3>
                  <img src="/assets/images/3.webp" alt="3 in sign language" width={143} height={155} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    4
                  </h3>
                  <img src="/assets/images/4.webp" alt="4 in sign language" width={136} height={145} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    5
                  </h3>
                  <img src="/assets/images/5.webp" alt="5 in sign language" width={159} height={136} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    6
                  </h3>
                  <img src="/assets/images/6.webp" alt="6 in sign language" width={157} height={155} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    7
                  </h3>
                  <img src="/assets/images/7.webp" alt="7 in sign language" width={154} height={148} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    8
                  </h3>
                  <img src="/assets/images/8.webp" alt="8 in sign language" width={147} height={149} loading="lazy" decoding="async" />
                </div>
                <div className="alphabet-card">
                  <h3>
                    9
                  </h3>
                  <img src="/assets/images/9.webp" alt="9 in sign language" width={132} height={148} loading="lazy" decoding="async" />
                </div>
              </div>
              <br />
            </div>
            <h2>
              FAQs About Sign Language Translator
            </h2>
            <h3>
              How to learn sign language?
            </h3>
            <p>
              To learn sign language, begin with the alphabet and basic vocabulary using online resources such as apps and videos, and consider enrolling in formal courses. Sign language translators are also a fun, fast, and easy way to practice. Our articles  help you build the skills you need for real-life communication.
            </p>
            <h3>
              Is sign language universal?
            </h3>
            <p>
              No, sign language is not universal. Different sign languages are usually not mutually intelligible, although some share similarities. In fact, there are more than 300 different sign languages used around the world. 🌍
            </p>
            <h3>
              How to say please in sign language?
            </h3>
            <p>
              To say "please" in American Sign Language (ASL), place your flat right hand on the center of your chest and move it in a small clockwise circle. This is similar to the sign for "sorry," but instead of using a closed S-handshape, "please" uses a flat hand. 🙏
            </p>
            <h3>
              When was sign language invented?
            </h3>
            <p>
              Sign language wasn’t invented at a specific time—it developed naturally alongside human civilizations and deaf communities. The first written record appeared in 1620 with Juan Pablo de Bonet’s manual alphabet. In 1755, Abbé de l’Épée opened the first public school for the deaf in Paris. 📜
            </p>
            <h3>
              How to say you're welcome in sign language?
            </h3>
            <p>
              To say "You're welcome" in American Sign Language (ASL), place your flat, open, dominant hand at your chin and move it outward in a small arc away from your face. The gesture mirrors the act of acknowledging someone’s thanks, as if you are politely returning their gratitude. 😊
            </p>
            <h3>
              How to say hello in sign language?
            </h3>
            <p>
              To say "Hello" in American Sign Language (ASL), extend your fingers with your thumb crossed in front of your palm. Place your hand near your ear and then move it outward and away from your body. A friendly facial expression and eye contact are also important to convey the greeting. 🫡
            </p>
            <h3>
              How to say sorry in sign language?
            </h3>
            <p>
              To say "sorry" in American Sign Language (ASL), make a fist and place it over your chest, right above your heart. Rub the fist in a circular motion a few times while showing a sincere facial expression. Think of it as feeling sorry in your heart—this cue can help you remember the sign.
            </p>
            <h3>
              How long does it take to learn sign language?
            </h3>
            <p>
              Basic conversational ASL can be learned in 3-6 months with regular practice. Mastery can take years, depending on fluency goals. ⏳
            </p>
            <h3>
              Who invented sign language?
            </h3>
            <p>
              No single person "invented" sign language, as it developed naturally in communities of deaf individuals over centuries, but Abbé Charles-Michel de l’Épée is often credited with formalizing French Sign Language in the 1700s. ASL evolved from this. 🧑‍🏫
            </p>
            <h3>
              Can Google Translate do sign language?
            </h3>
            <p>
              No, Google Translate does not currently support live sign language translation. However, there are separate apps and tools for this purpose. 📱
            </p>
          </article>
        </div>
    </ImageZoomProvider>
    </>
  );
}
