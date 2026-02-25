import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Account setup, verification, and platform basics",
    },
    {
      icon: FileText,
      title: "Orders & Shipping",
      description: "Tracking, delivery times, and logistics",
    },
    {
      icon: MessageCircle,
      title: "Supplier Relations",
      description: "Communication, quotes, and negotiations",
    },
    {
      icon: LifeBuoy,
      title: "Dispute Resolution",
      description: "Returns, refunds, and conflict management",
    },
  ];

  const faqs = [
    {
      question: "How do I verify my business account?",
      answer:
        "To verify your account, upload your business registration documents and tax ID in the 'Verification' section of your profile. Our team reviews all documents within 24-48 hours.",
    },
    {
      question: "What are the payment methods supported?",
      answer:
        "We support various payment methods including bank transfers, mobile money (M-Pesa, MTN Mobile Money), and major credit/debit cards. All transactions are secured by our escrow system.",
    },
    {
      question: "How does the shipping process work?",
      answer:
        "Shipping is handled through our network of verified logistics partners. Once an order is confirmed, you can track its progress in real-time from your dashboard.",
    },
    {
      question: "Can I negotiate prices with suppliers?",
      answer:
        "Yes, our platform supports direct negotiation. You can send quote requests (RFQ) to suppliers and discuss terms before finalizing any transaction.",
    },
    {
      question: "What happens if I receive damaged goods?",
      answer:
        "If you receive damaged goods, report it immediately within 24 hours through the 'Orders' page. Our dispute resolution team will investigate and facilitate a refund or replacement if the claim is valid.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/" })}
            className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Button>
        </div>

        <PageHeader
          title="Support Center"
          subtitle="Operational assistance and knowledge base"
          badge="Help & Documentation"
          showPattern
        />

        {/* Hero Search Section */}
        <section className="bg-muted/30 py-16 border border-border rounded-sm">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-sm font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
              <HelpCircle className="w-3 h-3 mr-2" />
              24/7 Technical Support
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground mb-6">
              How can we support your <br />
              <span className="text-primary">Operations?</span>
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              <Input
                type="text"
                placeholder="SEARCH DOCUMENTATION..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 bg-background border border-border focus:border-primary rounded-sm font-heading uppercase tracking-wider text-lg shadow-sm"
              />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Links / Categories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold uppercase text-foreground">
                  Knowledge Base
                </h2>
                <div className="h-px bg-border flex-1 ml-6"></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer rounded-sm"
                  >
                    <div className="flex items-start">
                      <div className="bg-muted p-3 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors mr-4 rounded-sm border border-border">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold uppercase text-foreground mb-1 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold uppercase text-foreground">
                  Common Inquiries
                </h2>
                <div className="h-px bg-border flex-1 ml-6"></div>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`border rounded-sm transition-all duration-300 ${
                      openFaqIndex === index
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 text-left"
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                    >
                      <span className="font-heading font-bold uppercase text-foreground text-lg pr-4">
                        {faq.question}
                      </span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaqIndex === index
                          ? "max-h-48 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-5 pt-0 text-muted-foreground leading-relaxed border-t border-primary/10">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-muted/30 border border-border p-6 rounded-sm">
              <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                Direct Contact
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Need immediate assistance? Our support engineers are available
                during business hours.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold uppercase tracking-wider rounded-sm justify-start pl-6 h-12">
                  <Phone className="w-4 h-4 mr-3" />
                  +254 700 000 000
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-foreground bg-transparent hover:bg-foreground hover:text-background font-heading font-bold uppercase tracking-wider rounded-sm justify-start pl-6 h-12"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  support@afriamarket.com
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border p-6 relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
              <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-4">
                Documentation
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Download our comprehensive guides for suppliers and retailers.
              </p>
              <ul className="space-y-3">
                {[
                  "Supplier Handbook",
                  "API Documentation",
                  "Trade Guidelines",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer group/item"
                  >
                    <FileText className="w-4 h-4 mr-2 text-muted-foreground group-hover/item:text-primary transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
