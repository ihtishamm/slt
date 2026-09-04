import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

import "@/styles/privacy.css";

export const metadata: Metadata = buildMetadata({
  "title": "Privacy Policy - Sign Language Translator",
  "path": "/privacy",
  "robots": "index, follow"
});

export default function PrivacyPage() {
  return (
    <>
      <main>
        <div className="container">
          <h1>
            Privacy Policy
          </h1>
          <p>
            The Privacy Policy informs you how we process information about you on the website
            <strong>
              sltranslator.com
            </strong>
            (the "Site"). You shall understand that through your use of the Site, you acknowledge that the processing of this information shall be undertaken in accordance with the Privacy Policy.
          </p>
          <div className="contact-info">
            <h2>
              Our Contact Details:
            </h2>
            <p>
              <strong>
                Name:
              </strong>
              sltranslator.com, registered by Abdul Razzaq, an individual entrepreneur registered in the USA
            </p>
            <p>
              <strong>
                E-mail:
              </strong>
              <a href="mailto:support@sltranslator.com">
                info@sltranslator.com
              </a>
            </p>
          </div>
          <h2>
            1. The Type of Personal Information We Collect
          </h2>
          <p>
            We currently collect and process only cookies, log files, IP addresses, timestamps, and user agents.
          </p>
          <div className="important">
            <p>
              <strong>
                Important:
              </strong>
              Any text you input to generate or, or any input for generating image, is not saved. All processing is done directly in your browser, ensuring that only you can see it.
            </p>
            <p>
              Similarly, any image oe paragraph you generate on this site is made by your browser using our code. We don't save or post it anywhere. But remember, others can create the same image if they use the same settings.
            </p>
          </div>
          <h2>
            2. Types of Cookies
          </h2>
          <h3>
            Snigel Cookies
          </h3>
          <p>
            sltranslator.com use a third-party technology called Snigel.
          </p>
          <h3>
            Google Cookies
          </h3>
          <p>
            Google, as a third party vendor, uses cookies to ads on the website. Google's use of advertising cookies enables it and its partners to serve ads to the website's users based on their visit to this and other sites on the Internet. Users may opt out of personalized advertising by visiting
            <a href="https://www.google.com/settings/ads" target="_blank">
              https://www.google.com/settings/ads
            </a>
          </p>
          <p>
            To get more information about how Google uses data when you use their partners' sites or apps:
            <a href="https://www.google.com/policies/privacy/partners" target="_blank">
              https://www.google.com/policies/privacy/partners
            </a>
          </p>
          <h2>
            3. How We Get the Personal Information and Why We Have It
          </h2>
          <p>
            We automatically collect certain data from you as you use our website by using cookies and similar technologies. We receive data from third parties such as analytics providers, advertising networks, search information providers, and providers of technology.
          </p>
          <p>
            We use the information that you have given us in order to deliver the services.
          </p>
          <p>
            We may share the information with third parties to maintain the website and deliver the services.
          </p>
          <p>
            The lawful basis we rely on for processing this information is our legitimate interest.
          </p>
          <h2>
            4. How We Store Your Personal Information
          </h2>
          <p>
            Your information is securely stored in the servers in the USA, and the website is operated from the U.A.E.
          </p>
          <p>
            We keep all the types of collected information through our log files for one week, and then such information is automatically deleted.
          </p>
          <h2>
            5. Security
          </h2>
          <p>
            We have put in place security and organizational measures to prevent your personal data from being accidentally lost, used, altered, disclosed, or accessed without authorisation.
          </p>
          <h2>
            6. Your Data Protection Rights
          </h2>
          <p>
            Under data protection law, you have rights including:
          </p>
          <div className="rights-list">
            <ul>
              <li>
                <strong>
                  Your right of access
                </strong>
                - You have the right to ask us for copies of your personal information.
              </li>
              <li>
                <strong>
                  Your right to rectification
                </strong>
                - You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.
              </li>
              <li>
                <strong>
                  Your right to erasure
                </strong>
                - You have the right to ask us to erase your personal information in certain circumstances.
              </li>
              <li>
                <strong>
                  Your right to restriction of processing
                </strong>
                - You have the right to ask us to restrict the processing of your personal information in certain circumstances.
              </li>
              <li>
                <strong>
                  Your right to object to processing
                </strong>
                - You have the right to object to the processing of your personal information in certain circumstances.
              </li>
              <li>
                <strong>
                  Your right to data portability
                </strong>
                - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.
              </li>
            </ul>
          </div>
          <p>
            You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.
          </p>
          <p>
            Please contact us at
            <a href="mailto:support@sltranslator.com">
              support@sltranslator.com
            </a>
            if you wish to make a request.
          </p>
          <h2>
            7. Translations of the Privacy Policy
          </h2>
          <p>
            The governing language of the Privacy Policy and any communications and documents related to the Privacy Policy, unless otherwise specified, shall be English. If translations hereof are made for reference purposes, only the English original shall have the effect, and such translations shall have no effect.
          </p>
          <h2>
            How to Complain
          </h2>
          <p>
            If you have any concerns about our use of your personal information, you can make a complaint to us at
            <a href="mailto:support@sltranslator.com">
              support@sltranslator.com
            </a>
            .
          </p>
          <p>
            You can also complain to your national data protection authority if you are unhappy with how we have used your data.
          </p>
        </div>
        <a href="#" className="back-to-top" id="backToTop">
          <i className="fas fa-arrow-up"></i>
        </a>
      </main>
    </>
  );
}
