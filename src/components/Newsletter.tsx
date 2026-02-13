import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-stone-100 section-divider">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-orange-600 font-semibold uppercase tracking-wide text-sm mb-4">
                <Mail className="w-4 h-4" />
                Stay Ahead
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                Get the Latest Construction <br /> Market Insights
              </h2>
              <p className="text-stone-500 text-lg mb-8">
                Join 50,000+ contractors and suppliers receiving weekly updates
                on pricing trends, new machinery, and regulatory changes in
                African construction.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-stone-600">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span>Weekly price watch for cement & steel</span>
                </div>
                <div className="flex items-center text-stone-600">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span>New heavy equipment arrival alerts</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-8 rounded-xl border border-stone-100">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    Subscribe to Newsletter
                  </h3>
                  <p className="text-stone-500 text-sm mb-6">
                    No spam, just valuable industry data.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Enter your business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold h-11"
                    >
                      Subscribe Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    Subscribed!
                  </h3>
                  <p className="text-stone-500">
                    Check your inbox for the welcome report.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
