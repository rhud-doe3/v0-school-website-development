"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lock, 
  ArrowLeft, 
  Users, 
  MessageSquare, 
  Loader2,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertCircle,
  Star,
  User,
  KeyRound
} from "lucide-react"

// Data interfaces
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

interface ReviewRecord {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  rating: number
  submittedAt: string
}

// Admin credentials
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "2015"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Data
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([])
  const [reviews, setReviews] = useState<ReviewRecord[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    if (isAuthenticated) {
      const storedEnrollments = localStorage.getItem("tbrs_enrollments")
      const storedReviews = localStorage.getItem("tbrs_reviews")
      
      if (storedEnrollments) {
        setEnrollments(JSON.parse(storedEnrollments))
      }
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews))
      }
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      setError("Invalid username or password. Please try again.")
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
    setError("")
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%285%29.png-pmH9CYZqizaCeiWuN4BMm17mRS4KpY.jpeg"
                alt="Thika Blue Roses School Logo"
                width={80}
                height={80}
                className="rounded-lg mx-auto bg-white p-1"
              />
            </div>
            <CardTitle className="text-2xl text-primary">Admin Portal</CardTitle>
            <CardDescription>
              Thika Blue Roses and Junior School
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Enter your credentials to access the admin dashboard
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button 
                type="submit"
                className="w-full" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <Link href="/" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Link>
            </form>
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed%20%285%29.png-pmH9CYZqizaCeiWuN4BMm17mRS4KpY.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg bg-white p-0.5"
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
                  <MessageSquare className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reviews & Messages</p>
                  <p className="text-3xl font-bold text-secondary">{reviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews & Messages</TabsTrigger>
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
                    <p className="text-sm mt-2">Enrollment submissions will appear here.</p>
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

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Reviews & Messages
                </CardTitle>
                <CardDescription>
                  View all reviews and messages from visitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No reviews or messages yet.</p>
                    <p className="text-sm mt-2">Submitted reviews and messages will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="bg-accent/50">
                        <CardContent className="p-4">
                          <div className="flex flex-wrap justify-between gap-4 mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">
                                {review.name}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {review.email}
                                </span>
                                {review.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {review.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {review.submittedAt}
                              </p>
                            </div>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-3 mb-2">
                            <p className="text-sm font-medium text-primary mb-1">
                              Subject: {review.subject}
                            </p>
                          </div>
                          <div className="p-3 bg-background rounded-lg">
                            <p className="text-sm text-foreground/80">{review.message}</p>
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
