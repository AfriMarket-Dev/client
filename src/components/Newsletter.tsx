import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-primary/30">
              <Mail className="w-4 h-4 mr-2" />
              Stay Updated
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Never Miss New
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Suppliers & Deals
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get weekly updates on new suppliers, exclusive deals, market insights, 
              and industry trends delivered straight to your inbox.
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span>Weekly supplier spotlights and new arrivals</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span>Exclusive wholesale deals and bulk pricing</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span>Market trends and business growth tips</span>
              </div>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {!isSubscribed ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Subscribe to Our Newsletter
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-6 bg-white/10 border-white/30 text-white placeholder-gray-400 focus:bg-background/20 transition-colors"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary transition-all duration-300 transform hover:scale-105 py-6 h-auto"
                    >
                      Subscribe Now
                    </Button>
                  </form>
                  
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    You've successfully subscribed to our newsletter. 
                    Check your inbox for a confirmation email.
                  </p>
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;