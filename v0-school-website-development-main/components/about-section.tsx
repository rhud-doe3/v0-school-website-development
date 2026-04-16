import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, BookOpen, Award, Heart, Users, Shield, Star } from "lucide-react"

const coreValues = [
  "Hardwork",
  "Determination",
  "Responsibility",
  "Dedication",
  "Respect",
  "Honesty",
  "Confidence",
  "Team Work",
  "Love",
  "Faithfulness",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Our School</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what makes Thika Blue Roses and Junior School a premier institution for holistic education.
          </p>
        </div>

        {/* Vision, Mission, Motto */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-white/90">
                A leading world-class school where every child becomes a healthy and productive adult.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary text-secondary-foreground border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-white/90">
                To equip children with knowledge, skills and attitude in safe and supportive environment, 
                promoting self-discipline, motivation and excellence in learning.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Motto</h3>
              <p className="text-white/90 text-2xl font-semibold italic">
                &quot;Faith and Hardwork&quot;
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">Our Core Values</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coreValues.map((value, index) => (
              <span
                key={index}
                className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium text-sm"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%283%29-I0GxYDBISfNY55ktsg9JHFCzo0qHCi.png"
              alt="Students during school event"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%284%29.png-DHFSlXTg6Pkf2HMNFWyfjq7V3bxKB0.jpeg"
              alt="Students celebration with balloons"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values and Mission Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Core Values and Mission</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                At Thika Blue Rose and Junior School (TBRS), we actively pursue our core values. We are a student-centered 
                institution, valuing each individual student dearly. <strong>Students first:</strong> Our decisions always 
                prioritize our students&apos; best interests.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We provide a safe and supportive learning environment. Our sustainable practices ensure economic and 
                environmental responsibility. As a diverse and inclusive community, we offer learning opportunities for all members.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Educational Philosophy</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                At Thika Blue Rose and Junior School (TBRS), we believe in fostering an environment where all students 
                have an inherent ability to learn and achieve academic excellence. We recognize and celebrate each 
                individual&apos;s special talents, helping every student realize their full potential.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our goal is to develop creative thinkers by nurturing a life-long love of learning and bridging the gap 
                between a child&apos;s potential and actual achievement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Curriculum and Academic Standards</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Thika Blue Rose and Junior School (TBRS) opens doors to powerful CBC Kenyan curriculum experiences for 
                our students through a student-centered and active experiential learning approach. Our community is a 
                valuable resource for learning, and we promote sustainability values to our students and community.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We endorse the concept of &apos;world citizenship&apos; and empower our students to address issues that impact 
                their lives and others, promoting intercultural understanding and respect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Commitment to Quality</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                At Thika Blue Rose and Junior School (TBRS), we strictly adhere to the Competency-Based Curriculum (CBC), 
                ensuring uncompromised quality. Our collaborative approach involves students, teachers, and parents working together.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We prioritize continuous teacher training to stay updated on the latest methodologies and technologies. 
                We focus on student metacognition and independence, fostering self-awareness, critical thinking, and problem-solving skills.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="bg-accent rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">Why Choose Us?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">CBC Compliant</h4>
              <p className="text-muted-foreground text-sm">Following Kenya&apos;s Competency-Based Curriculum</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Student-Centered</h4>
              <p className="text-muted-foreground text-sm">Every decision prioritizes our students&apos; best interests</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Safe Environment</h4>
              <p className="text-muted-foreground text-sm">Secure and supportive learning atmosphere</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Excellence</h4>
              <p className="text-muted-foreground text-sm">Committed to academic and personal excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
