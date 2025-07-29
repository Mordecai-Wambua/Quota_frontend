export const WelcomeSection = () => {
    return (
        <section className="max-w-2xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-serif mb-6 text-foreground flex items-center justify-center gap-2">
                    Welcome
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Hi, I'm Frank, a product designer by day and a curious writer by night. I work at Random
                    Solutions, crafting{" "}
                    <a href="#" className="text-accent hover:text-accent/80 underline transition-colors">
                        intuitive user experiences
                    </a>
                    . Here, I share my thoughts on design, engineering, AI, and the random sparks of inspiration that keep me going.
                </p>
            </div>

            <div className="mb-12">
                <h2 className="text-lg font-serif mb-4 text-foreground">Links</h2>
                <div className="flex flex-col gap-2">
                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                        Medium <span className="text-xs">↗</span>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                        Substack <span className="text-xs">↗</span>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                        Twitter <span className="text-xs">↗</span>
                    </a>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm italic">Signature</span>
                </div>
            </div>
        </section>
    );
};