import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import "@/styles/about.css";

export const metadata: Metadata = buildMetadata({
  "title": "About Us - Abdul Razzaq",
  "path": "/about",
  "robots": "index, follow"
});

export default function AboutPage() {
  return (
    <>
      <main>
        <div className="container">
          <section className="about-section">
            <div className="about-header animate">
              <h1>
                About Us
              </h1>
              <div className="subtitle">
                Get to know the expert behind your digital success
              </div>
            </div>
            <div className="about-content">
              <div className="profile animate animate-delay-1">
                <div className="profile-image">
                  <img src="/assets/images/abdul-razzaq.png" alt="Abdul Razzaq" />
                </div>
              </div>
              <div className="intro animate animate-delay-2">
                <h2>
                  Abdul Razzaq
                </h2>
                <p className="subtitle">
                  <span className="highlight">
                    Website Developer, Designer & SEO Expert
                  </span>
                </p>
                <p>
                  Hi, I'm Abdul Razzaq. I am a skilled website developer, designer, and SEO expert with over three years of experience. I'm passionate about helping businesses grow online and have a proven track record of success.
                </p>
                <p>
                  In 2018, I passed the BS Computer Science exam and became a certified web developer. Since then, I've completed
                  <span className="highlight">
                    over 120 web development projects
                  </span>
                  for clients of all sizes.
                </p>
                <p>
                  I'm also an expert in SEO, having completed specialized online courses from Coursera. My expertise is reflected in the numerous successful projects I've delivered on platforms like Fiverr and Upwork.
                </p>
                <p>
                  I'm excited to use my skills and experience to help you achieve your online business goals. Whether you need a new website, help with SEO, or want to explore AI-powered solutions, I can help turn your vision into reality.
                </p>
              </div>
            </div>
            <div className="services animate animate-delay-3">
              <h2>
                Services I Offer
              </h2>
              <p>
                With expertise across multiple digital disciplines, I provide comprehensive solutions to help your business thrive online:
              </p>
              <div className="service-list">
                <div className="service-item">
                  <h3>
                    Web Development
                  </h3>
                  <p>
                    Custom websites tailored to your business needs and goals.
                  </p>
                </div>
                <div className="service-item">
                  <h3>
                    SEO
                  </h3>
                  <p>
                    Improve visibility and rankings in search engine results.
                  </p>
                </div>
                <div className="service-item">
                  <h3>
                    Digital Marketing
                  </h3>
                  <p>
                    Strategic campaigns to boost your online presence.
                  </p>
                </div>
                <div className="service-item">
                  <h3>
                    Python Programming
                  </h3>
                  <p>
                    Custom solutions and automation for your business.
                  </p>
                </div>
                <div className="service-item">
                  <h3>
                    Off-page SEO
                  </h3>
                  <p>
                    Building authority through quality backlinks.
                  </p>
                </div>
                <div className="service-item">
                  <h3>
                    On-page SEO
                  </h3>
                  <p>
                    Optimizing content for better search performance.
                  </p>
                </div>
                <div className="service-item">
                  <h3>
                    Artificial Intelligence
                  </h3>
                  <p>
                    Integrating AI solutions for smarter business operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="cta animate">
              <h2>
                Ready to Grow Your Online Presence?
              </h2>
              <p>
                Let's work together to achieve your digital goals and take your business to the next level.
              </p>
              <Link href="/contact" className="cta-button">
                Get In Touch
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
