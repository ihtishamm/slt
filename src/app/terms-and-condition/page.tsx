import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import "@/styles/terms-and-condition.css";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = buildMetadata({
  "title": "Terms and Condition - Sign Language Translator",
  "path": "/terms-and-condition",
  "robots": "index, follow"
});

export default function TermsAndConditionPage() {
  return (
    <>
      <main>
        <div className="container">
          <h1>
            Terms of Use
          </h1>
          <p>
            Learn about the terms, rules, and guidelines for accessing and using our website.
          </p>
          <br />
          <div className="intro">
            <p>
              The Terms of Use (hereinafter the "Terms") regulate your use of this website, sltranslator.com (the "Site"). Please read the following information carefully to understand our practices regarding your use of the Site. We may change the Terms at any time. We may inform you of the changes to the Terms using the available means of communication. We recommend you to check the Site frequently to see the actual version of the Terms and their previous versions.
            </p>
          </div>
          <div className="section">
            <h2>
              1. Privacy Policy
            </h2>
            <p>
              Our
              <Link href="/privacy">
                Privacy Policy
              </Link>
              is available on a separate page. Our Privacy Policy explains to you how we process information about you. You shall understand that through your use of the Site, you acknowledge the processing of this information shall be undertaken in accordance with the Privacy Policy.
            </p>
          </div>
          <div className="section">
            <h2>
              2. Services
            </h2>
            <p>
              The site allows you to Translate English text into ASL signs using our powerful online sign language tool. It is a free sign language generator & translator to convert asl to english and more. By using this website, you agree not to use these services for any illegal purposes.
            </p>
            <div className="highlight-box">
              <p>
                When you generate image using this platform, it's important to note that the audio is produced directly by your browser, based on the input from our website. While it's not mandatory to credit our website when using the generated images, we would greatly appreciate it if you did.
              </p>
            </div>
            <p>
              If you utilize the embed function of the Site, we kindly request that you reference our website. To reference our website, please use the code provided below.
            </p>
            <div className="code-snippet">
              &lt;a href="https://sltranslator.com/"&gt;Sign Language Translator&lt;/a&gt;
            </div>
          </div>
          <div className="section">
            <h2>
              3. Third Party Services
            </h2>
            <p>
              The Site may include links to other sites, applications, and platforms (hereinafter the "Linked Sites").
            </p>
            <p>
              We do not control the Linked Sites, and shall not be responsible for the content and other materials of the Linked Sites. We make these links available to you for providing the functionality or services on the Site.
            </p>
          </div>
          <div className="section">
            <h2>
              4. Prohibited Uses And Intellectual Property
            </h2>
            <p>
              We grant you a non-transferable, non-exclusive, revocable license to access and use the Site from one device in accordance with the Terms.
            </p>
            <p>
              You shall not use the Site for unlawful or prohibited purposes. You may not use the Site in a way that may disable, damage, or interfere with the Site.
            </p>
            <p>
              All content present on the Site includes text, code, graphics, logos, sounds, images, compilation, software used on the Site (hereinafter and hereinbefore the "Content"). The Content is our property or of our contractors and is protected by intellectual property laws. You agree to use all copyright and other proprietary notices or restrictions contained in the Content, and you are prohibited from changing the Content.
            </p>
            <p>
              You may not publish, transmit, modify, reverse engineer, participate in the transfer, or create and sell derivative works, or in any way use any of the Content. Your enjoyment of the Site shall not entitle you to make any illegal and disallowed use of the Content, and in particular, you shall not change proprietary rights or notices in the Content. You shall use the Content only for your personal and non-commercial use. We do not grant you any licenses to our intellectual property unless allowed in this clause.
            </p>
          </div>
          <div className="section">
            <h2>
              5. Our Materials
            </h2>
            <p>
              No compensation shall be paid with regard to the use of your Content. We shall have no obligation to publish or enjoy any Content you may send us and may remove your Content at any time.
            </p>
            <p>
              By posting, uploading, inputting, providing or submitting your Content you warrant and represent that you own all of the rights to your Content.
            </p>
          </div>
          <div className="section">
            <h2>
              6. Disclaimer of Certain Liabilities
            </h2>
            <p>
              The information available via the Site may include typographical errors or inaccuracies. We shall not be liable for these inaccuracies and errors.
            </p>
            <p>
              We make no representations about the availability, accuracy, reliability, suitability, or timeliness of the Content contained on and services available on the Site. To the maximum extent allowed by the applicable law, all such Content and services are provided on an "as is" basis. We disclaim all warranties and conditions regarding this Content and services, including warranties and provisions of merchantability, fitness for a particular purpose.
            </p>
            <p>
              To the maximum extent permitted by the applicable law, in no event shall we be liable for any direct, indirect, incidental, consequential, special, punitive damages including, but not limited to, damages for loss of enjoyment, data or profits, in the connection with the enjoyment or execution of the Site in the context of the inability or delay to enjoy the Site or its services, or for any Content of the Site, or otherwise arising out of the enjoyment of the Site, based on contract and non-contract liability or other reason.
            </p>
            <p>
              If the exclusion or limitation of liability for damages, whether consequential or incidental, is prohibited in a particular case, the exclusion or limitation of liability shall not apply to you.
            </p>
          </div>
          <div className="section">
            <h2>
              7. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend and hold harmless us, our managers, directors, employees, agents, and third parties, for any costs, losses, expenses (including attorneys' fees), liabilities regarding or arising out of your enjoyment of or inability to enjoy the Site or its services and our services and products, your violation of the Terms or your violation of any rights of third parties, or your violation of the applicable law. We have the right to assume the exclusive defence, and you shall cooperate with us in asserting any available defences.
            </p>
          </div>
          <div className="section">
            <h2>
              8. Termination and Access Restriction
            </h2>
            <p>
              We may terminate your access to the Site and its related services or any part at any time, without notice.
            </p>
          </div>
          <div className="section">
            <h2>
              9. Miscellaneous
            </h2>
            <p>
              The Terms are governed by and construed in accordance with the laws of the Republic of Turkey, excluding the conflict of laws rules.
            </p>
            <p>
              The governing language of the Terms and any communications and documents related to the Terms, unless otherwise specified, shall be English. If translations hereof are made for reference purposes, only the English original shall have the effect of a contract, and such translations shall have no effect.
            </p>
            <p>
              No joint venture, partnership, employment, or agency relationship shall be implied between you and us as a result of the Terms or use of the Site.
            </p>
            <p>
              Nothing in the Terms shall be a derogation of our right to comply with governmental, court, police, and law enforcement requests or requirements regarding your enjoyment of the Site.
            </p>
            <p>
              If any part of the Terms is determined to be void or unenforceable in accordance with applicable law, then the void or unenforceable clauses will be deemed superseded by valid and enforceable clauses shall be similar to the original version of the Terms and other parts and sections of the Terms shall be applicable to you and us.
            </p>
            <p>
              The Terms constitute the entire agreement between you and us regarding the enjoyment of the Site, and the Terms supersede all prior or subsequent communications and offers, whether electronic, oral, or written, between you and us.
            </p>
            <p>
              We and our affiliates shall not be liable for a failure or delay to fulfil its obligations where the failure or delay results from any cause beyond our reasonable control, including technical failures, natural disasters, blockages, embargoes, riots, acts, regulation, legislation, or orders of government, terroristic acts, war, or any other force outside of our control.
            </p>
            <p>
              In case of controversies, demands, claims, disputes, or causes of action between us and you relating to the Site or other related issues, or the Terms, you and we agree to attempt to resolve such controversies, demands, claims, disputes, or causes of action by good-faith negotiation, and in case of failure of such negotiation, exclusively through the courts of the country where our company is set up.
            </p>
          </div>
          <div className="section">
            <h2>
              10. Complaints
            </h2>
            <p>
              We are committed to resolving any complaints about the Terms. If you would like to make a complaint regarding the Terms or our practices in relation to your personal data, please contact us at
              <a href="mailto:support@sltranslator.com" className="email-link">
                support@sltranslator.com
              </a>
              .
            </p>
            <p>
              We will reply to your complaint as soon as we can and in any event, within 30 days. We hope to resolve any complaint brought to our attention; however, if you feel that your complaint has not been adequately resolved, you reserve the right to contact your local protection authority.
            </p>
          </div>
          <div className="contact-section">
            <h2>
              Contact Information
            </h2>
            <p>
              We welcome your comments or questions about the Terms. You may contact us in writing at
              <a href="mailto:support@sltranslator.com" className="email-link">
                support@sltranslator.com
              </a>
              .
            </p>
          </div>
        </div>
        <a href="#" className="back-to-top" id="backToTop">
          <Icon name="arrow-up" title="Back to top" />
        </a>
        <br />
      </main>
    </>
  );
}
