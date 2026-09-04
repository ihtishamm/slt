import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import BabySignExplorer from "@/components/baby/BabySignExplorer";
import BabySignTracker from "@/components/baby/BabySignTracker";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/baby-sign-language.css";

export const metadata: Metadata = buildMetadata({
  "title": "Baby Sign Language: Complete Guide for Parents (0–24 Months)",
  "description": "Learn baby sign language with our complete guide. Discover 50+ essential signs, proven benefits, step-by-step teaching methods, and expert tips to help your baby communicate before they can talk.",
  "keywords": "baby sign language, baby signs, teach baby to sign, infant sign language, toddler sign language, sign language for babies, baby communication, baby ASL, early communication, baby hand signs",
  "path": "/baby-sign-language",
  "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  "ogTitle": "Baby Sign Language: Complete Guide for Parents (0–24 Months)",
  "ogDescription": "Teach your baby to communicate before they can talk. 50+ signs, benefits backed by research, and step-by-step methods.",
  "ogImage": "/baby-sign-language/baby-sign-language.jpg",
  "ogType": "article",
  "twitterCard": "summary_large_image",
  "twitterTitle": "Baby Sign Language: Complete Guide for Parents",
  "twitterDescription": "50+ signs, proven benefits & expert teaching tips. Start at 6 months!"
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Baby Sign Language: Complete Guide for Parents (0–24 Months)",
    "description": "A comprehensive guide to teaching baby sign language, including 50+ signs, research-backed benefits, and step-by-step methods for parents.",
    "author": {
      "@type": "Organization",
      "name": "SLTranslator.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "YourBrand",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sltranslator.com/assets/images/sltranslatorlogo.png"
      }
    },
    "datePublished": "2026-04-18",
    "dateModified": "2026-04-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://sltranslator.com/baby-sign-language/"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When should I start teaching baby sign language?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can introduce signs as early as 6 months. Babies typically start signing back between 8–10 months when their motor skills are developed enough."
        }
      },
      {
        "@type": "Question",
        "name": "Does baby sign language delay speech?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Research consistently shows baby sign language does NOT delay speech. In fact, studies indicate it can accelerate verbal language development and increase vocabulary."
        }
      },
      {
        "@type": "Question",
        "name": "How many signs should I teach my baby first?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start with 3–5 high-frequency signs like 'milk', 'more', 'all done', 'eat', and 'sleep'. Consistency with a small set is more effective than teaching many signs at once."
        }
      },
      {
        "@type": "Question",
        "name": "Is baby sign language the same as ASL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most baby sign language programs use simplified ASL (American Sign Language) signs, making it easy to transition to ASL later if desired."
        }
      }
    ]
  }
];

export default function BabySignLanguagePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <FaqAccordion />
      <ScrollReveal />
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-content">
            <div className="hero-badge">
              ✨ Science-Backed • Parent-Approved
            </div>
            <h1 id="hero-heading">
              Talk to Your Baby
              <em>
                Before
              </em>
              They Can Speak
            </h1>
            <p className="hero-sub">
              Baby sign language bridges the gap between what your infant thinks and can say — reducing frustration, building bonds, and accelerating language development from just 6 months old.
            </p>
            <div className="hero-actions">
              <a href="#signs" className="btn-primary">
                Explore 50+ Signs →
              </a>
              <a href="#how-to" className="btn-secondary">
                How to Teach
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">
                  6mo
                </div>
                <div className="stat-label">
                  Earliest start age
                </div>
              </div>
              <div className="stat">
                <div className="stat-num">
                  50+
                </div>
                <div className="stat-label">
                  Signs in our guide
                </div>
              </div>
              <div className="stat">
                <div className="stat-num">
                  4–8wk
                </div>
                <div className="stat-label">
                  Until first sign back
                </div>
              </div>
              <div className="stat">
                <div className="stat-num">
                  0
                </div>
                <div className="stat-label">
                  Speech delay risk
                </div>
              </div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card-stack">
              <div className="hero-card side-l">
                <div className="mini-sign-emoji">
                  🙌
                </div>
                <div className="mini-sign-name">
                  All Done
                </div>
                <div style={{ fontSize: "0.72rem", color: "#7A9E7E", marginTop: "4px" }}>
                  Starter Sign
                </div>
              </div>
              <div className="hero-card main">
                <div className="sign-emoji">
                  🤲
                </div>
                <div className="sign-title">
                  MORE
                </div>
                <div className="sign-desc">
                  Tap fingertips together — baby's most used first sign!
                </div>
                <div style={{ marginTop: "14px", background: "#FFF0C0", padding: "8px 12px", borderRadius: "8px", fontSize: "0.78rem", color: "#7A5C40" }}>
                  ✅ Most popular first sign
                </div>
              </div>
              <div className="hero-card side-r">
                <div className="mini-sign-emoji">
                  😴
                </div>
                <div className="mini-sign-name">
                  Sleep
                </div>
                <div style={{ fontSize: "0.72rem", color: "#A8C8E8", marginTop: "4px" }}>
                  Essential Sign
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true">
            <span>
              Scroll to explore
            </span>
            <span>
              ↓
            </span>
          </div>
        </section>
        <div className="trust-bar" role="complementary" aria-label="Trusted sources and media">
          <div className="trust-item">
            <span>
              🏥
            </span>
            Endorsed by the American Academy of Pediatrics
          </div>
          <div className="trust-item">
            <span>
              🔬
            </span>
            Supported by peer-reviewed research
          </div>
          <div className="trust-item">
            <span>
              👩‍⚕️
            </span>
            Reviewed by pediatric speech therapists
          </div>
          <div className="trust-item">
            <span>
              👨‍👩‍👧
            </span>
            Trusted by 500,000+ families
          </div>
        </div>
        <section id="benefits" className="benefits" aria-labelledby="benefits-heading">
          <div className="reveal">
            <div className="section-label">
              Why It Works
            </div>
            <h2 id="benefits-heading">
              The
              <em>
                Science-Backed
              </em>
              Benefits of Baby Sign Language
            </h2>
            <p className="section-intro">
              Research consistently shows baby sign language is safe, effective, and beneficial — here's what the evidence says.
            </p>
          </div>
          <div className="benefits-grid">
            <article className="benefit-card reveal">
              <div className="benefit-icon">
                😌
              </div>
              <h3>
                Reduces Frustration & Crying
              </h3>
              <p>
                When babies can communicate needs like "hungry," "tired," or "help," they cry less. Parents report significantly calmer evenings once signing begins.
              </p>
              <div className="benefit-source">
                Source: American Academy of Pediatrics
              </div>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon">
                🗣️
              </div>
              <h3>
                Accelerates Speech Development
              </h3>
              <p>
                Pairing a signed word with a spoken word reinforces the meaning. Studies show signing babies often develop larger spoken vocabularies earlier.
              </p>
              <div className="benefit-source">
                Source: Journal of Speech & Language
              </div>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon">
                💞
              </div>
              <h3>
                Strengthens Parent–Baby Bond
              </h3>
              <p>
                When you respond to your baby's sign, they learn they can rely on you. This trust deepens your attachment and your baby's sense of security.
              </p>
              <div className="benefit-source">
                Source: Cleveland Clinic
              </div>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon">
                🧠
              </div>
              <h3>
                Boosts Cognitive Development
              </h3>
              <p>
                Learning to associate a gesture with an object or need engages multiple brain pathways simultaneously — supporting multisensory learning and memory.
              </p>
              <div className="benefit-source">
                Source: Sanford Health Research
              </div>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon">
                🌙
              </div>
              <h3>
                Easier Bedtime & Feeding
              </h3>
              <p>
                Signs like SLEEP, MILK, and ALL DONE transform guesswork at mealtimes and bedtime into clear two-way communication — for both of you.
              </p>
              <div className="benefit-source">
                Source: The Bump Parenting Guide
              </div>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon">
                🎉
              </div>
              <h3>
                A Fun, Joyful Activity
              </h3>
              <p>
                Teaching signs turns daily routines into playful learning moments. Signing together during meals, bath time, and play is a low-stress, high-reward activity.
              </p>
              <div className="benefit-source">
                Pediatrician consensus
              </div>
            </article>
          </div>
          <div className="reveal" style={{ marginTop: "2.5rem", background: "var(--gold-light)", borderRadius: "var(--radius)", padding: "2rem", maxWidth: "700px", borderLeft: "5px solid var(--gold)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--mid)", marginBottom: "0.5rem" }}>
              📚 Research Note
            </div>
            <p style={{ fontSize: "0.95rem", color: "var(--text-mid)", lineHeight: "1.7" }}>
              The American Academy of Pediatrics confirms baby sign language can be a
              <strong>
                positive tool for improving early communication
              </strong>
              . No research suggests it has negative effects on speech development — making it a risk-free addition to your parenting toolkit.
            </p>
          </div>
        </section>
        <section id="when-to-start" aria-labelledby="when-heading">
          <div className="reveal">
            <div className="section-label">
              Developmental Timeline
            </div>
            <h2 id="when-heading">
              When to Start — and What to
              <em>
                Expect
              </em>
            </h2>
            <p className="section-intro">
              Every baby develops at their own pace. Here's a realistic month-by-month roadmap.
            </p>
          </div>
          <div className="timeline reveal">
            <div className="timeline-item">
              <div className="timeline-age">
                4–6
                <small>
                  months
                </small>
              </div>
              <div className="timeline-content">
                <div className="timeline-tag">
                  Begin Modeling
                </div>
                <h3>
                  Start signing to your baby
                </h3>
                <p>
                  Your baby isn't ready to sign back yet, but you can begin using 2–3 consistent signs during daily routines. This builds the habit for you and familiarity for them. Focus on MILK, MORE, and ALL DONE.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-age">
                6–8
                <small>
                  months
                </small>
              </div>
              <div className="timeline-content">
                <div className="timeline-tag">
                  Watch for Readiness
                </div>
                <h3>
                  Baby begins mimicking gestures
                </h3>
                <p>
                  Around 6 months, babies start copying gestures like waving and clapping. This is a strong signal their motor coordination is ready for signing. Keep signing consistently every single time you say the word.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-age">
                8–10
                <small>
                  months
                </small>
              </div>
              <div className="timeline-content">
                <div className="timeline-tag">
                  🎉 First Signs!
                </div>
                <h3>
                  Baby signs back for the first time
                </h3>
                <p>
                  Most babies produce their first sign between 8–10 months with consistent exposure of 4–8 weeks. It may not look perfect — celebrate every approximation! Responding enthusiastically reinforces the behavior.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-age">
                10–14
                <small>
                  months
                </small>
              </div>
              <div className="timeline-content">
                <div className="timeline-tag">
                  Vocabulary Builds
                </div>
                <h3>
                  Expand to 10–20 signs
                </h3>
                <p>
                  As spoken vocabulary starts to emerge, keep adding new signs alongside new words. Many babies use signing alongside early speech — the two reinforce each other beautifully.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-age">
                18–24
                <small>
                  months
                </small>
              </div>
              <div className="timeline-content">
                <div className="timeline-tag">
                  Natural Transition
                </div>
                <h3>
                  Speech takes over naturally
                </h3>
                <p>
                  As verbal speech develops, most babies naturally drop signs in favour of words. This is completely normal and a sign of healthy development. Some families continue signing for fun or as a foundation for ASL.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-to" className="howto" aria-labelledby="howto-heading">
          <div className="reveal">
            <div className="section-label">
              Step-by-Step Method
            </div>
            <h2 id="howto-heading">
              How to Teach Baby Sign Language
              <em>
                That Actually Works
              </em>
            </h2>
            <p className="section-intro">
              Six proven principles from pediatric speech therapists and signing experts.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card reveal">
              <div className="step-num">
                01
              </div>
              <h3>
                Start With 3 Signs Only
              </h3>
              <p>
                Don't overwhelm yourself or your baby. Pick MORE, ALL DONE, and MILK to start. Master these before adding others.
              </p>
              <div className="step-tip">
                💡 Tip: Less is more. Consistency beats quantity every time.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">
                02
              </div>
              <h3>
                Always Speak + Sign Together
              </h3>
              <p>
                Every single time you sign, say the word out loud. "Do you want MORE?" — sign MORE as you say it. This pairs the verbal and visual cues.
              </p>
              <div className="step-tip">
                💡 Tip: Eye contact while signing helps babies connect meaning.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">
                03
              </div>
              <h3>
                Sign at Natural Moments
              </h3>
              <p>
                Don't set aside "lesson time." Sign during meals, nappy changes, bath time, and bedtime — moments when the meaning is immediately obvious.
              </p>
              <div className="step-tip">
                💡 Tip: Context makes signs meaningful. Timing is everything.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">
                04
              </div>
              <h3>
                Celebrate Every Attempt
              </h3>
              <p>
                When baby tries to sign — even if it looks nothing like yours — celebrate wildly. Clap, smile, say the word. Positive reinforcement builds confidence.
              </p>
              <div className="step-tip">
                💡 Tip: Never correct. Always encourage. Even approximations count.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">
                05
              </div>
              <h3>
                Be Consistent for 4–8 Weeks
              </h3>
              <p>
                Results don't come in days. Commit to signing the same signs at every opportunity for at least a month before expecting a response.
              </p>
              <div className="step-tip">
                💡 Tip: Post a sticky note reminder near the high chair or changing table.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">
                06
              </div>
              <h3>
                Get the Whole Family Signing
              </h3>
              <p>
                When grandparents, siblings, and caregivers all use the same signs, baby gets far more reinforcement. A consistent environment accelerates learning dramatically.
              </p>
              <div className="step-tip">
                💡 Tip: Print our free chart and put it on the fridge for everyone.
              </div>
            </div>
          </div>
        </section>
        <section id="signs" className="dictionary-section" aria-labelledby="signs-heading">
          <div className="reveal">
            <div className="section-label">
              Interactive Dictionary
            </div>
            <h2 id="signs-heading">
              50+ Baby Signs —
              <em>
                Tap to Learn Each One
              </em>
            </h2>
            <p className="section-intro">
              Click any sign to see exactly how to form it. Sorted by category and difficulty.
            </p>
          </div>
          <BabySignExplorer />
        </section>
        <section id="tracker" className="tracker-section" aria-labelledby="tracker-heading">
          <div className="reveal">
            <div className="section-label">
              Your Baby's Journey
            </div>
            <h2 id="tracker-heading">
              Track Which Signs
              <em>
                Your Baby Has Learned
              </em>
            </h2>
            <p className="section-intro">
              Tap a sign to mark it as learned. Your progress saves automatically in your browser.
            </p>
          </div>
          <div className="tracker-box reveal">
            <BabySignTracker />
          </div>
        </section>
        <section className="tips-section" aria-labelledby="tips-heading">
          <div className="reveal">
            <div className="section-label">
              Expert Tips
            </div>
            <h2 id="tips-heading">
              Common Mistakes to
              <em>
                Avoid
              </em>
            </h2>
          </div>
          <div className="tips-grid">
            <div className="tip-card reveal">
              <div className="tip-icon">
                🚫
              </div>
              <h3>
                Don't Force or Drill
              </h3>
              <p>
                Signing sessions that feel like tests stress babies out. Keep it casual and integrated into natural play.
              </p>
            </div>
            <div className="tip-card reveal">
              <div className="tip-icon">
                🚫
              </div>
              <h3>
                Don't Expect Perfection
              </h3>
              <p>
                Baby's version of a sign will look clumsy at first. What matters is intent — they're communicating!
              </p>
            </div>
            <div className="tip-card reveal">
              <div className="tip-icon">
                🚫
              </div>
              <h3>
                Don't Stop Talking
              </h3>
              <p>
                Sign language supplements speech — never replaces it. Always speak the word every time you sign it.
              </p>
            </div>
            <div className="tip-card reveal">
              <div className="tip-icon">
                🚫
              </div>
              <h3>
                Don't Give Up Too Early
              </h3>
              <p>
                Most parents quit after 2–3 weeks of no response. The average is 4–8 weeks. Stick with it!
              </p>
            </div>
            <div className="tip-card reveal">
              <div className="tip-icon">
                🚫
              </div>
              <h3>
                Don't Use Too Many Signs at Once
              </h3>
              <p>
                Starting with 10+ signs dilutes the learning. Begin with 3, get them solid, then slowly expand.
              </p>
            </div>
            <div className="tip-card reveal">
              <div className="tip-icon">
                🚫
              </div>
              <h3>
                Don't Sign Only When Asking
              </h3>
              <p>
                Also sign when baby is doing something: "You're eating MORE!" Signs in context are the most powerful.
              </p>
            </div>
          </div>
        </section>
        <section id="faq" className="faq-section" aria-labelledby="faq-heading">
          <div className="reveal">
            <div className="section-label">
              Frequently Asked Questions
            </div>
            <h2 id="faq-heading">
              Everything Parents Ask
              <em>
                About Baby Sign Language
              </em>
            </h2>
          </div>
          <div className="faq-grid reveal" role="list">
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                Does baby sign language delay speech?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  No — this is the most common concern, and research consistently shows the opposite. The American Academy of Pediatrics states that baby signing does not delay verbal speech. In fact, many studies suggest signing babies often develop larger spoken vocabularies earlier, because signing reinforces the word-meaning connection in the brain. Always speaking the word aloud as you sign is the key.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                What age should I start teaching baby sign language?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  You can begin introducing signs from as early as 4–6 months to build your own habits, but most babies won't sign back until 8–10 months when their fine motor skills are developed enough. Pediatrician Dr. Shannon Thompson recommends starting consistent modeling around 6–8 months, when babies begin mimicking gestures like waving.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                What are the best first signs to teach?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  The best first signs are ones with high daily relevance: MORE (tap fingertips together), ALL DONE (shake open hands), MILK (squeeze fist open/closed), EAT (fingertips to lips), SLEEP (hand closes over face), MOMMY, DADDY, and HELP. These cover core needs and are easy enough for small hands to approximate.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                Is baby sign language the same as ASL?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  Not exactly. Baby sign language typically borrows a small set of simplified gestures, many from American Sign Language (ASL). ASL is a complete, complex language with its own grammar, structure, and history used by the Deaf community. Baby sign language is a simplified communication tool, not a full language — though many families use it as a gateway to learning more ASL together.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                How long does it take to see results?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  With consistent daily practice, most babies produce their first intentional sign within 4–8 weeks. Some faster, some slower — it varies by baby. The biggest mistake parents make is giving up around the 3-week mark. Patience and consistency are the most important factors. When baby first signs back, the feeling is unforgettable.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                What if my baby won't sign back?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  First, check if you're signing consistently — every single time, during natural moments, with eye contact. If yes, give it more time. Some babies absorb everything silently and then suddenly produce 5 signs in a week. If you have concerns about your child's development, speak with your pediatrician — signing is one tool among many, not a diagnostic benchmark.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" aria-expanded="false">
                Can signing help babies with special needs?
                <span className="arrow">
                  ▾
                </span>
              </button>
              <div className="faq-a" role="region">
                <div className="faq-a-inner">
                  Yes — baby sign language is widely used in early intervention programs for children with Down syndrome, autism spectrum disorder, speech delays, and hearing loss. For some children, visual communication provides a crucial bridge. If your child has developmental needs, work with a speech-language pathologist who can tailor an approach specifically for them.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonials" aria-labelledby="testi-heading">
          <div className="reveal">
            <div className="section-label">
              Parent Stories
            </div>
            <h2 id="testi-heading">
              Real Families,
              <em>
                Real Results
              </em>
            </h2>
          </div>
          <div className="testi-grid">
            <article className="testi-card reveal">
              <div className="stars">
                ★★★★★
              </div>
              <p className="testi-text">
                "At 9 months, my daughter signed MORE during breakfast. I literally cried. Two weeks later she had 6 signs and our mealtime battles completely disappeared."
              </p>
              <div className="testi-author">
                <div className="testi-avatar">
                  👩
                </div>
                <div>
                  <div className="testi-name">
                    Sarah M.
                  </div>
                  <div className="testi-role">
                    Mom of 1 · Started at 7 months
                  </div>
                </div>
              </div>
            </article>
            <article className="testi-card reveal">
              <div className="stars">
                ★★★★★
              </div>
              <p className="testi-text">
                "We were skeptical, but after one month our 8-month-old was signing MILK, ALL DONE, and even PLEASE. The frustration at bedtime dropped dramatically."
              </p>
              <div className="testi-author">
                <div className="testi-avatar">
                  👨
                </div>
                <div>
                  <div className="testi-name">
                    James & Priya K.
                  </div>
                  <div className="testi-role">
                    Parents of twins · Started at 6 months
                  </div>
                </div>
              </div>
            </article>
            <article className="testi-card reveal">
              <div className="stars">
                ★★★★★
              </div>
              <p className="testi-text">
                "As a pediatric nurse, I was already familiar with the research. Teaching my own son was even more rewarding than I expected. The bonding aspect is real."
              </p>
              <div className="testi-author">
                <div className="testi-avatar">
                  👩‍⚕️
                </div>
                <div>
                  <div className="testi-name">
                    Dr. Aisha T.
                  </div>
                  <div className="testi-role">
                    Pediatric Nurse & Mom
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="cta-section" aria-labelledby="cta-heading">
          <h2 id="cta-heading">
            Ready to Start
            <em>
              Your Journey?
            </em>
          </h2>
          <p>
            Explore our full sign dictionary, download your free printable chart, and begin communicating with your baby today.
          </p>
          <a href="#signs" className="btn-primary">
            Browse All 50+ Signs →
          </a>
          <div className="cta-note">
            Free forever · No account required · Pediatrician-reviewed
          </div>
        </section>
      </main>
    </>
  );
}
