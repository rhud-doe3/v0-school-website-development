"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealtimeStatus } from "@/components/realtime-status"
import { useRealtimeSubscriptions } from "@/lib/hooks/useRealtimeSubscriptions"
import { 
  Lock, 
  Smartphone, 
  ArrowLeft, 
  Users, 
  Briefcase, 
  Loader2,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle
} from "lucide-react"

// Data types
interface EnrollmentRecord {
  id: string
  studentFullName: string
  dateOfBirth: string
  studentAddress: string
  parentGuardianName: string
  phoneNumber: string
  emailAddress: string
  emergencyContact: string
  submittedAt: string
}

interface VacancyRecord {
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  submittedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // Data
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([])
  const [vacancies, setVacancies] = useState<VacancyRecord[]>([])
  const [realtimeConnected, setRealtimeConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | undefined>()

  // Real-time subscriptions
  useRealtimeSubscriptions({
    onEnrollmentInsert: useCallback((enrollment: EnrollmentRecord) => {
      console.log('[v0] Adding new enrollment to UI:', enrollment.id)
      setEnrollments(prev => [enrollment, ...prev])
      setLastUpdate(new Date())
    }, []),
    onEnrollmentUpdate: useCallback((enrollment: EnrollmentRecord) => {
      console.log('[v0] Updating enrollment in UI:', enrollment.id)
      setEnrollments(prev =>
        prev.map(e => e.id === enrollment.id ? enrollment : e)
      )
      setLastUpdate(new Date())
    }, []),
    onEnrollmentDelete: useCallback((id: string) => {
      console.log('[v0] Removing enrollment from UI:', id)
      setEnrollments(prev => prev.filter(e => e.id !== id))
      setLastUpdate(new Date())
    }, []),
    onReviewInsert: useCallback((review: VacancyRecord) => {
      console.log('[v0] Adding new vacancy/review to UI:', review.id)
      setVacancies(prev => [review, ...prev])
      setLastUpdate(new Date())
    }, []),
    onReviewUpdate: useCallback((review: VacancyRecord) => {
      console.log('[v0] Updating vacancy/review in UI:', review.id)
      setVacancies(prev =>
        prev.map(v => v.id === review.id ? review : v)
      )
      setLastUpdate(new Date())
    }, []),
    onReviewDelete: useCallback((id: string) => {
      console.log('[v0] Removing vacancy/review from UI:', id)
      setVacancies(prev => prev.filter(v => v.id !== id))
      setLastUpdate(new Date())
    }, []),
    onConnectionChange: useCallback((connected: boolean) => {
      console.log('[v0] Real-time connection status:', connected)
      setRealtimeConnected(connected)
    }, []),
  })

  // Load initial data from API on authentication
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        try {
          const [enrollmentsRes, vacanciesRes] = await Promise.all([
            fetch('/api/enrollments'),
            fetch('/api/reviews')
          ])
          
          if (enrollmentsRes.ok) {
            const data = await enrollmentsRes.json()
            console.log('[v0] Loaded enrollments:', data.length)
            setEnrollments(data)
          }
          
          if (vacanciesRes.ok) {
            const data = await vacanciesRes.json()
            console.log('[v0] Loaded vacancies:', data.length)
            setVacancies(data)
          }
          
          setLastUpdate(new Date())
        } catch (err) {
          console.error('[v0] Error loading data:', err)
        }
      }
      
      loadData()
    }
  }, [isAuthenticated])

  const handleRequestOtp = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    
    // Simulate sending OTP to +254116335366
    // In a real app, you would integrate with an SMS API like Africa's Talking or Twilio
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setShowOtpInput(true)
      setSuccess(`OTP sent to +254 116 335 366. Please check and enter the code below.`)
      
      // For demo purposes, log the OTP (in production, this would be sent via SMS)
      console.log("[v0] OTP for admin access:", newOtp)
      console.log("[v0] OTP would be sent to: +254116335366")
      
    } catch {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    setError("")
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (otp === generatedOtp) {
      setIsAuthenticated(true)
      setSuccess("Authentication successful!")
    } else {
      setError("Invalid OTP. Please try again.")
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowOtpInput(false)
    setOtp("")
    setGeneratedOtp("")
    setError("")
    setSuccess("")
  }

  // OTP Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%286%29.png-Q38EcXynaxQ9WBgWeT8qUCarPqUFhV.jpeg"
                alt="Thika Blue Roses School Logo"
                width={80}
                height={80}
                className="rounded-full mx-auto"
              />
            </div>
            <CardTitle className="text-2xl text-primary">Admin Portal</CardTitle>
            <CardDescription>
              Thika Blue Roses and Junior School
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showOtpInput ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Secure OTP Verification Required
                  </p>
                  <p className="text-xs text-muted-foreground">
                    An OTP will be sent to the authorized phone number for verification.
                  </p>
                </div>

                <div className="bg-accent rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Verification Number</p>
                      <p className="text-xs text-muted-foreground">+254 116 335 366</p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    {success}
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Request OTP"
                  )}
                </Button>

                <Link href="/" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Website
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Enter the 6-digit OTP sent to
                  </p>
                  <p className="font-semibold text-primary">+254 116 335 366</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP"
                    className="text-center text-2xl tracking-widest"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    {success}
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button 
                    onClick={() => setShowOtpInput(false)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Change Number
                  </button>
                  <button 
                    onClick={handleRequestOtp}
                    className="text-primary hover:underline"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%286%29.png-Q38EcXynaxQ9WBgWeT8qUCarPqUFhV.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="font-bold">Admin Dashboard</h1>
              <p className="text-xs text-white/70">Thika Blue Roses School</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm hover:underline">
              View Website
            </Link>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Real-time Status */}
        <div className="mb-6">
          <RealtimeStatus connected={realtimeConnected} lastUpdate={lastUpdate} />
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                  <p className="text-3xl font-bold text-primary">{enrollments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Job Applications</p>
                  <p className="text-3xl font-bold text-secondary">{vacancies.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="vacancies">Job Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Student Enrollments
                </CardTitle>
                <CardDescription>
                  View all student enrollment applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrollments.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No enrollment applications yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrollments.map((enrollment) => (
                      <Card key={enrollment.id} className="bg-accent/50">
                        <CardContent className="p-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                              <h4 className="font-semibold text-foreground mb-2">
                                {enrollment.studentFullName}
                              </h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  DOB: {enrollment.dateOfBirth}
                                </p>
                                <p className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {enrollment.studentAddress}
                                </p>
                              </div>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                              <p className="text-sm font-medium text-foreground mb-2">
                                Parent/Guardian: {enrollment.parentGuardianName}
                              </p>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  {enrollment.phoneNumber}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  {enrollment.emailAddress}
                                </p>
                              </div>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">
                              <p>Emergency: {enrollment.emergencyContact}</p>
                              <p className="mt-2">Submitted: {enrollment.submittedAt}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vacancies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Applications
                </CardTitle>
                <CardDescription>
                  View all career/vacancy applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {vacancies.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No job applications yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vacancies.map((vacancy) => (
                      <Card key={vacancy.id} className="bg-accent/50">
                        <CardContent className="p-4">
                          <div className="flex flex-wrap justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">
                                {vacancy.firstName} {vacancy.lastName}
                              </h4>
                              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                {vacancy.email}
                              </p>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">
                              <p>Submitted: {vacancy.submittedAt}</p>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-background rounded-lg">
                            <p className="text-sm text-foreground/80">{vacancy.message}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
