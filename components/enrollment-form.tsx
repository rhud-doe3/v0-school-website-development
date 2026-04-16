"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, CheckCircle, Loader2 } from "lucide-react"

interface EnrollmentData {
  studentFullName: string
  dateOfBirth: string
  studentAddress: string
  parentGuardianName: string
  phoneNumber: string
  emailAddress: string
  emergencyContact: string
}

export function EnrollmentForm() {
  const [formData, setFormData] = useState<EnrollmentData>({
    studentFullName: "",
    dateOfBirth: "",
    studentAddress: "",
    parentGuardianName: "",
    phoneNumber: "",
    emailAddress: "",
    emergencyContact: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        const result = await response.json()
        
        // Save to localStorage for admin dashboard
        const existingEnrollments = localStorage.getItem("tbrs_enrollments")
        const enrollments = existingEnrollments ? JSON.parse(existingEnrollments) : []
        enrollments.unshift(result.data)
        localStorage.setItem("tbrs_enrollments", JSON.stringify(enrollments))
        
        setIsSubmitted(true)
        setFormData({
          studentFullName: "",
          dateOfBirth: "",
          studentAddress: "",
          parentGuardianName: "",
          phoneNumber: "",
          emailAddress: "",
          emergencyContact: "",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="enrollment" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Enrollment Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for enrolling your child at Thika Blue Roses and Junior School. 
                We will contact you shortly to complete the admission process.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>Submit Another Enrollment</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="enrollment" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Student Enrollment</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Begin your child&apos;s journey to excellence. Fill out the enrollment form below to start the admission process.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Enrollment Form</CardTitle>
                <CardDescription>Please fill in all required information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentFullName">Student&apos;s Full Name *</Label>
                <Input
                  id="studentFullName"
                  name="studentFullName"
                  value={formData.studentFullName}
                  onChange={handleInputChange}
                  placeholder="Enter student's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentAddress">Student&apos;s Address *</Label>
                <Input
                  id="studentAddress"
                  name="studentAddress"
                  value={formData.studentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter student's residential address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentGuardianName">Parent/Guardian Name *</Label>
                <Input
                  id="parentGuardianName"
                  name="parentGuardianName"
                  value={formData.parentGuardianName}
                  onChange={handleInputChange}
                  placeholder="Enter parent or guardian's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., +254 7XX XXX XXX"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address *</Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Emergency contact number"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
