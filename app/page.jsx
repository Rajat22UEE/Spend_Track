"use client"
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useEffect } from 'react'

import React from 'react'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import Footer from './_components/Footer'

function page() {
   useEffect(() => {
    AOS.init({ once: true, duration: 1000 })
  }, [])
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  )
}

export default page
