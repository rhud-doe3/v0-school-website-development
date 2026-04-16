import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink, Bus, Clock, Phone } from "lucide-react"

export function DirectionsSection() {
  return (
    <section id="directions" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us & Transport</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Located in the heart of Thika, our school is easily accessible. We also provide school transport services for students.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Transport Service */}
          <div className="space-y-6">
            <Card className="overflow-hidden bg-white">
              <CardContent className="p-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_b5i3w9b5i3w9b5i3-NVCE3M7hcn6S4e2i2qiFg1I1phj38s.png"
                  alt="Thika Blue Roses Academy School Transport"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                    <Bus className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">School Transport Available</h3>
                    <p className="text-white/80 mb-3">
                      We provide safe and reliable transport services for our students. 
                      Our school van covers various routes within Thika and surrounding areas.
                    </p>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        Safe and comfortable vehicles
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        Experienced and vetted drivers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        Multiple pick-up and drop-off points
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        Affordable transport fees
                      </li>
                    </ul>
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>Contact us for transport inquiries: +254 721 688 891</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">School Hours</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>Monday - Friday: 7:00 AM - 5:00 PM</li>
                      <li>Saturday: 8:00 AM - 12:00 PM (Activities)</li>
                      <li>Sunday: Closed</li>
                    </ul>
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
