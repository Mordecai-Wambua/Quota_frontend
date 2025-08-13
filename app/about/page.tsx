import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6">
            About <span className="text-accent">Quota</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground mb-8">
            A platform where diverse voices share unique perspectives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-serif font-medium mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Quota was born from a simple idea: everyone has valuable perspectives worth sharing.
                In a world of information overload, we wanted to create a space for thoughtful,
                meaningful content on any topic.
              </p>
              <p>
                Founded in 2023, we've grown into a community of curious minds exploring technology,
                arts, science, culture, and everything in between.
              </p>
              <p>
                Unlike traditional platforms, we don't limit by topic or format - we celebrate
                the diversity of human thought.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-medium mb-6">Our Values</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Openness</h3>
                  <p className="text-sm text-muted-foreground">
                    We welcome all topics and perspectives that spark thoughtful discussion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    We foster respectful dialogue and meaningful connections between writers and readers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    We emphasize thoughtful, well-crafted content over quick takes and clickbait.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-serif font-medium mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            Whether you want to share your perspective or discover new ones, Quota welcomes you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg gradient-primary text-accent-foreground hover:opacity-90 transition-opacity font-medium"
            >
              Create Account
            </Link>
            <Link
              href="/articles"
              className="px-6 py-3 rounded-lg border border-border hover:bg-card-hover transition-colors font-medium"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}