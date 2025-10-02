'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface StorySection {
  id: number
  title: string
  content: string
  image: string
  phase: 'THINK' | 'MAKE' | 'CHECK'
  sectionType: 'hero' | 'text-left' | 'text-right' | 'full-width'
}

const storySections: StorySection[] = [
  {
    id: 1,
    title: "CompanionX",
    content: "A Human-Centered Platform Connecting Overseas Families with Trusted Companions for Kerala's Elderly using the Lean UX Method",
    image: "image1-31.jpeg",
    phase: "THINK",
    sectionType: "hero"
  },
  {
    id: 2,
    title: "Lean UX Method Overview",
    content: "CompanionX: A Human-Centered Platform Connecting Overseas Families with Trusted Companions for Kerala's Elderly using the Lean UX Method with Think-Make-Check phases. This systematic approach ensured user-centered design decisions backed by research and validation at every step.",
    image: "image1-31.jpeg",
    phase: "THINK",
    sectionType: "full-width"
  },
  {
    id: 3,
    title: "The Challenge",
    content: "Kerala has the greatest number of residents above the age of 60. With mass migration to overseas countries for work, elderly individuals are left alone, struggling with loneliness and lack of trusted support. The project aims to create a CompanionX application for those over the age of 60 in Kerala, providing emotional and physical care through verified companions.",
    image: "image2-33.jpeg",
    phase: "THINK",
    sectionType: "text-left"
  },
  {
    id: 4,
    title: "Understanding the Problem",
    content: "The need for developing CompanionX stems from a desire to solve the unique challenges faced by elderly individuals, especially those who live alone due to migration and demographic shifts. CompanionX utilizes technology to address challenges faced by older citizens, particularly those in Kerala.",
    image: "image3-35.jpeg",
    phase: "THINK",
    sectionType: "text-right"
  },
  {
    id: 5,
    title: "Research Foundation",
    content: "Desk research explored regional demographics, caregiver-to-elder ratios, emotional wellbeing studies, and technology adoption rates. This insight supported persona development, accessibility strategies, and the business case for building a platform like CompanionX.",
    image: "image5-39.jpeg",
    phase: "THINK",
    sectionType: "full-width"
  },
  {
    id: 6,
    title: "Literature & Technology Research",
    content: "Research covered topics like geriatric mental health, mobile health services, loneliness studies, and technology adoption among elderly. Emerging technologies such as AI-powered companion matchmaking, geolocation, and health record tracking were explored to assess feasibility, risks, and adoption barriers.",
    image: "image6-41.jpeg",
    phase: "THINK",
    sectionType: "text-left"
  },
  {
    id: 7,
    title: "Competitive Landscape",
    content: "Competitor review covered Indian and global solutions like Papa Pals, Seniority, and UrbanClap. Gaps identified: limited emotional support focus, no verified assistant model, and low trust-building mechanisms. Key insights show most apps focus on task management with minimal emotional care.",
    image: "image8-45.jpeg",
    phase: "THINK",
    sectionType: "text-right"
  },
  {
    id: 8,
    title: "Primary Research",
    content: "Research was designed around semi-structured interviews targeting overseas children and elderly individuals. Participants included 5 real users—two NRIs, one assistant, and two elderly locals. Sessions captured context, digital behaviour, emotional triggers, and trust perceptions around caregiving.",
    image: "image10-49.jpeg",
    phase: "THINK",
    sectionType: "full-width"
  },
  {
    id: 9,
    title: "Insights Synthesis",
    content: "Key quotes from all interviews were coded into themes such as loneliness, verification concerns, recurring caregiver absence, and confusion with multi-app usage. Insights were synthesised into Six themes: Trust and safety, Cultural & Communication Fit, Emotional & Companionship needs, Family peace of mind (Remote care), Functional and Daily needs, Assistant's Voice.",
    image: "image11-51.jpeg",
    phase: "THINK",
    sectionType: "text-left"
  },
  {
    id: 10,
    title: "Strategic Framework",
    content: "Based on early research, assumptions were made around user fears, motivations, and expected features. From a value proposition angle, assumptions included willingness to pay for verified service, interest in real-time tracking, and trust in a Kerala-branded platform. The canvas provided a consolidated view of business vision, user pain points, high-value tasks, and solution hypotheses.",
    image: "image15-59.jpeg",
    phase: "THINK",
    sectionType: "text-left"
  },
  {
    id: 11,
    title: "User Journey Mapping",
    content: "This diagram illustrates the core tasks, thoughts, and emotions experienced by users across the caregiving journey. Emotional resonance, trust gaps, and task frequency were mapped to identify friction points and opportunity zones for design interventions.",
    image: "image18-65.jpeg",
    phase: "MAKE",
    sectionType: "full-width"
  },
  {
    id: 12,
    title: "Feature Prioritization",
    content: "Participatory design input and internal synthesis were used to categorise feature ideas into: Must-haves (core MVP features like verified companion matching and emergency alerts), Nice-to-haves (social features, AI mood detection), Low-priority items (smartwatch integration, multilingual chatbot). Feature ideas were assessed for development feasibility vs user value impact.",
    image: "image19-67.jpeg",
    phase: "MAKE",
    sectionType: "text-right"
  },
  {
    id: 13,
    title: "Ideation & Concepts",
    content: "Sketch-based ideation was used to rapidly explore layout options for: Home dashboard, Companion profiles, Mood tracking, Rewards/loyalty for usage. This process helped generate multiple solutions before converging on the most promising concepts.",
    image: "image21-71.jpeg",
    phase: "MAKE",
    sectionType: "text-left"
  },
  {
    id: 14,
    title: "User Personas",
    content: "Joseph Mathew is a 64-year-old farmer from Wayanad in Kerala. He owns a couple of cows and delivers milk daily at the local milk society. His frustrations include difficulty finding trustworthy local support, loneliness from children and grandchildren living overseas, and lack of trusted companions. Anita Mathew is a 31-year-old IT professional from Manchester, UK. She relocated from Kerala after her husband decided to relocate overseas.",
    image: "image22-73.jpeg",
    phase: "MAKE",
    sectionType: "text-right"
  },
  {
    id: 15,
    title: "Journey Mapping",
    content: "This journey map highlights key user actions, pain points, emotional states, and service touchpoints for overseas caregivers from app discovery to post-companion feedback. The journey directly informed the onboarding flow, reminder logic, and language tone of the UI.",
    image: "image24-77.jpeg",
    phase: "MAKE",
    sectionType: "full-width"
  },
  {
    id: 16,
    title: "Hypothesis Development",
    content: "Four Lean UX hypotheses were developed based on risk-prioritised assumptions: 1. Users will feel more confident with real-time check-ins. 2. Verified companion profiles will increase first-time bookings. 3. Users prefer 1-click SOS over filling emergency forms. 4. Families want language and cultural filters when selecting a caregiver.",
    image: "image25-79.jpeg",
    phase: "MAKE",
    sectionType: "text-left"
  },
  {
    id: 17,
    title: "Product Strategy",
    content: "This canvas summarises the project's vision, early adopters, value proposition, unique features, and key metrics. It ensured design alignment with business goals while staying user-centred.",
    image: "image26-81.jpeg",
    phase: "MAKE",
    sectionType: "text-right"
  },
  {
    id: 18,
    title: "Design System",
    content: "The visual design direction was built around: Calm, trustworthy colours (blue, lavender), Rounded typography for friendliness, Iconography prioritising clarity over stylistic flair. The system ensured UI consistency across screens while remaining accessible for elderly users.",
    image: "image27-83.jpeg",
    phase: "MAKE",
    sectionType: "full-width"
  },
  {
    id: 19,
    title: "Mid-Fidelity Wireframes",
    content: "Wireframes showing the basic structure and layout of key screens including onboarding, dashboard, companion selection, and emergency features.",
    image: "image28-85.jpeg",
    phase: "MAKE",
    sectionType: "full-width"
  },
  {
    id: 20,
    title: "High Fidelity Wireframes - Part 1",
    content: "Detailed wireframes with final design elements, showing the complete user interface for onboarding screens and home navigation.",
    image: "image29-87.jpeg",
    phase: "MAKE",
    sectionType: "text-left"
  },
  {
    id: 21,
    title: "High Fidelity Wireframes - Part 2",
    content: "Additional high-fidelity wireframes showing companion booking, settings, and other core user flows with final design elements.",
    image: "image30-89.jpeg",
    phase: "MAKE",
    sectionType: "text-right"
  },
  {
    id: 22,
    title: "Usability Testing",
    content: "A round of formative usability testing was conducted with 5 participants across two user groups: Overseas caregivers (Anita-type persona) and Elderly or semi-digital local users (Bindu-type persona). Test sessions used a 5-act interview format with scenarios: Booking a companion, Triggering an emergency alert, Navigating the home screen, Completing onboarding.",
    image: "image31-91.jpeg",
    phase: "CHECK",
    sectionType: "text-left"
  },
  {
    id: 23,
    title: "Hypothesis Validation",
    content: "Testing and validation of the four key hypotheses developed earlier in the design process. Each hypothesis was measured against specific success criteria through user testing, analytics, and feedback collection to determine the effectiveness of our design decisions.",
    image: "image33-95.jpeg",
    phase: "CHECK",
    sectionType: "text-right"
  },
  {
    id: 24,
    title: "Hypothesis Validation – Success Score",
    content: "Final validation results showed high success rates: 100% for emotional wellbeing and GPS location tracking, 85% for companion safety/trust and Malayalam language support. What worked: MVP addressed emotional, task-based, and safety needs. What needs scaling: Companion vetting system, offline service extensions, family dashboard with multi-user access.",
    image: "image32-93.jpeg",
    phase: "CHECK",
    sectionType: "full-width"
  }
]

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<'THINK' | 'MAKE' | 'CHECK'>('THINK')
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add intersection observer for phase tracking
  useEffect(() => {
    const observers = sectionsRef.current.map((section, index) => {
      if (!section) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const phase = storySections[index]?.phase
            if (phase) setCurrentPhase(phase)
          }
        },
        { threshold: 0.5 }
      )

      observer.observe(section)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [isLoaded])

  const renderSection = (section: StorySection, index: number) => {
    switch (section.sectionType) {
      case 'hero':
        return (
          <section
            key={section.id}
            ref={el => { sectionsRef.current[index] = el }}
            data-section-id={section.id}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Animated background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-blue-900/50 z-10" />

            {/* Parallax background image */}
            <div
              className="absolute inset-0 scale-110"
              style={{
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            >
              <Image
                src={`/images/${section.image}`}
                alt={section.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating particles effect - static positions for SSR compatibility */}
            <div className="absolute inset-0 z-15">
              {[
                { left: 15, top: 25, delay: 0.5, duration: 3 },
                { left: 85, top: 15, delay: 1.2, duration: 4 },
                { left: 45, top: 65, delay: 0.8, duration: 2.5 },
                { left: 75, top: 80, delay: 1.8, duration: 3.5 },
                { left: 25, top: 45, delay: 0.3, duration: 4.2 },
                { left: 65, top: 20, delay: 1.5, duration: 2.8 },
                { left: 35, top: 85, delay: 0.7, duration: 3.8 },
                { left: 90, top: 55, delay: 1.1, duration: 2.2 },
                { left: 55, top: 35, delay: 1.9, duration: 4.5 },
                { left: 20, top: 70, delay: 0.4, duration: 3.2 },
                { left: 80, top: 40, delay: 1.6, duration: 2.9 },
                { left: 40, top: 90, delay: 0.9, duration: 3.7 },
                { left: 70, top: 10, delay: 1.3, duration: 4.1 },
                { left: 10, top: 60, delay: 0.6, duration: 2.7 },
                { left: 95, top: 30, delay: 1.7, duration: 3.4 },
                { left: 50, top: 75, delay: 1.0, duration: 2.6 },
                { left: 30, top: 50, delay: 0.2, duration: 4.3 },
                { left: 85, top: 85, delay: 1.4, duration: 3.1 },
                { left: 60, top: 5, delay: 0.1, duration: 2.4 },
                { left: 5, top: 95, delay: 1.8, duration: 3.9 }
              ].map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.duration}s`,
                  }}
                />
              ))}
            </div>

            {/* Enhanced hero content */}
            <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
              <div className={`transition-all duration-1500 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="mb-6">
                  <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-lg font-medium border border-white/20">
                    UX Case Study
                  </span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                  {section.title}
                </h1>
                <p className="text-2xl md:text-3xl leading-relaxed max-w-5xl mx-auto mb-12 text-gray-100 font-light">
                  {section.content}
                </p>

                {/* Animated CTA */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => {
                      const firstContentSection = document.querySelector('[data-section-id="2"]')
                      firstContentSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
                  >
                    <span className="flex items-center gap-3">
                      Explore the Journey
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced scroll indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex flex-col items-center gap-3 text-white/80">
                <span className="text-sm font-medium">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
                  <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          </section>
        )

      case 'text-left':
        return (
          <section
            key={section.id}
            ref={el => { sectionsRef.current[index] = el }}
            data-section-id={section.id}
            className="py-24 relative overflow-hidden"
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent" />
            </div>

            <div className="max-w-[90vw] mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-5 gap-16 items-center">
                {/* Enhanced text content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="group">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                      section.phase === 'THINK'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' :
                      section.phase === 'MAKE'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25' :
                        'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                    }`}>
                      <div className="w-2 h-2 bg-white/80 rounded-full mr-2 animate-pulse" />
                      {section.phase} PHASE
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {section.title}
                  </h2>

                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-light">
                    {section.content}
                  </p>

                  {/* Decorative line */}
                  <div className="flex items-center space-x-4">
                    <div className={`h-1 w-16 rounded-full ${
                      section.phase === 'THINK' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      section.phase === 'MAKE' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`} />
                  </div>
                </div>

                {/* Enhanced image with hover effects */}
                <div className="lg:col-span-3 relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                    {/* Glow effect */}
                    <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-xl ${
                      section.phase === 'THINK' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      section.phase === 'MAKE' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      'bg-gradient-to-r from-orange-400 to-orange-600'
                    }`} />

                    <div className="relative bg-white rounded-2xl overflow-hidden">
                      <Image
                        src={`/images/${section.image}`}
                        alt={section.title}
                        width={1200}
                        height={900}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200/50">
                      <span className="text-sm font-semibold text-gray-700">#{section.id.toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )

      case 'text-right':
        return (
          <section
            key={section.id}
            ref={el => { sectionsRef.current[index] = el }}
            data-section-id={section.id}
            className="py-20 bg-white"
          >
            <div className="max-w-[90vw] mx-auto px-4">
              <div className="grid lg:grid-cols-5 gap-12 items-start">
                <div className="lg:col-span-3 relative order-2 lg:order-1">
                  <Image
                    src={`/images/${section.image}`}
                    alt={section.title}
                    width={1200}
                    height={900}
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                </div>
                <div className="lg:col-span-2 order-1 lg:order-2">
                  <div className="mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      section.phase === 'THINK' ? 'bg-blue-500 text-white' :
                      section.phase === 'MAKE' ? 'bg-green-500 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {section.phase} PHASE
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )

      case 'full-width':
        return (
          <section
            key={section.id}
            ref={el => { sectionsRef.current[index] = el }}
            data-section-id={section.id}
            className="py-12"
          >
            <div className="max-w-[95vw] mx-auto px-2">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    section.phase === 'THINK' ? 'bg-blue-500 text-white' :
                    section.phase === 'MAKE' ? 'bg-green-500 text-white' :
                    'bg-orange-500 text-white'
                  }`}>
                    {section.phase} PHASE
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-4xl mx-auto">
                  {section.content}
                </p>
              </div>
              <div className="relative">
                <Image
                  src={`/images/${section.image}`}
                  alt={section.title}
                  width={1800}
                  height={1200}
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </section>
        )


      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Enhanced Navigation with Phase Indicator */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Lean UX
            </div>

            {/* Phase Progress Indicator */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {(['THINK', 'MAKE', 'CHECK'] as const).map((phase, idx) => (
                  <div key={phase} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPhase === phase
                        ? phase === 'THINK' ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' :
                          phase === 'MAKE' ? 'bg-green-500 scale-125 shadow-lg shadow-green-500/50' :
                          'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                        : 'bg-gray-300'
                    }`} />
                    <span className={`text-sm font-medium transition-colors ${
                      currentPhase === phase ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {phase}
                    </span>
                    {idx < 2 && <div className="w-8 h-px bg-gray-300" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#story" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Work</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Story Sections */}
      <div id="story">
        {storySections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-8">Let&apos;s Create Something Amazing</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Available for UX design opportunities in the UK and remote projects worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:arun@example.com" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300">
              Get in Touch
            </a>
            <a href="#" className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Download CV
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}