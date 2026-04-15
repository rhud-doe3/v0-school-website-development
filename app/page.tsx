import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EnrollmentForm } from "@/components/enrollment-form"
import { VacancyForm } from "@/components/vacancy-form"
import { ContactSection } from "@/components/contact-section"
import { DirectionsSection } from "@/components/directions-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <EnrollmentForm />
      <VacancyForm />
      <ContactSection />
      <DirectionsSection />
      <Footer />
    </main>
  )
}
