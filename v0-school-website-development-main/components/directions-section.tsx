import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

export function DirectionsSection() {
  return (
    <section id="directions" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Located in the heart of Thika, our school is easily accessible. Get directions to our campus below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map Embed */}
          <Card className="overflow-hidden bg-white">
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0735837047784!2d37.0769!3d-1.0333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f6b0d0d0d0d%3A0x0!2sThika%20BlueRoses%20School!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Thika Blue Roses School Location"
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Directions Info */}
          <div className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Our Address</h3>
                    <p className="text-white/80">
                      Thika Blue Roses and Junior School<br />
                      Thika, Kiambu County<br />
                      Kenya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Getting Here</h3>
                    <p className="text-white/80 mb-4">
                      Our school is conveniently located and accessible via public transport 
                      or private vehicle. Use the navigation link below for turn-by-turn directions.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild variant="secondary" className="gap-2">
                        <a
                          href="https://www.google.com/maps/dir/?api=1&destination=Thika+BlueRoses+School"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-4 h-4" />
                          Get Directions
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                        <a
                          href="https://maps.app.goo.gl/oRHAeSwwnqbLA3Bc6?g_st=aw"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open in Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="font-semibold mb-3">Landmarks Near Us</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full" />
                  Located in Thika Town
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full" />
                  Accessible from main Thika Road
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full" />
                  Near public transport routes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
