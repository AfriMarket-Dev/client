import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Target,
  Eye,
  Users,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Handshake,
  Star,
  CheckCircle,
  MapPin,
  Building,
  Search,
  MessageSquare,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      value: "2,500+",
      label: "Verified Suppliers",
      color: "text-primary",
    },
    {
      icon: Globe,
      value: "30",
      label: "Districts Covered",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      value: "50K+",
      label: "Products Available",
      color: "text-primary",
    },
    {
      icon: Award,
      value: "98%",
      label: "Success Rate",
      color: "text-primary",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "We verify every supplier and ensure transparent business practices across our platform.",
    },
    {
      icon: Handshake,
      title: "Partnership Focus",
      description:
        "Building lasting business relationships between suppliers and contractors across Rwanda.",
    },
    {
      icon: Heart,
      title: "Community First",
      description:
        "Supporting local construction businesses to grow and thrive in the Rwandan marketplace.",
    },
    {
      icon: TrendingUp,
      title: "Innovation & Growth",
      description:
        "Leveraging technology to create opportunities and drive economic growth in construction.",
    },
  ];

  const team = [
    {
      name: "Jean-Paul Habimana",
      position: "Chief Executive Officer",
      image:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Former construction consultant with 15+ years in Rwandan trade and commerce.",
      location: "Kigali, Rwanda",
    },
    {
      name: "Alice Umutoni",
      position: "Chief Technology Officer",
      image:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Tech entrepreneur who built successful platforms across East Africa.",
      location: "Kigali, Rwanda",
    },
    {
      name: "Patrick Nkurunziza",
      position: "Head of Operations",
      image:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Supply chain expert with deep knowledge of construction logistics and trade.",
      location: "Kigali, Rwanda",
    },
    {
      name: "Grace Mukamana",
      position: "Head of Business Development",
      image:
        "https://images.pexels.com/photos/5625135/pexels-photo-5625135.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Business strategist focused on expanding trade relationships across Rwanda.",
      location: "Kigali, Rwanda",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "AfrikaMarket Founded",
      description:
        "Started with a vision to connect construction businesses and streamline procurement in Rwanda.",
    },
    {
      year: "2023",
      title: "First 100 Suppliers",
      description:
        "Reached our first milestone of 100 verified suppliers across 15 Rwandan districts.",
    },
    {
      year: "2024",
      title: "Platform Expansion",
      description:
        "Expanded to 30 districts and launched advanced features for better supplier-buyer matching.",
    },
    {
      year: "2025",
      title: "Major Growth",
      description:
        "Achieved 1,000+ suppliers and facilitated over RWF 50B in trade volume.",
    },
    {
      year: "2026",
      title: "National Coverage",
      description:
        "Now serving all of Rwanda with 2,500+ verified suppliers and growing daily.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Button>
        </div>

        {/* hero section */}
        <section className="relative py-20 overflow-hidden bg-background border border-border rounded-sm">
          <div
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 text-center px-4">
            <div className="inline-flex items-center px-4 py-1.5 border border-primary/20 rounded-lg bg-primary/5 text-primary text-sm font-heading font-bold uppercase tracking-wider mb-8">
              <Globe className="w-4 h-4 mr-2" />
              Empowering Rwanda's Construction Industry
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase text-foreground mb-6 leading-none">
              Building Rwanda's <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                Digital Infrastructure
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
              AfrikaMarket is the blueprint for modern construction procurement
              in Rwanda. We are constructing a verified, transparent network
              that connects suppliers directly with contractors across the
              nation.
            </p>

            {/* stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-card p-6 border border-border hover:border-primary transition-colors duration-300 text-left"
                >
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 group-hover:border-primary transition-colors" />
                  <div className="mb-4 text-primary">
                    <stat.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* mission & vision */}
        <section className="py-20 bg-muted/20 border border-border rounded-sm">
          <div className="px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* mission */}
              <div className="relative p-8 border-l-4 border-primary bg-card/50">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 border border-primary text-primary mr-4 rounded-sm">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold uppercase text-foreground">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To engineer a frictionless digital marketplace that
                  standardizes trust, transparency, and efficiency in Rwanda's
                  construction industry. We are laying the groundwork for
                  businesses to scale and thrive.
                </p>
                <div className="space-y-4">
                  {[
                    "Connect verified suppliers with quality contractors",
                    "Facilitate transparent and secure transactions",
                    "Support construction businesses in scaling operations",
                    "Promote economic growth in Rwanda's building sector",
                  ].map((point, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* vision */}
              <div className="relative p-8 border-l-4 border-foreground bg-card/50">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 border border-foreground text-foreground mr-4 rounded-sm">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold uppercase text-foreground">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To construct the premier construction procurement
                  infrastructure for Rwanda, where every business—from
                  micro-contractors to large developers—operates on a unified,
                  efficient platform.
                </p>
                <div className="space-y-4">
                  {[
                    "The central hub for Rwanda's construction trade",
                    "A rigorous network of verified entities",
                    "Digital transformation of traditional supply chains",
                    "Sustainable economic architecture for all districts",
                  ].map((point, index) => (
                    <div key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-foreground mr-3 shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* values */}
        <section className="py-24 bg-background border border-border rounded-sm">
          <div className="px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold uppercase text-foreground mb-4">
                Core Principles
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group p-8 border border-border hover:border-primary transition-all duration-300 bg-card hover:bg-card/80 rounded-sm"
                >
                  <div className="w-12 h-12 bg-muted text-foreground flex items-center justify-center mb-6 rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* team */}
        <section className="py-24 bg-muted/10 border border-border rounded-sm">
          <div className="px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold uppercase text-foreground mb-4">
                Leadership Team
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group bg-background border border-border hover:border-primary transition-all duration-300 p-4 rounded-sm"
                >
                  <div className="relative mb-6 overflow-hidden aspect-square border-b border-border group-hover:border-primary transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-wider mb-3">
                    {member.position}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-start text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <MapPin className="w-3 h-3 mr-1 text-primary" />
                    {member.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* timeline */}
        <section className="py-24 bg-background border border-border rounded-sm">
          <div className="px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold uppercase text-foreground mb-4">
                Company Timeline
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6" />
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-border"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center",
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse",
                    )}
                  >
                    <div className="w-1/2 px-8">
                      <div
                        className={cn(
                          "space-y-2",
                          index % 2 === 0 ? "text-right" : "text-left",
                        )}
                      >
                        <div className="inline-block px-3 py-1 bg-muted border border-border text-foreground rounded-sm font-heading font-bold text-sm">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-heading font-bold uppercase text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-center w-4 h-4 bg-background border border-primary rounded-full">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="py-24 bg-background border border-border rounded-sm">
          <div className="px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold uppercase text-foreground mb-4">
                How It Works
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6" />
              <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
                A simple, transparent process to connect you with the right
                suppliers.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8 relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-border -z-10" />
              {[
                {
                  icon: Search,
                  title: "Search",
                  description: "Browse verified suppliers",
                },
                {
                  icon: MessageSquare,
                  title: "Connect",
                  description: "Chat directly with providers",
                },
                {
                  icon: FileText,
                  title: "Quote",
                  description: "Receive formal offers",
                },
                {
                  icon: Handshake,
                  title: "Agree",
                  description: "Finalize terms",
                },
                {
                  icon: Star,
                  title: "Review",
                  description: "Rate your experience",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center group relative bg-background"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-border rounded-lg mb-6 shadow-sm group-hover:border-primary group-hover:text-primary transition-all duration-300 relative z-10">
                    <step.icon
                      className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors"
                      strokeWidth={1.5}
                    />
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded bg-foreground text-background text-xs font-bold flex items-center justify-center border border-background">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed px-2 font-medium">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 bg-muted/20 border border-border rounded-sm">
          <div className="px-4 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-heading font-bold uppercase text-foreground mb-6">
                  Built for Rwanda's <br /> Construction Industry
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  A marketplace engineered specifically for local needs.
                  Efficient, transparent, and reliable connection between
                  builders and suppliers.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: Search,
                      title: "Smart Discovery",
                      desc: "Filter by district to find materials closest to your site.",
                    },
                    {
                      icon: Handshake,
                      title: "Direct Negotiation",
                      desc: "Chat with suppliers and request formal quotes directly.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Verified Trust",
                      desc: "All suppliers are verified to ensure reliable partnerships.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-background border border-border rounded-sm flex items-center justify-center text-primary">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold uppercase text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px] border border-border rounded-sm overflow-hidden group">
                <img
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Construction Site"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </section>

        {/* cta section */}
        <section className="py-24 bg-foreground text-background rounded-sm border border-border overflow-hidden relative">
          <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 text-center px-4">
            <Building
              className="w-16 h-16 mx-auto mb-6 text-primary"
              strokeWidth={1}
            />
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-6">
              Join Rwanda's Construction <br />{" "}
              <span className="text-primary">Digital Transformation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Whether you supply materials or manage construction projects, your
              success starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth/signup")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold uppercase tracking-widest text-lg h-14 px-8 rounded-sm"
              >
                Become a Supplier
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/products")}
                className="border border-background text-background hover:bg-background hover:text-foreground font-heading font-bold uppercase tracking-widest text-lg h-14 px-8 rounded-sm bg-transparent"
              >
                Start Sourcing
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
