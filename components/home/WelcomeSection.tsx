import { useState, FormEvent, ChangeEvent } from "react";

export const WelcomeSection = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    // TODO: send data to backend or API
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

    return (
      <section className="max-w-5xl mx-auto relative overflow-hidden py-10">
          {/* Decorative gradient elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"></div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-tl from-accent/10 to-transparent blur-3xl"></div>
          </div>

          <div className="container">
              <div className="max-w-3xl mx-auto text-center mb-16">
                  <h1 className="text-5xl font-serif font-bold mb-6 text-foreground">
                      Welcome to <span className="gradient-text">Quota</span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                      A platform for thoughtful discourse on design, technology, and creative work.
                      Share your perspectives and discover insights from our community.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-16">
                  <div className="card hover:shadow-elegant">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"/>
                          </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">For Writers</h3>
                      <p className="text-muted-foreground">
                          Publish with our beautiful editor and reach an engaged audience.
                      </p>
                  </div>

                  <div className="card hover:shadow-elegant">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                          </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">For Readers</h3>
                      <p className="text-muted-foreground">
                          Discover insightful articles curated for depth and originality.
                      </p>
                  </div>

                  <div className="card hover:shadow-elegant">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>
                          </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                      <p className="text-muted-foreground">
                          Elevate thoughtful discourse in tech and design communities.
                      </p>
                  </div>
              </div>

              <div className="flex flex-col items-center">
                  <div className="flex gap-4 mb-6">
                      <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                          </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                              <path d="M9 18c-4.51 2-5-2-7-2"/>
                          </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                          </svg>
                      </a>
                  </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="max-w-md w-full">
                      <h3 className="text-sm font-medium text-center text-muted-foreground mb-3">
                          Get the best articles in your inbox
                      </h3>
                      <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            className="flex-1 px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring focus:ring-accent/50"
                          />
                          <button
                            type="submit"
                            disabled={!email}
                            className="px-4 py-2 rounded-lg gradient-primary disabled:opacity-50">
                              Subscribe
                          </button>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-2">
                          We respect your privacy. Unsubscribe at any time.
                      </p>
                  </div>
                </form>
              </div>
          </div>
      </section>
    );
};