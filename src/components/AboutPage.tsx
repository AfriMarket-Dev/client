import React from "react";
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
} from "lucide-react";
import { Button } from "./ui/Button";

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const stats = [
    {
      icon: Users,
      value: "2,500+",
      label: "Verified Suppliers",
      color: "from-info to-info/80",
    },
    {
      icon: Globe,
      value: "54",
      label: "African Countries",
      color: "from-success to-success/80",
    },
    {
      icon: TrendingUp,
      value: "50K+",
      label: "Products Available",
      color: "from-primary to-primary/80",
    },
    {
      icon: Award,
      value: "98%",
      label: "Success Rate",
      color: "from-chart-5 to-chart-5/80",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "We verify every supplier and ensure transparent business practices across our platform.",
      color: "from-success to-success/80",
    },
    {
      icon: Handshake,
      title: "Partnership Focus",
      description:
        "Building lasting business relationships between suppliers and retailers across Africa.",
      color: "from-info to-info/80",
    },
    {
      icon: Heart,
      title: "Community First",
      description:
        "Supporting African businesses to grow and thrive in the global marketplace.",
      color: "from-destructive to-destructive/80",
    },
    {
      icon: TrendingUp,
      title: "Innovation & Growth",
      description:
        "Leveraging technology to create opportunities and drive economic growth.",
      color: "from-chart-5 to-chart-5/80",
    },
  ];

  const team = [
    {
      name: "Amara Okafor",
      position: "Chief Executive Officer",
      image:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Former McKinsey consultant with 15+ years in African trade and commerce.",
      location: "Lagos, Nigeria",
    },
    {
      name: "Kwame Asante",
      position: "Chief Technology Officer",
      image:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Tech entrepreneur who built successful fintech platforms across West Africa.",
      location: "Accra, Ghana",
    },
    {
      name: "Fatima Al-Rashid",
      position: "Head of Operations",
      image:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Supply chain expert with deep knowledge of African logistics and trade.",
      location: "Cairo, Egypt",
    },
    {
      name: "Thandiwe Mthembu",
      position: "Head of Business Development",
      image:
        "https://images.pexels.com/photos/5625135/pexels-photo-5625135.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Business strategist focused on expanding trade relationships across Southern Africa.",
      location: "Cape Town, South Africa",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "AfrikaMarket Founded",
      description:
        "Started with a vision to connect African businesses and promote intra-African trade.",
    },
    {
      year: "2021",
      title: "First 100 Suppliers",
      description:
        "Reached our first milestone of 100 verified suppliers across 10 African countries.",
    },
    {
      year: "2022",
      title: "Platform Expansion",
      description:
        "Expanded to 25 countries and launched advanced features for better supplier-buyer matching.",
    },
    {
      year: "2023",
      title: "Major Growth",
      description:
        "Achieved 1,000+ suppliers and facilitated over $50M in trade volume.",
    },
    {
      year: "2024",
      title: "Continental Reach",
      description:
        "Now serving 54 African countries with 2,500+ verified suppliers and growing.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-primary mb-4 pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              About AfrikaMarket
            </h1>
            <p className="text-muted-foreground mt-1">
              Connecting Africa through trade and commerce
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-warning/80 to-warning/10 py-20 overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern
                id="about-pattern"
                x="0"
                y="0"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="60,20 90,50 60,80 30,50"
                  fill="currentColor"
                  opacity="0.4"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.3"
                />
                <path
                  d="M30,30 L90,90 M90,30 L30,90"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#about-pattern)"
              className="text-primary"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary border-2 border-primary/20 shadow-lg mb-8">
            <Globe className="w-5 h-5 mr-2" />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-semibold">
              Empowering African Commerce
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Building Africa's
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              Digital Marketplace
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            AfrikaMarket is more than a platform – we're a movement dedicated to
            transforming African commerce by connecting verified suppliers with
            retailers across the continent, fostering economic growth and
            building lasting business relationships.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl text-white mb-4 mx-auto`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="relative">
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white mr-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To revolutionize African commerce by creating a trusted,
                  transparent, and efficient digital marketplace that connects
                  verified suppliers with retailers across the continent,
                  enabling businesses to grow, thrive, and contribute to
                  Africa's economic transformation.
                </p>
                <div className="space-y-3">
                  {[
                    "Connect verified suppliers with quality retailers",
                    "Facilitate transparent and secure business transactions",
                    "Support African businesses in scaling their operations",
                    "Promote intra-African trade and economic integration",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative">
              <div className="bg-gradient-to-br from-info/10 to-info/5 rounded-3xl p-8 border border-info/20">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-info to-info/80 rounded-2xl text-white mr-4">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To become Africa's leading wholesale marketplace, where every
                  business – from small retailers to large enterprises – can
                  easily discover, connect with, and trade with trusted
                  suppliers, driving sustainable economic growth across the
                  continent.
                </p>
                <div className="space-y-3">
                  {[
                    "Be the go-to platform for African wholesale trade",
                    "Foster a community of successful African businesses",
                    "Drive digital transformation in African commerce",
                    "Create lasting economic impact across all 54 countries",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="w-5 h-5 text-info mr-3 flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve the
              African business community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl text-white mb-4`}
                >
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced leaders from across Africa, united by a shared vision
              of transforming African commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-background shadow-lg"
                />
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a simple idea to Africa's premier wholesale marketplace –
              here's how we've grown.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className="w-1/2 px-8">
                    <div
                      className={`space-y-2 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                    >
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-bold text-sm">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-background border-4 border-primary rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Join the AfrikaMarket Community
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Whether you're a supplier looking to expand your reach or a retailer
            seeking quality products, AfrikaMarket is your gateway to African
            commerce success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-card text-primary hover:bg-muted shadow-lg text-lg h-auto py-4 px-8"
            >
              Become a Supplier
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 text-lg h-auto py-4 px-8"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
