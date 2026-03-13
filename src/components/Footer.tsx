import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-display font-bold">neoelectron</span>
            <p className="mt-3 text-sm opacity-70">Connecting talent with opportunity, one gig at a time.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">Categories</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/categories/graphics-design" className="hover:opacity-100 transition-opacity">Graphics & Design</Link></li>
              <li><Link to="/categories/programming-tech" className="hover:opacity-100 transition-opacity">Programming & Tech</Link></li>
              <li><Link to="/categories/digital-marketing" className="hover:opacity-100 transition-opacity">Digital Marketing</Link></li>
              <li><Link to="/categories/video-animation" className="hover:opacity-100 transition-opacity">Video & Animation</Link></li>
              <li><Link to="/categories/writing-translation" className="hover:opacity-100 transition-opacity">Writing & Translation</Link></li>
              <li><Link to="/categories/ai-services" className="hover:opacity-100 transition-opacity">AI Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">For Business</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/pro" className="hover:opacity-100 transition-opacity">Neoelectron Pro</Link></li>
              <li><Link to="/business/dashboard" className="hover:opacity-100 transition-opacity">Business Dashboard</Link></li>
              <li><Link to="/partnerships" className="hover:opacity-100 transition-opacity">Partnerships</Link></li>
              <li><Link to="/become-seller" className="hover:opacity-100 transition-opacity">Become a Seller</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">About</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/careers" className="hover:opacity-100 transition-opacity">Careers</Link></li>
              <li><Link to="/press" className="hover:opacity-100 transition-opacity">Press & News</Link></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">Support</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/help" className="hover:opacity-100 transition-opacity">Help & Support</Link></li>
              <li><Link to="/trust-safety" className="hover:opacity-100 transition-opacity">Trust & Safety</Link></li>
              <li><Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">Community</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><Link to="/forum" className="hover:opacity-100 transition-opacity">Forum</Link></li>
              <li><Link to="/events" className="hover:opacity-100 transition-opacity">Events</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-50">© 2026 neoelectron. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm opacity-50">
            <span>English</span>
            <span>₹ INR</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
