import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Neoelectron platform (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. These Terms apply to all users, including buyers, sellers, and visitors.`,
  },
  {
    title: "2. Eligibility",
    content: `You must be at least 18 years old to create an account or use the Service. By using the Service, you represent and warrant that you meet this age requirement and that you have the authority to enter into a binding agreement.`,
  },
  {
    title: "3. User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account credentials. You agree not to share your account with others or use another person's account. Neoelectron is not responsible for any losses arising from unauthorized account access caused by your own failure to safeguard your credentials.`,
  },
  {
    title: "4. Buying & Selling",
    content: `Buyers may purchase services from sellers on the platform. Sellers agree to deliver services as described in their gig. Neoelectron acts as an intermediary and is not a party to the contract between buyer and seller. Any disputes between buyers and sellers are handled in accordance with our Resolution Policy.`,
  },
  {
    title: "5. Payments & Fees",
    content: `All transactions are processed through Neoelectron's payment system. Buyers are charged the full order price at checkout. Sellers receive payment after the order is marked complete and the clearing period (14 days; 7 days for Top Rated Sellers) has elapsed. Neoelectron charges a service fee on each transaction as described on our Pricing page.`,
  },
  {
    title: "6. Prohibited Activities",
    content: `You may not use the platform for illegal activities, fraudulent orders, spam, harassment, IP infringement, fake reviews, or circumventing our payment system. Violations may result in account suspension or permanent removal without refund.`,
  },
  {
    title: "7. Intellectual Property",
    content: `Sellers represent that they own all rights to the work they deliver, or have the necessary licenses. Upon full payment, sellers transfer all relevant IP rights to the buyer unless otherwise specified in the gig. Neoelectron retains a license to display, promote, and distribute content submitted to the platform.`,
  },
  {
    title: "8. Dispute Resolution",
    content: `Buyers and sellers are encouraged to resolve disputes amicably. If unable to do so, either party may open a dispute via our Resolution Center. Neoelectron's decision in such cases is final. Disputes must be raised within 14 days of delivery.`,
  },
  {
    title: "9. Disclaimers",
    content: `The Service is provided on an "as is" basis. Neoelectron makes no warranties, express or implied, about the quality or reliability of any seller's services. We do not guarantee uninterrupted access to the platform and reserve the right to modify or discontinue features at any time.`,
  },
  {
    title: "10. Limitation of Liability",
    content: `To the fullest extent permitted by law, Neoelectron's liability shall not exceed the amount paid by you for the specific order giving rise to the claim in the 12 months preceding the claim. We are not liable for indirect, incidental, special, or consequential damages.`,
  },
  {
    title: "11. Changes to Terms",
    content: `We may update these Terms from time to time. We'll notify you by email or platform notice of material changes. Your continued use of the Service after such notice constitutes your acceptance of the updated Terms.`,
  },
  {
    title: "12. Governing Law",
    content: `These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Bangalore, India.`,
  },
  {
    title: "13. Contact",
    content: `For questions about these Terms, contact us at legal@neoelectron.com.`,
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 2026</p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Please read these Terms of Service carefully before using the Neoelectron platform. These Terms constitute a legally binding agreement between you and Neoelectron Technologies Pvt. Ltd.
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

export default TermsPage;
