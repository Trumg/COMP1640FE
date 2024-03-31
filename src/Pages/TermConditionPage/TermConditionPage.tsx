import React from "react";
import { Link } from "react-router-dom";

const TermConditionPage: React.FC = () => {
  return (
    <>
      <div
        className="font-roboto"
        style={{ paddingTop: "100px", padding: "20px" }}
      >
        <Link to="/post" className="block mb-4 text-blue-500">
          Back
        </Link>
        <h1>Terms and Conditions of Website Use</h1>
        <p>
          Welcome to Magazine - COMP1640. By accessing or using this Website,
          you agree to comply with and be bound by the following terms and
          conditions of use. If you disagree with any part of these terms and
          conditions, please do not use our Website.
        </p>
        <h2 style={{ marginTop: "20px" }}>1. Acceptance of Terms</h2>
        <p>
          Your access to and use of the Website is subject to your acceptance of
          and compliance with these terms. These terms apply to all visitors,
          users, and others who access or use the Website.
        </p>
        <h2 style={{ marginTop: "20px" }}>2. User Responsibilities</h2>
        <p>
          You agree to use the Website only for lawful purposes and in a manner
          consistent with all applicable laws and regulations. You are
          responsible for maintaining the confidentiality of any login
          information associated with your account. You must not engage in any
          conduct that restricts or inhibits any other user from using or
          enjoying the Website.
        </p>
        <h2 style={{ marginTop: "20px" }}>3. Intellectual Property</h2>
        <p>
          The Website and its original content, features, and functionality are
          owned by Magazine - COMP1640 and are protected by international
          copyright, trademark, patent, trade secret, and other intellectual
          property or proprietary rights laws. You may not reproduce, modify,
          distribute, display, perform, or create derivative works of any part
          of the Website without the prior written consent of Magazine -
          COMP1640.
        </p>
        <h2 style={{ marginTop: "20px" }}>4. Disclaimer</h2>
        <p>
          The information provided on the Website is for general informational
          purposes only and should not be relied upon as legal, financial, or
          professional advice. Magazine - COMP1640 does not warrant that the
          Website will be error-free or uninterrupted, or that defects will be
          corrected. Your use of the Website is at your sole risk. The Website
          is provided on an "as is" and "as available" basis.
        </p>
        <h2 style={{ marginTop: "20px" }}>5. Limitation of Liability</h2>
        <p>
          In no event shall Magazine - COMP1640, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from your access to or use of or
          inability to access or use the Website.
        </p>
        <h2 style={{ marginTop: "20px" }}>6. External Links</h2>
        <p>
          The Website may contain links to third-party websites or services that
          are not owned or controlled by Magazine - COMP1640. Magazine -
          COMP1640 has no control over, and assumes no responsibility for, the
          content, privacy policies, or practices of any third-party websites or
          services. You further acknowledge and agree that Magazine - COMP1640
          shall not be responsible or liable, directly or indirectly, for any
          damage or loss caused or alleged to be caused by or in connection with
          the use of or reliance on any such content, goods, or services
          available on or through any such websites or services.
        </p>
        <h2 style={{ marginTop: "20px" }}>7. Modifications</h2>
        <p>
          Magazine - COMP1640 reserves the right, at its sole discretion, to
          modify or replace these terms at any time. If a revision is material,
          we will try to provide at least 30 days' notice prior to any new terms
          taking effect. What constitutes a material change will be determined
          at our sole discretion.
        </p>
        <h2 style={{ marginTop: "20px" }}>8. Governing Law</h2>
        <p>
          These terms shall be governed and construed in accordance with the
          laws, without regard to its conflict of law provisions.
        </p>
        <h2 style={{ marginTop: "20px" }}>9. Contact Us</h2>
        <p>
          If you have any questions about these terms, please contact us. Please
          ensure to fill in placeholders like Magazine - COMP1640 with
          appropriate details for your website. Additionally, consider adding
          sections or modifying the language to address specific aspects
          relevant to your website's operations and user interactions.
        </p>
      </div>
    </>
  );
};

export default TermConditionPage;
