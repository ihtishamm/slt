import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/abc-in-sign-language.css";

export const metadata: Metadata = buildMetadata({
  "title": "ABC's in Sign Language — Learn ASL Alphabet (A–Z) Fast & Free",
  "description": "Learn the American Sign Language (ASL) alphabet from A to Z with clear hand diagrams, tips, and practice guides. Free, beginner-friendly ASL alphabet resource.",
  "keywords": "ASL alphabet, sign language ABCs, learn sign language, American Sign Language letters, fingerspelling, ASL for beginners",
  "path": "/abc-in-sign-language",
  "ogTitle": "ABC's in Sign Language — Learn ASL Alphabet (A–Z)",
  "ogDescription": "Master the ASL alphabet with clear visuals and step-by-step guides. Learn all 26 letters of American Sign Language today.",
  "ogType": "website"
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "ABC's in Sign Language — Learn ASL Alphabet (A–Z)",
    "url": "https://sltranslator.com/abc-in-sign-language/",
    "description": "Learn all 26 letters of the American Sign Language alphabet with clear visuals, handshape tips, a practice quiz, and step-by-step beginner guidance.",
    "educationalLevel": "Beginner",
    "learningResourceType": [
      "Guide",
      "Interactive",
      "Quiz"
    ],
    "teaches": "ASL Fingerspelling Alphabet",
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "American Sign Language (ASL)"
    },
    "provider": {
      "@type": "Organization",
      "name": "SLTranslator",
      "url": "https://sltranslator.com/",
      "email": "info@sltranslator.com"
    },
    "hasPart": [
      {
        "@type": "WebPageElement",
        "name": "ASL Alphabet Grid (A–Z)"
      },
      {
        "@type": "WebPageElement",
        "name": "Step-by-Step Learning Guide"
      },
      {
        "@type": "Quiz",
        "name": "Quick Sign Quiz"
      },
      {
        "@type": "WebPageElement",
        "name": "Pro Tips for Faster Fingerspelling"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to learn the ASL alphabet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most beginners can memorize all 26 handshapes within 1–3 days of practice. Smooth, readable fingerspelling takes a few weeks of daily repetition. Consistent 5-minute daily practice is the fastest path."
        }
      },
      {
        "@type": "Question",
        "name": "Is ASL used everywhere in the world?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No — American Sign Language (ASL) is primarily used in the United States and Canada. Other countries have their own sign languages: British Sign Language (BSL), Auslan in Australia, and over 300 documented sign languages globally. However, ASL has significant international influence."
        }
      },
      {
        "@type": "Question",
        "name": "Which letters are hardest to learn in ASL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most commonly confused letters are A, E, S, N, and M because they share similar fist-like shapes. G/Q and D/F are also frequently mixed up. Focus extra time on these pairs and study them side-by-side."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need both hands for the ASL alphabet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The ASL manual alphabet uses only one hand — your dominant hand. British Sign Language (BSL) uses a two-handed alphabet, which is a key difference between the two systems."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between ASL and fingerspelling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fingerspelling uses handshapes to spell individual letters — it is part of ASL. ASL itself is a complete language with its own vocabulary, grammar, and syntax. The alphabet is a tool within ASL, used for names, technical terms, or words without a dedicated sign."
        }
      }
    ]
  }
];

export default function AbcInSignLanguagePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <FaqAccordion />
      <ScrollReveal />
      <section className="hero" aria-label="Page introduction">
        <div className="hero-eyebrow">
          American Sign Language
        </div>
        <h1>
          The ABC's
          <br />
          in
          <em>
            Sign
          </em>
          <br />
          Language
        </h1>
        <p className="hero-sub">
          Master all 26 letters of the American
          <Link href="/sign-language-alphabet">
            Sign Language alphabet
          </Link>
          . Learn fingerspelling with clear visuals and practice every day.
        </p>
        <div className="hero-cta">
          <a href="#alphabet" className="btn-primary">
            Start Learning
          </a>
          <a href="#quiz" className="btn-ghost">
            Take the Quiz
          </a>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>
            Scroll
          </span>
          <div className="scroll-line"></div>
        </div>
      </section>
      <div className="stats-strip" aria-label="Key facts">
        <div className="stat-item">
          <span className="stat-num">
            26
          </span>
          <span className="stat-label">
            Letters
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-num">
            500K+
          </span>
          <span className="stat-label">
            ASL Users in US
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-num">
            ~10
          </span>
          <span className="stat-label">
            Min to Learn Basics
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-num">
            1817
          </span>
          <span className="stat-label">
            Year ASL Was Founded
          </span>
        </div>
      </div>
      <section className="section alphabet-section" id="alphabet">
        <div className="section-inner">
          <span className="section-label">
            The Full Alphabet
          </span>
          <h2 className="section-title">
            All 26 Letters, A to Z
          </h2>
          <p className="section-desc">
            Click any letter to see a handshape tip. Hover to see the sign come alive.
          </p>
          <div className="alphabet-grid" id="alphabetGrid" role="list" aria-label="ASL alphabet letters"></div>
        </div>
      </section>
      <section className="section how-section" id="how">
        <div className="section-inner">
          <span className="section-label">
            Getting Started
          </span>
          <h2 className="section-title">
            How to Learn the ASL Alphabet
          </h2>
          <p className="section-desc">
            Follow these steps to go from zero to fluent fingerspelling in just a few days.
          </p>
          <div className="steps-grid reveal">
            <div className="step-card">
              <span className="step-num">
                01
              </span>
              <span className="step-icon">
                👁️
              </span>
              <div className="step-title">
                Study the shapes
              </div>
              <p className="step-text">
                Look at each handshape carefully. Notice how fingers bend, touch, or point. Compare similar letters like A, S, and E.
              </p>
            </div>
            <div className="step-card">
              <span className="step-num">
                02
              </span>
              <span className="step-icon">
                🤲
              </span>
              <div className="step-title">
                Mirror the sign
              </div>
              <p className="step-text">
                Hold your dominant hand at shoulder height in front of your chest. Use a mirror or camera to check your form.
              </p>
            </div>
            <div className="step-card">
              <span className="step-num">
                03
              </span>
              <span className="step-icon">
                🔁
              </span>
              <div className="step-title">
                Repeat in groups
              </div>
              <p className="step-text">
                Learn letters in clusters: A–E, F–K, L–R, S–Z. Repeat each group 10 times before moving on.
              </p>
            </div>
            <div className="step-card">
              <span className="step-num">
                04
              </span>
              <span className="step-icon">
                📝
              </span>
              <div className="step-title">
                Fingerspell real words
              </div>
              <p className="step-text">
                Start with your name, then short words. Fingerspell everything around you — signs, menus, labels.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section quiz-section" id="quiz">
        <div className="section-inner">
          <span className="section-label">
            Test Yourself
          </span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Quick Sign Quiz
          </h2>
          <p className="section-desc" style={{ margin: "0 auto 40px", textAlign: "center" }}>
            Which letter does this hand sign represent?
          </p>
          <div className="quiz-box reveal">
            <span className="quiz-question" id="quizEmoji" aria-label="Hand sign to identify">
              🤟
            </span>
            <p className="quiz-prompt">
              Which letter is this?
            </p>
            <div className="quiz-options" id="quizOptions" role="group" aria-label="Answer choices"></div>
            <p className="quiz-feedback" id="quizFeedback" aria-live="polite"></p>
            <p className="quiz-score" id="quizScore">
              Score: 0 / 0
            </p>
            <button className="quiz-next" id="quizNext" style={{ display: "none" }}>
              Next question →
            </button>
          </div>
        </div>
      </section>
      <section className="section tips-section" id="tips">
        <div className="section-inner">
          <span className="section-label" style={{ color: "rgba(217,79,43,0.85)" }}>
            Pro Tips
          </span>
          <h2 className="section-title">
            Tips for Faster Learning
          </h2>
          <p className="section-desc">
            Small habits that will make a big difference in your fingerspelling fluency.
          </p>
          <div className="tips-grid reveal">
            <div className="tip-card">
              <span className="tip-tag">
                Muscle Memory
              </span>
              <div className="tip-title">
                Practice before bed
              </div>
              <p className="tip-body">
                Signing through the alphabet right before sleep helps lock muscle memory. Even 2 minutes nightly compounds over weeks.
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-tag">
                Common Confusion
              </span>
              <div className="tip-title">
                A, E, S, N, M — know your look-alikes
              </div>
              <p className="tip-body">
                These five letters confuse most beginners. A has a tucked thumb on the side. S wraps fingers over thumb. E curls all fingers to thumb.
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-tag">
                Speed Building
              </span>
              <div className="tip-title">
                Smooth beats fast
              </div>
              <p className="tip-body">
                Don't rush transitions. A fluid, smooth transition between letters is far more readable than fast, choppy signing.
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-tag">
                Vocabulary
              </span>
              <div className="tip-title">
                Fingerspell daily objects
              </div>
              <p className="tip-body">
                Walk through your house and fingerspell every object you see — DOOR, LAMP, CHAIR. Real-world repetition sticks best.
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-tag">
                Hand Position
              </span>
              <div className="tip-title">
                Keep your hand steady
              </div>
              <p className="tip-body">
                Hold your hand in a fixed "signing space" — roughly between chin and chest, dominant side. Moving it around makes reading harder.
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-tag">
                Consistency
              </span>
              <div className="tip-title">
                5 minutes daily beats 1 hour weekly
              </div>
              <p className="tip-body">
                Short, daily practice sessions build fluency faster than long, infrequent ones. Commit to just 5 focused minutes per day.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section faq-section" id="faq">
        <div className="section-inner">
          <span className="section-label">
            Common Questions
          </span>
          <h2 className="section-title">
            Frequently Asked
          </h2>
          <p className="section-desc">
            Everything you need to know about learning the American
            <Link href="/">
              sign Language
            </Link>
            alphabet.
          </p>
          <div className="faq-list reveal" role="list">
            <div className="faq-item" role="listitem" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="faq-q" aria-expanded="false" itemProp="name">
                How long does it take to learn the ASL alphabet?
                <span className="faq-icon">
                  +
                </span>
              </button>
              <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">
                  Most beginners can memorize all 26 handshapes within 1–3 days of practice. Smooth, readable fingerspelling takes a few weeks of daily repetition. Consistent 5-minute daily practice is the fastest path.
                </span>
              </div>
            </div>
            <div className="faq-item" role="listitem" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="faq-q" aria-expanded="false" itemProp="name">
                Is ASL used everywhere in the world?
                <span className="faq-icon">
                  +
                </span>
              </button>
              <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">
                  No — American Sign Language (ASL) is primarily used in the United States and Canada. Other countries have their own sign languages: British Sign Language (BSL), Auslan in Australia, and over 300 documented sign languages globally. However, ASL has significant international influence.
                </span>
              </div>
            </div>
            <div className="faq-item" role="listitem" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="faq-q" aria-expanded="false" itemProp="name">
                Which letters are hardest to learn?
                <span className="faq-icon">
                  +
                </span>
              </button>
              <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">
                  The most commonly confused letters are A, E, S, N, and M because they share similar fist-like shapes. Also, G/Q and D/F are often mixed up. Focus extra time on these pairs and study them side-by-side.
                </span>
              </div>
            </div>
            <div className="faq-item" role="listitem" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="faq-q" aria-expanded="false" itemProp="name">
                Do I need both hands for the ASL alphabet?
                <span className="faq-icon">
                  +
                </span>
              </button>
              <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">
                  The ASL manual alphabet uses only one hand (your dominant hand). British Sign Language (BSL) uses a two-handed alphabet, which is a key difference between the two systems.
                </span>
              </div>
            </div>
            <div className="faq-item" role="listitem" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="faq-q" aria-expanded="false" itemProp="name">
                What's the difference between ASL and fingerspelling?
                <span className="faq-icon">
                  +
                </span>
              </button>
              <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">
                  Fingerspelling uses handshapes to spell individual letters — it's part of ASL. ASL itself is a complete, rich language with its own vocabulary, grammar, and syntax. The alphabet is a tool within ASL, used for names, technical terms, or words without a dedicated sign.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="practice-banner">
        <h2>
          Ready to talk with your hands?
        </h2>
        <p>
          The alphabet is just the beginning. Start fingerspelling your name today — it takes less than 5 minutes.
        </p>
        <a href="#alphabet" className="btn-primary" style={{ background: "#fff", color: "var(--accent2)" }}>
          Practice Now
        </a>
      </section>
    </>
  );
}
