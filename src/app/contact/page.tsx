import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

import "@/styles/contact.css";

export const metadata: Metadata = buildMetadata({
  "title": "Contact Us - Abdul Razzaq",
  "path": "/contact",
  "robots": "index, follow"
});

export default function ContactPage() {
  return (
    <>
      <main>
        <div className="container">
          <section className="contact-section">
            <div className="contact-header animate">
              <h1>
                Contact Us
              </h1>
              <div className="subtitle">
                Get in touch to discuss your digital needs
              </div>
            </div>
            <div className="contact-card animate animate-delay-1">
              <div className="contact-intro">
                <h2>
                  Let's Work Together
                </h2>
                <p>
                  I'm excited to hear about your project. Feel free to reach out using any of the contact methods below and I'll get back to you as soon as possible.
                </p>
              </div>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-title">
                    Email
                  </div>
                  <div className="method-value">
                    <a href="mailto:info@sltranslator.com">
                      info@sltranslator.com
                    </a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="method-title">
                    Freelance Platforms
                  </div>
                  <div className="method-value">
                    <a href="#" target="_blank">
                      Fiverr
                    </a>
                    •
                    <a href="#" target="_blank">
                      Upwork
                    </a>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="services-quick-links animate animate-delay-2">
              <h2>
                My Services
              </h2>
              <div className="services-grid">
                <a href="#" className="service-link">
                  Web Development
                </a>
                <a href="#" className="service-link">
                  SEO
                </a>
                <a href="#" className="service-link">
                  Digital Marketing
                </a>
                <a href="#" className="service-link">
                  Python Programming
                </a>
                <a href="#" className="service-link">
                  Off-page SEO
                </a>
                <a href="#" className="service-link">
                  On-page SEO
                </a>
                <a href="#" className="service-link">
                  Artificial Intelligence
                </a>
              </div>
            </div>
            <div className="contact-form-wrapper animate animate-delay-3">
              <h2>
                Send Me a Message
              </h2>
              <form className="contact-form" action="#" method="POST">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" id="name" name="name" className="form-input" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="Your email address" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone (Optional)
                  </label>
                  <input type="tel" id="phone" name="phone" className="form-input" placeholder="Your phone number" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input type="text" id="subject" name="subject" className="form-input" placeholder="What is this regarding?" required />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea id="message" name="message" className="form-textarea" placeholder="Tell me about your project..." required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
            <div className="cta-banner animate">
              <h2>
                Ready to Transform Your Digital Presence?
              </h2>
              <p>
                With over three years of experience and 120+ completed projects, I have the expertise to help your business succeed online.
              </p>
              <div className="method-value">
                <strong>
                  Email me at:
                </strong>
                <a href="mailto:info@sltranslator.com">
                  info@sltranslator.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
