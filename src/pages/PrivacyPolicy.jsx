import React from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  UserCheck,
  Globe2,
  Mail,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-gray-50 to-[#C9A635]/10">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 bg-[#7A1616]/10 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute top-0 right-0 w-56 h-56 bg-[#C9A635]/20 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/90 border border-gray-200 px-4 py-2 shadow-sm mb-5">
              <ShieldCheck className="w-4 h-4 text-[#7A1616]" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                Your data. Your trust.
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Privacy{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl">
              This Privacy Policy explains how we collect, use, share and
              protect your personal information when you interact with ARIA
              WEALTH, our website and our services, in line with applicable
              Indian laws and regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">
          {/* Overview card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A1616] to-[#A12424] shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                1. Introduction
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-2">
                By using our website, engaging with our team, or availing our
                services, you agree to the terms of this Privacy Policy. This
                Policy is read together with our{" "}
                <span className="font-semibold text-[#7A1616]">
                  Terms of Use, Commission Disclosure and other regulatory
                  disclosures
                </span>
                .
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                References to “we”, “us”, “our” or “ARIA WEALTH” include our
                authorised representatives, employees and support partners
                working to deliver our services.
              </p>
            </div>
          </div>

          {/* 2 columns grid for main sections */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left column */}
            <div className="space-y-6 lg:space-y-8">
              {/* Information we collect */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#7A1616]" />
                  2. Information We Collect
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  We only collect information that is necessary and relevant to
                  provide you with personalised financial planning and
                  investment services. This may include:
                </p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
                  <li>
                    <span className="font-semibold">Contact details:</span>{" "}
                    name, address, email ID, mobile number, city, country.
                  </li>
                  <li>
                    <span className="font-semibold">KYC & regulatory data:</span>{" "}
                    PAN, date of birth, KYC status, occupation and other
                    information mandated by SEBI / AMFI / RBI or other
                    regulators.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Financial profile & goals:
                    </span>{" "}
                    income range, existing investments, risk profile, time
                    horizon, family details relevant for planning.
                  </li>
                  <li>
                    <span className="font-semibold">Transaction data:</span>{" "}
                    details of investments executed through us, SIPs, redemptions
                    or switches, folio information as shared by RTAs / AMCs.
                  </li>
                  <li>
                    <span className="font-semibold">Website usage data:</span>{" "}
                    IP address, browser type, pages visited, time spent on the
                    site and similar analytics information collected through
                    standard tools.
                  </li>
                </ul>
              </div>

              {/* How we use your information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  3. How We Use Your Information
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  Your information is used strictly for legitimate business and
                  regulatory purposes, such as:
                </p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Creating and maintaining your client profile.</li>
                  <li>
                    Designing personalised financial plans and investment
                    strategies.
                  </li>
                  <li>
                    Processing transactions in mutual funds and other permitted
                    financial products.
                  </li>
                  <li>
                    Sending portfolio statements, transaction confirmations,
                    alerts and service communications.
                  </li>
                  <li>
                    Complying with applicable laws, regulations, audit
                    requirements and requests from regulators or authorities.
                  </li>
                  <li>
                    Improving our website, client experience and service quality
                    using aggregated and anonymised data.
                  </li>
                </ul>
              </div>

              {/* Cookies & tracking */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  4. Cookies & Online Tracking
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  Our website may use cookies, pixels and similar technologies
                  to:
                </p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Remember your preferences and improve navigation.</li>
                  <li>
                    Understand how visitors use our website so we can improve
                    content and performance.
                  </li>
                  <li>
                    Show relevant information or campaigns based on aggregated
                    behaviour insights.
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700">
                  You can manage or disable cookies through your browser
                  settings. However, some features of the website may not work
                  optimally if cookies are disabled.
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6 lg:space-y-8">
              {/* Sharing of information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-[#7A1616]" />
                  5. Sharing of Information
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  We do not sell your personal information. We may share it only
                  in the following situations:
                </p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
                  <li>
                    With AMCs, RTAs, service providers and technology partners
                    strictly for transaction processing or servicing.
                  </li>
                  <li>
                    With auditors, legal advisors or compliance partners for
                    regulatory, reporting or audit purposes.
                  </li>
                  <li>
                    With regulators, courts or government authorities when
                    required by law or in response to valid requests.
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700">
                  Wherever possible, we seek contractual assurances that such
                  third parties maintain confidentiality and use the information
                  only for the specified purpose.
                </p>
              </div>

              {/* Data security & retention */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#7A1616]" />
                  6. Data Security & Retention
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  We use reasonable organisational, technical and physical
                  safeguards to protect your information from unauthorised
                  access, misuse, alteration or loss.
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  Data is retained for as long as required:
                </p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
                  <li>to service your relationship with us,</li>
                  <li>to meet legal, regulatory and audit requirements, and</li>
                  <li>
                    to resolve disputes or enforce our agreements, if any.
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700">
                  When information is no longer required, we endeavour to delete
                  or anonymise it in a secure manner.
                </p>
              </div>

              {/* Your rights & communication */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#7A1616]" />
                  7. Your Rights & Communication Preferences
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  Subject to applicable laws, you may:
                </p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Review or update certain personal information with us.</li>
                  <li>
                    Request clarification on how your data is used or stored.
                  </li>
                  <li>
                    Opt out of receiving non-transactional marketing
                    communications.
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700">
                  We may still send important service, regulatory or security
                  related messages even if you opt out of promotional content.
                </p>
              </div>
            </div>
          </div>

          {/* Other sections */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              8. Third-Party Links & External Websites
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Our website may contain links to third-party websites, tools or
              platforms (including AMCs, RTAs, payment gateways or content
              providers). We are not responsible for the privacy practices or
              content of such external websites. You are encouraged to review
              their privacy policies separately.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-4">
              9. Children’s Privacy
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Our services are primarily intended for adults who are capable of
              entering into legally binding financial contracts. We do not
              knowingly collect personal information directly from minors
              without consent from a parent / guardian, as applicable under
              Indian law.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-4">
              10. Changes to this Policy
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              We may update this Privacy Policy from time to time to reflect
              changes in regulations, technology or our internal practices.
              Updated versions will be posted on our website with a revised
              “Last Updated” date. We encourage you to review this page
              periodically.
            </p>
          </div>

          {/* Contact section */}
          <div className="bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-2xl shadow-xl border border-[#F9E9C0]/40 p-6 sm:p-8 text-white">
            <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                    11. Contact for Privacy Concerns
                  </h2>
                  <p className="text-sm sm:text-base text-gray-100 mb-2">
                    If you have any questions, requests or concerns regarding
                    this Privacy Policy or your personal data, you can reach us
                    at:
                  </p>
                  
                  <p className="text-sm sm:text-base">
                    <span className="font-semibold">Subject line:</span>{" "}
                    “Privacy Policy – ARIA WEALTH”
                  </p>
                </div>
              </div>

            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-500 text-center pt-2">
            This Privacy Policy is for general informational purposes and is to
            be read in conjunction with applicable SEBI, AMFI and other
            regulatory guidelines issued from time to time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
