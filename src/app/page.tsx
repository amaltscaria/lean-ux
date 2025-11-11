'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import TiltCard from '../components/TiltCard'

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
    title: "User Personas - Elderly Citizen",
    content: "Joseph Mathew is a 64-year-old farmer from Wayanad in Kerala. He owns a couple of cows and delivers milk daily at the local milk society. His frustrations include difficulty finding trustworthy local support, loneliness from children and grandchildren living overseas, and lack of trusted companions. He struggles with technology but is eager to connect with reliable helpers who understand his cultural context and language preferences.",
    image: "image22-73.jpeg",
    phase: "MAKE",
    sectionType: "text-right"
  },
  {
    id: 25,
    title: "User Personas - Overseas Daughter",
    content: "Anita Mathew is a 31-year-old IT professional from Manchester, UK. She relocated from Kerala after her husband decided to relocate overseas. As an overseas daughter, she constantly worries about her elderly parents back home and struggles to find reliable, verified care support from abroad while managing her busy professional life. She needs peace of mind through real-time updates and trusted companion services for her parents.",
    image: "image23-75.jpeg",
    phase: "MAKE",
    sectionType: "text-left"
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
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<'THINK' | 'MAKE' | 'CHECK'>('THINK')
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Parallax scrolling
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 1000], [0, 200])
  const orb2Y = useTransform(scrollY, [0, 1000], [0, -150])

  // Mockup carousel state
  const [currentMockupIndex, setCurrentMockupIndex] = useState(0)
  const mockups = [
    { id: 1, image: 'one.png', title: 'Welcome Screen', subtitle: 'Your Trusted Companion Platform' },
    { id: 2, image: 'two.png', title: 'Connect with Care', subtitle: 'Find Verified Companions' },
    { id: 3, image: 'three.png', title: 'Real-time Updates', subtitle: 'Stay Connected Always' },
    { id: 4, image: 'four.png', title: 'Emergency Support', subtitle: 'Help When You Need It' },
    { id: 5, image: 'five.png', title: 'Peace of Mind', subtitle: 'Monitor Care Remotely' },
    { id: 6, image: 'six.png', title: 'Family Dashboard', subtitle: 'Complete Care Overview' },
  ]

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mockup carousel auto-advance
  useEffect(() => {
    if (mockups.length > 1) {
      const interval = setInterval(() => {
        setCurrentMockupIndex((prevIndex) =>
          prevIndex === mockups.length - 1 ? 0 : prevIndex + 1
        )
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [mockups.length])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
      case 'text-left':
        return (
          <section
            key={section.id}
            ref={el => { sectionsRef.current[index] = el }}
            data-section-id={section.id}
            className="py-20 bg-black relative overflow-hidden"
          >
            {/* Gradient orbs */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text content */}
                <ScrollAnimation delay={0.1}>
                <TiltCard className="space-y-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-white/10">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    section.phase === 'THINK'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' :
                    section.phase === 'MAKE'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' :
                      'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {section.phase} PHASE
                  </span>

                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {section.title}
                  </h2>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </TiltCard>
                </ScrollAnimation>

                {/* Image */}
                <ScrollAnimation delay={0.2}>
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={`/images/${section.image}`}
                      alt={section.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                </ScrollAnimation>
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
            className="py-20 bg-black relative overflow-hidden"
          >
            {/* Gradient orbs */}
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <ScrollAnimation delay={0.1}>
                <div className="relative order-2 md:order-1">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={`/images/${section.image}`}
                      alt={section.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                </ScrollAnimation>

                {/* Text content */}
                <ScrollAnimation delay={0.2}>
                <TiltCard className="space-y-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-white/10 order-1 md:order-2">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    section.phase === 'THINK'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' :
                    section.phase === 'MAKE'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' :
                      'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {section.phase} PHASE
                  </span>

                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {section.title}
                  </h2>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </TiltCard>
                </ScrollAnimation>
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
            className="py-20 bg-black"
          >
            <div className="max-w-7xl mx-auto px-6">
              <ScrollAnimation delay={0.1}>
              <TiltCard className="text-center mb-12 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-white/10">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                  section.phase === 'THINK'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' :
                  section.phase === 'MAKE'
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' :
                    'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}>
                  {section.phase} PHASE
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  {section.content}
                </p>
              </TiltCard>
              </ScrollAnimation>
              {/* Only show image if it's not the first bad image */}
              {section.id !== 2 && (
                <ScrollAnimation delay={0.2}>
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={`/images/${section.image}`}
                    alt={section.title}
                    width={1800}
                    height={1200}
                    className="w-full h-auto"
                  />
                </div>
                </ScrollAnimation>
              )}
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient orbs with parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: orb1Y }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-yellow-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Back to Home */}
            <a href="https://aruntscaria.com" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:via-amber-500/20 hover:to-yellow-500/20 backdrop-blur-sm border border-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="hidden md:inline text-sm text-gray-300 group-hover:text-orange-400 transition-colors duration-300 font-medium">Back to Home</span>
            </a>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="text-xl font-bold text-white">
                CompanionX
              </div>
            </div>

            {/* Phase indicator */}
            <div className="hidden md:flex items-center space-x-4 bg-zinc-900/50 rounded-full px-6 py-2 border border-white/10">
              {(['THINK', 'MAKE', 'CHECK'] as const).map((phase) => (
                <button
                  key={phase}
                  onClick={() => {
                    const firstSectionOfPhase = storySections.find(s => s.phase === phase)
                    if (firstSectionOfPhase) {
                      const element = document.querySelector(`[data-section-id="${firstSectionOfPhase.id}"]`)
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all cursor-pointer hover:bg-orange-500/10 ${
                    currentPhase === phase
                      ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20'
                      : ''
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    currentPhase === phase
                      ? phase === 'THINK' ? 'bg-orange-500' :
                        phase === 'MAKE' ? 'bg-green-500' :
                        'bg-blue-500'
                      : 'bg-gray-600'
                  }`} />
                  <span className={`text-sm font-semibold ${
                    currentPhase === phase ? 'text-white' : 'text-gray-500'
                  }`}>
                    {phase}
                  </span>
                </button>
              ))}
            </div>

            {/* Empty spacer to balance layout */}
            <div className="w-24 hidden md:block"></div>
          </div>
        </div>
      </nav>

      {/* Mockup Carousel Hero Section */}
      <section className="pt-16 md:pt-20 py-8 md:py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              {mockups[currentMockupIndex]?.title || "CompanionX"}
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              {mockups[currentMockupIndex]?.subtitle || "A Human-Centered Platform for Elderly Care"}
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Carousel Container */}
            <div className="flex items-center justify-center min-h-[300px] md:min-h-[500px] overflow-visible">
              <div className="relative w-full flex items-center justify-center overflow-visible">
                {/* Gradient fade overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none"></div>

                {mockups.map((mockup, index) => {
                  const isActive = index === currentMockupIndex
                  const isPrev = index === (currentMockupIndex - 1 + mockups.length) % mockups.length
                  const isNext = index === (currentMockupIndex + 1) % mockups.length
                  const isVisible = isActive || isPrev || isNext

                  if (!isVisible) return null

                  let transform = 'translateX(0px) scale(1)'
                  let opacity = 1
                  let zIndex = 5

                  if (isPrev) {
                    transform = 'translateX(300px) translateY(50px) scale(0.75) rotate(15deg)'
                    opacity = 0.7
                    zIndex = 2
                  } else if (isNext) {
                    transform = 'translateX(-300px) translateY(50px) scale(0.75) rotate(-15deg)'
                    opacity = 0.7
                    zIndex = 2
                  } else if (isActive) {
                    transform = 'translateX(0px) translateY(-50px) scale(1)'
                    opacity = 1
                    zIndex = 5
                  }

                  return (
                    <div
                      key={mockup.id}
                      className="absolute transition-all duration-1000 ease-out"
                      style={{
                        transform: typeof window !== 'undefined' && window.innerWidth <= 768 ?
                          (isPrev ? 'translateX(150px) translateY(25px) scale(0.75) rotate(10deg)' :
                           isNext ? 'translateX(-150px) translateY(25px) scale(0.75) rotate(-10deg)' :
                           'translateX(0px) translateY(-25px) scale(1)') : transform,
                        opacity,
                        zIndex,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <Image
                        src={`/images/mockups/${mockup.image}`}
                        alt={mockup.title}
                        width={256}
                        height={450}
                        className="w-40 md:w-64 h-auto rounded-2xl max-h-[250px] md:max-h-[450px] object-contain"
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {mockups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMockupIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMockupIndex
                      ? 'bg-orange-500 scale-125'
                      : 'bg-orange-200 hover:bg-orange-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <div id="story">
        {storySections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Footer */}
      <footer id="contact" className="relative bg-gradient-to-br from-zinc-900 to-black text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Let&apos;s Create Something Amazing
          </h3>
          <p className="text-xl mb-8 text-gray-300">
            Available for UX design opportunities in the UK and remote projects worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:arun.tscaria@gmail.com"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              Get in Touch
            </a>
            <a
              href="https://aruntscaria.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-orange-500 text-orange-400 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all"
            >
              View Portfolio
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              © 2025 CompanionX. Crafted with passion for exceptional user experiences.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}
