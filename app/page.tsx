"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  Building,
  CheckCircle,
  HardHat,
  Phone,
  Mail,
  MapPin,
  Play,
  Users,
  Target,
  Heart,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import { FadeInSection } from "@/components/fade-in-section"
import { StaggerContainer } from "@/components/stagger-container"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [previewVideo, setPreviewVideo] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)

  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  const heroImages = [
    {
      src: "/images/hero-motto.jpg",
      alt: "You Dream It, We Build It - KBC Construction",
    },
    {
      src: "/images/hero-land-sale.png",
      alt: "Land for Sale - KBC Construction",
    },
    {
      src: "/images/hero-dream-property.png",
      alt: "Find Your Dream Property - KBC Construction",
    },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleVideoHover = (videoId: string) => {
    setPreviewVideo(videoId)

    if (videoId === "video1" && videoRef1.current) {
      videoRef1.current.play()
    } else if (videoId === "video2" && videoRef2.current) {
      videoRef2.current.play()
    }
  }

  const handleVideoLeave = () => {
    setPreviewVideo(null)

    if (videoRef1.current) {
      videoRef1.current.pause()
      videoRef1.current.currentTime = 0
    }

    if (videoRef2.current) {
      videoRef2.current.pause()
      videoRef2.current.currentTime = 0
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    if (videoRef1.current) {
      videoRef1.current.muted = !isMuted
    }

    if (videoRef2.current) {
      videoRef2.current.muted = !isMuted
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="KBC Construction & Properties Logo"
                  width={180}
                  height={100}
                  className="h-12 w-auto transition-all duration-300"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">KBC Construction & Properties</h1>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              {["Services", "Projects", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => smoothScroll(e, item.toLowerCase())}
                  className="text-gray-700 hover:text-orange-600 font-medium relative group transition-colors duration-300"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <Button className="bg-orange-600 hover:bg-orange-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Quote
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-orange-400/10 via-transparent to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Background Images Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                index === currentSlide ? "opacity-60 scale-100" : "opacity-0 scale-105"
              }`}
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover object-center transition-transform duration-[20s] ease-out"
                priority={index === 0}
                style={{
                  objectPosition: "center center",
                  transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center z-10">
          <div className="max-w-4xl">
            <FadeInSection delay={200}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/90 to-orange-500/90 backdrop-blur-sm border border-orange-400/30 mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
                <Award className="w-4 h-4 mr-2 text-white" />
                <span className="text-white font-semibold text-sm tracking-wide">
                  Ghana's Trusted Home Building Partner
                </span>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  You Dream It,
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  We Build It
                </span>
              </h1>
            </FadeInSection>

            <FadeInSection delay={600}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent mr-4"></div>
                <p className="text-xl md:text-2xl text-gray-300 font-light italic">
                  Crafting Dreams Across Ghana
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={800}>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                From luxury homes to commercial projects, we transform visions into reality with 
                <span className="text-orange-400 font-semibold"> unmatched craftsmanship</span> and 
                <span className="text-orange-400 font-semibold"> innovative design</span>.
                Your dream home awaits.
              </p>
            </FadeInSection>

            <FadeInSection delay={1000}>
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Button
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-full shadow-2xl shadow-orange-500/30 transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 group border-0"
                  onClick={(e) => smoothScroll(e as any, "projects")}
                >
                  <Building className="mr-3 w-5 h-5" />
                  Explore Our Projects
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
                <Button
                  size="lg"
                  className="px-8 py-4 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full transform transition-all duration-300 hover:scale-105 hover:border-orange-400/50 hover:shadow-xl group"
                >
                  <Phone className="mr-3 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  Get Free Quote
                  <span className="ml-2 text-orange-400">+233 55 769 0525</span>
                </Button>
              </div>
            </FadeInSection>

            {/* Quick Stats */}
            <FadeInSection delay={1200}>
              <div className="grid grid-cols-3 gap-8 max-w-2xl">
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">Projects Completed</p>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">
                    <AnimatedCounter end={15} suffix="+" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">Years Experience</p>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">
                    <AnimatedCounter end={100} suffix="%" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">Client Satisfaction</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? "bg-orange-500 shadow-lg shadow-orange-500/50 scale-150" 
                    : "bg-white/40 hover:bg-white/60 hover:scale-125"
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs font-medium mb-2 tracking-widest">SCROLL</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/construction-materials.png"
            alt="Construction materials background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={150}>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <AnimatedCounter end={50} suffix="+" />
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <AnimatedCounter end={5} suffix="+" />
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <AnimatedCounter end={15} suffix="+" />
              <div className="text-gray-600">Expert Team</div>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <AnimatedCounter end={99} suffix="%" />
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Residential Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From dream homes to property improvements, we provide comprehensive residential construction solutions
              tailored to your lifestyle and budget across Ghana.
            </p>
          </FadeInSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={200}>
            <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/architectural-model-assembly.png"
                  alt="Custom home building in Ghana"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardHeader>
                <Building className="w-12 h-12 text-orange-600 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">
                  Custom Home Building
                </CardTitle>
                <CardDescription>
                  Design and build your perfect family home with personalized attention to every detail.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/construction-workers.png"
                  alt="Home renovation in Ghana"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardHeader>
                <HardHat className="w-12 h-12 text-orange-600 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">
                  Home Renovations
                </CardTitle>
                <CardDescription>
                  Transform your existing space with kitchen remodels, bathroom upgrades, and whole-home renovations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/architectural-model-creation.png"
                  alt="Property development in Ghana"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardHeader>
                <Award className="w-12 h-12 text-orange-600 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">
                  Property Development
                </CardTitle>
                <CardDescription>
                  Residential lot development and investment properties for growing families and investors.
                </CardDescription>
              </CardHeader>
            </Card>
          </StaggerContainer>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our custom-built homes across Ghana, showcasing our commitment to quality construction and
              beautiful design.
            </p>
          </FadeInSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
            {[
              {
                title: "Modern Minimalist Villa",
                description: "Contemporary 4-bedroom home with integrated garage and smart lighting",
                image: "/images/modern-minimalist-dusk.png",
                location: "East Legon, Accra, Ghana",
              },
              {
                title: "Luxury Contemporary Estate",
                description: "5-bedroom executive home with premium finishes and landscaping",
                image: "/images/contemporary-house-dawn.png",
                location: "Daban, Kumasi, Ghana",
              },
            ].map((project, index) => (
              <Card
                key={project.title}
                className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mb-2">{project.description}</CardDescription>
                  <Badge variant="outline" className="w-fit">
                    {project.location}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </StaggerContainer>

          <FadeInSection delay={600} className="text-center mt-12">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Request Similar Project
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </FadeInSection>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See Our Homes Come to Life</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch our residential projects across Ghana transform from blueprints to beautiful family homes.
            </p>
          </FadeInSection>

          <div className="text-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 mr-2" />
                  <span>Unmute Previews</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  <span>Mute Previews</span>
                </>
              )}
            </Button>
            <p className="text-gray-400 text-sm mt-2">Hover over videos to preview</p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={300}>
            {/* KBC Construction Video */}
            <div
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onMouseEnter={() => handleVideoHover("video1")}
              onMouseLeave={handleVideoLeave}
            >
              <video
                ref={videoRef1}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                poster="/placeholder.svg?height=400&width=600&text=KBC Construction Video"
                controls={previewVideo !== "video1"}
                muted={true}
                loop
                preload="metadata"
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kbc_vid-ARiWtyRmQKnOzxBPiz23gCsqsBzRoF.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {previewVideo !== "video1" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 group-hover:bg-orange-500">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 text-white transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                <h3 className="text-lg font-semibold">KBC Construction Showcase</h3>
                <p className="text-sm text-gray-300">Our latest projects and company overview</p>
              </div>
            </div>

            {/* Logo Video */}
            <div
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onMouseEnter={() => handleVideoHover("video2")}
              onMouseLeave={handleVideoLeave}
            >
              <video
                ref={videoRef2}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                poster="/placeholder.svg?height=400&width=600&text=KBC Logo Video"
                controls={previewVideo !== "video2"}
                muted={true}
                loop
                preload="metadata"
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoVid-wFP34lGadUJG66JrPg15mq6hCBcWQg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {previewVideo !== "video2" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 group-hover:bg-orange-500">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 text-white transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                <h3 className="text-lg font-semibold">KBC Brand Story</h3>
                <p className="text-sm text-gray-300">Our company logo and brand identity</p>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About KBC Construction & Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded with a passion for creating beautiful homes across Ghana, we're a growing Ghanaian construction
              company dedicated to bringing your vision to life.
            </p>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <FadeInSection direction="left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
              <p className="text-lg text-gray-600 mb-6">
                KBC Construction & Properties was founded in Ghana with a simple mission: to build exceptional homes
                that Ghanaian families love to live in. As a startup in the construction industry, we bring fresh
                energy, innovative approaches, and personalized attention to every project.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team combines years of construction experience with a passion for modern design and sustainable
                building practices. We believe that every family in Ghana deserves a home that reflects their unique
                style and meets their specific needs.
              </p>
              <p className="text-lg text-gray-600">
                From our first custom home to our latest projects, we've maintained our commitment to quality
                craftsmanship, transparent communication, and exceptional customer service throughout Ghana - from Accra
                to Kumasi and beyond.
              </p>
            </FadeInSection>

            <FadeInSection direction="right" className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src="/images/construction-team-meeting.png"
                  alt="KBC Construction professional team at construction site"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </FadeInSection>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={200}>
            <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader>
                <Users className="w-12 h-12 text-orange-600 mb-4 mx-auto transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">Our Team</CardTitle>
                <CardDescription>
                  Experienced Ghanaian professionals passionate about creating beautiful, functional homes for families
                  across Ghana.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader>
                <Target className="w-12 h-12 text-orange-600 mb-4 mx-auto transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">
                  Our Mission
                </CardTitle>
                <CardDescription>
                  To build exceptional homes across Ghana that exceed expectations while providing personalized,
                  transparent service.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader>
                <Heart className="w-12 h-12 text-orange-600 mb-4 mx-auto transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">Our Values</CardTitle>
                <CardDescription>
                  Quality craftsmanship, honest communication, and building lasting relationships with our clients
                  throughout Ghana.
                </CardDescription>
              </CardHeader>
            </Card>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection direction="left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose KBC for Your Home in Ghana?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                As a growing Ghanaian construction company, we provide personalized service and attention that larger
                firms can't match. Every project gets our full dedication, whether in Accra, Kumasi, or anywhere in
                Ghana.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Local Expertise",
                    description:
                      "Deep understanding of Ghana's building codes, permits, and regional requirements across all major cities.",
                  },
                  {
                    title: "Quality Materials",
                    description:
                      "We source the best materials available in Ghana without compromising on craftsmanship quality.",
                  },
                  {
                    title: "Nationwide Service",
                    description: "From Accra to Kumasi, Takoradi to Tamale - we bring our expertise to your location.",
                  },
                ].map((item, index) => (
                  <FadeInSection key={item.title} delay={index * 200}>
                    <div className="flex items-start group">
                      <CheckCircle className="w-6 h-6 text-orange-600 mt-1 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </FadeInSection>

            <FadeInSection direction="right" className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src="/images/family-joy-wooden-blocks.png"
                  alt="Happy family building dreams together with wooden blocks"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"></div>
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/office-kumasi.png" alt="KBC office in Kumasi" fill className="object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Your Dream Home in Ghana?</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Contact us today for a free consultation and estimate. Let's discuss your vision and make it reality,
              wherever you are in Ghana.
            </p>
          </FadeInSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12" staggerDelay={200}>
            {[
              { icon: Phone, title: "Call Us", info: "+233 55 769 0525" },
              { icon: Mail, title: "Email Us", info: "info@kbcproperties.com" },
              { icon: MapPin, title: "Head Office", info: "Daban New Site\nKumasi, Ghana" },
            ].map((contact, index) => (
              <div key={contact.title} className="text-center group">
                <contact.icon className="w-8 h-8 text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                <p className="text-orange-100 whitespace-pre-line">{contact.info}</p>
              </div>
            ))}
          </StaggerContainer>

          <FadeInSection delay={600} className="text-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={150}>
            <div>
              <div className="flex items-center mb-4 group">
                <Image
                  src="/images/logo.png"
                  alt="KBC Construction & Properties Logo"
                  width={100}
                  height={50}
                  className="h-10 w-auto mr-3 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-lg font-bold">KBC Construction & Properties</h3>
              </div>
              <p className="text-gray-400">
                Building excellence with integrity, innovation, and unmatched craftsmanship across Ghana.
              </p>
            </div>

            {[
              {
                title: "Services",
                links: ["Custom Home Building", "Home Renovations", "Property Development", "Design Consultation"],
              },
              {
                title: "Company",
                links: ["About Us", "Our Team", "Careers", "Safety"],
              },
              {
                title: "Contact",
                links: ["+233 55 769 0525", "info@kbcproperties.com", "Head Office: Daban New Site", "Kumasi, Ghana"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link) => (
                    <li key={link}>
                      {section.title === "Contact" ? (
                        <span>{link}</span>
                      ) : (
                        <Link
                          href="#"
                          className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                        >
                          {link}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerContainer>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KBC Construction & Properties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
