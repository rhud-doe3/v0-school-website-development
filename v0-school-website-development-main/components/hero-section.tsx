import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/THIKA%20BLUE%20ROSES%20NEW%20IMAGE-ym5zdpk3i4pSdLOGuroEZzHtP0Jzg9.jpeg"
          alt="Thika Blue Roses School Entrance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-primary-foreground">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%286%29.png-Q38EcXynaxQ9WBgWeT8qUCarPqUFhV.jpeg"
              alt="School Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-white/30"
            />
            <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
              CBC Compliant
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Thika Blue Roses And Junior School
          </h1>
          
          <p className="text-xl md:text-2xl font-medium mb-4 text-white/90">
            Motto: <span className="italic">&quot;Faith and Hardwork&quot;</span>
          </p>
          
          <p className="text-lg mb-8 text-white/80 leading-relaxed">
            A leading world-class school where every child becomes a healthy and productive adult.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#enrollment">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Enroll Now
              </Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </a>
            <a
              href="https://wa.me/254721688891"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat with Us
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
