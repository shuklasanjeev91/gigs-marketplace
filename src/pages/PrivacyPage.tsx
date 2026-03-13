import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly, such as your name, email address, profile information, and payment details when you register or transact on the platform. We also automatically collect usage data including IP address, browser type, device identifiers, pages visited, and clickstream data through cookies and similar technologies.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to provide and improve the Service, process transactions, send important account and order notifications, personalise your experience, prevent fraud and abuse, comply with legal obligations, and communicate updates or promotions (with your consent where required).`,
  },
  {
    title: "3. Sharing of Information",
    content: `We share your information with sellers or buyers only as necessary to complete transactions. We may share data with trusted third-party service providers (payment processors, cloud hosting, analytics) bound by confidentiality obligations. We do not sell your personal data to third parties. We may disclose data when required by law or to protect our users' safety.`,
  },
  {
    title: "4. Cookies & Tracking",
    content: `We use cookies and similar technologies to remember your preferences, analyse traffic, and deliver relevant advertising. You can manage cookie preferences through your browser settings. Disabling cookies may affect some platform functionality.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal data for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data subject to legal retention requirements.`,
  },
  {
    title: "6. Security",
    content: `We implement industry-standard security measures including TLS encryption, access controls, and regular security audits to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Your Rights",
    content: `Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data. You may also have the right to data portability and to object to certain processing. To exercise these rights, contact us at privacy@neoelectron.com.`,
  },
  {
    title: "8. International Transfers",
    content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses approved by relevant data protection authorities.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our Service is not directed to children under 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal information, we will take steps to delete it promptly.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy periodically. We will notify you of material changes via email or platform notice. Your continued use of the Service following notification constitutes your acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `For privacy-related inquiries, contact our Data Protection Officer at privacy@neoelectron.com or write to: Neoelectron Technologies Pvt. Ltd., 100 MG Road, Bangalore 560001, India.`,
  },
];

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 2026</p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            At Neoelectron, your privacy matters. This Privacy Policy describes what personal data we collect, why we collect it, how we use it, and your rights regarding your information.
          </p>

          <div className="space-y-8">
            {sections.map((sec) => (
              <section key={sec.title}>
                <h2 className="text-lg font-semibold text-foreground mb-2">{sec.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{sec.content}</p>
              </section>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
