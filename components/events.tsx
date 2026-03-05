
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const events = [
    {
    id: 1,
    name: "Mechathon",
    image: "images/sponsors/pc-solar-panels-manufacturing-plant-used-study-solar-energy-systems_482257-118107.jpg (1).jpeg",
    description:
      "A time-bound mechanical innovation challenge where ideas turn into reality. Participants design, build, and compete with custom robotic systems.",
    price: "₹249",
    

  },
    {
    id: 2,
    name: "Business Events",
    image: "images/stem-list-EVgsAbL51Rk-unsplash.jpg",
    description:
    "Strategic and startup-focused events where participants pitch ideas and take on real-world corporate challenges.",
    price: "₹100",
    
  },
   {
    id: 3,
    name: "Open Loop Events",
    image: "images/sponsors/premium_vector-1731328754912-02598fef08bc.png",
    description:
      "Creative and engaging team-based challenges testing coordination and presence of mind.",
    price: "Will be updated soon",
     

  },
  {
    id: 4,
    name: "Navadhara Praudyogika",
    image: "images/sponsors/absolutvision-82TpEld0_e4-unsplash.jpg",
    description:
      "Project presentation event showcasing innovative models and prototypes.",
    price: "₹499",
  },
  {
    id: 5,
    name: "3D Printing Hackathon",
    image: "images/sponsors/photo-1563520239648-a24e51d4b570.jpeg",
    description:
      "Rapid innovation challenge transforming ideas into functional 3D printed prototypes.",
    price: "₹799",
     

  },
  {
    id: 6,
    name: "Technical Events",
    image: "images/sponsors/kumpan-electric-SYo5eazBrls-unsplash.jpg",
    description: "Technical competitions and challenges.",
   subEvents: [
      { name: "Technical Paper Presentation", price: "₹150" },
      { name: "Structure Building", price: "₹150" },
      { name: "Solidworks", price: "₹75" },
      { name: "Ansys", price: "₹75" },
    ],
  },
 {
   id: 7,
  name: "Robotic Events",
  image: "images/sponsors/leiada-krozjhen-99F9-FV3cbE-unsplash.jpg",
  description: "Combined Line Follower Bot and RC Racing challenge. Prizes worth upto ₹10K",
  subEvents: [
      { name: "Robo Maze + RC Racing", price: "₹499",date: "12,13 Mar 2026" },
      { name: "Line Follower", price: "₹299" ,date: "12,13 Mar 2026"},
      { name: "RC Racing", price: "₹299",date: "12,13 Mar 2026" },
       { name: "Robo maze", price: "₹299",date: "12,13 Mar 2026" },
          { name: "Robo Sumo", price: "₹299",date: "12,13 Mar 2026" },
           
    ],
},
  {
    id: 8,
    name: "Workshops",
    image: "images/sponsors/kirill-prikhodko-kRp5woiVDaY-unsplash.jpg",
    description:
      "Hands-on workshops in SolidWorks, ANSYS, EVs, IC Engines, 3D Printing and more.",
    price: "Will be updated soon",
  subEvents: [
           { name: "Ansys workshop", price: "₹349",date: "9,10,11 Mar 2026" },
       { name: "3D Printing workshop", price: "₹299" ,date: "7 Mar 2026"},
         { name: "Solid works workshop", price: "₹349" ,date: "9,10,11 Mar 2026"},
      { name: "Refrigeration and Air Conditioning workshop", price: "199" ,date: "12 Mar 2026"},
          { name: "EV workshop", price: "₹199",date: "12 Mar 2026" },
  { name: "IC Engines workshop", price: "₹199",date: "13 Mar 2026" },
      { name: "Welding workshop", price: "₹199",date: "13 Mar 2026" },
       { name: "Robotics workshop", price: "₹199",date: "13 Mar 2026" },
     
    ],
  },
  {
    id: 9,
    name: "Technical Workshops",
    image: "images/sponsors/workshop.jpeg",
    description:
      "Hands-on workshops in SolidWorks, ANSYS, EVs, IC Engines, 3D Printing and more.",
    price: "Will be updated soon",
    guidelines: [
      "Carry your own laptop with required software pre-installed.",
      "Be present 30 minutes before the scheduled workshop slot.",
      "Follow instructor directions and lab safety during practical sessions.",
    ],
    subEvents: [
      { name: "Solidworks workshop", price: "₹349" },
      { name: "Ansys workshop", price: "₹349" },
      { name: "Refrigiration and Airconditioning workshop", price: "199" },
      { name: "Welding workshop", price: "₹199" },
      { name: "EV workshop", price: "₹199" },
      { name: "IC Engines", price: "₹199" },
       { name: "3D Printing", price: "₹299" },
    ],
  },
  {
    id: 10,
    name: "CFD - Computational Fluid Dynamics",
    image: "images/sponsors/technical.jpeg",
    description:
      "Simulation-focused event to analyze fluid flow and thermal performance using CFD tools.",
    price: "₹299",
    guidelines: [
      "Individual or maximum 2 participants per team.",
      "Bring a laptop with ANSYS Fluent/OpenFOAM or an equivalent CFD tool.",
      "Submit mesh details, boundary conditions, and final contour plots.",
      "Judges' decision will be final for evaluation and ranking.",
    ],
  },
]

export function Events() {
  const router = useRouter()
  const [activeEvent, setActiveEvent] = useState<any>(null)

  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "auto"
  }, [activeEvent])

  const handleRegisterClick = () => {
    if (activeEvent) {
      router.push(`/register?eventId=${activeEvent.id}`)
      setActiveEvent(null)
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveEvent(event)}
              className="relative h-64 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <div>
                  <h3 className="text-white text-xl font-bold">{event.name}</h3>
                  <p className="text-gray-200">{event.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Event Details Modal */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEvent(null)}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-2">{activeEvent.name}</h2>
                
                <p className="text-muted-foreground mb-4">
                  {activeEvent.description}
                </p>

                {/* Show price only if NO subEvents */}
                {!activeEvent.subEvents && activeEvent.price && (
                  <p className="font-semibold mb-6">
                    Price: {activeEvent.price}
                  </p>
                )}

                {/* Show sub-events if available */}
                {activeEvent.subEvents && (
                  <div className="mb-6">
                    <p className="font-semibold mb-3">Available Categories:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {activeEvent.subEvents.map((sub: any) => (
                        <li key={sub.name} className="flex justify-between border-b border-border/30 pb-2">
                          <span>{sub.name}</span>
                          <span className="font-semibold text-cyan-600">{sub.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeEvent.guidelines && (
                  <div className="mb-6">
                    <p className="font-semibold mb-3">Guidelines:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      {activeEvent.guidelines.map((guide: string) => (
                        <li key={guide}>{guide}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Multiple Events Notice */}
                <p className="text-sm text-muted-foreground mb-6">
                  You may participate in multiple events. 
                  Please submit separate registrations and payments for each event.
                </p>

                {/* Register Button */}
                <button
                  onClick={handleRegisterClick}
                  className="bg-cyan-600 text-white px-6 py-3 rounded font-semibold w-full hover:bg-cyan-700 transition"
                >
                  REGISTER NOW
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}