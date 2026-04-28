import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhackAMole } from "@/components/whack-a-mole"
import { Gamepad2 } from "lucide-react"

export const metadata = {
  title: "Games | Portfolio & Blog",
  description: "Take a break and play some fun mini-games!",
}

export default function GamesPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-foreground to-foreground/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
            <Gamepad2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Fun Zone</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-background mb-4 text-balance">
            Take a Break & Play
          </h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto text-pretty">
            Need a quick break? Challenge yourself with these fun mini-games.
          </p>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Game */}
            <div className="bg-muted/50 rounded-2xl p-8 border border-border">
              <WhackAMole />
            </div>

            {/* Instructions */}
            <div className="lg:sticky lg:top-32">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-4">
                How to Play
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Click Start</h3>
                    <p className="text-sm text-muted-foreground">
                      Press the Start button to begin the 30-second challenge.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Whack the Moles</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on moles as they pop up from their holes. Be quick!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Build Combos</h3>
                    <p className="text-sm text-muted-foreground">
                      Hit multiple moles in quick succession to build combos and multiply your score up to 5x!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Beat Your High Score</h3>
                    <p className="text-sm text-muted-foreground">
                      Your high score is saved locally. Keep playing to beat it!
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Pro Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    The game gets faster as time runs out - stay focused!
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Watch the edges of the board - moles appear randomly.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Keep your cursor near the center for faster reactions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
