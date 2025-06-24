'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Hero() {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#090040] text-white px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div
            className="w-full md:w-1/2 text-center md:text-left"
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-extrabold mb-4 leading-snug text-[#FFCC00]">
              Take Control of Your <span className="text-[#B13BFF]">Finances</span>
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Track budgets, manage expenses, and stay on top of your spending.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-[#FFCC00] text-[#090040] px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow"
            >
              Get Started
            </Link>
          </div>
          <div
            className="w-full md:w-1/2 flex justify-center"
            data-aos="zoom-in"
          >
            <Image
              src="/expense-tracker.png"
              alt="Finance Illustration"
              width={500}
              height={500}
              priority
              loading="eager"
              className="max-w-full h-auto hover:scale-105 transition-transform duration-300"

            />
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section
        className="bg-[#471396] py-16 px-6 flex justify-center"
        data-aos="fade-up"
      >
        <Image
          src="/dashboard.png"
          alt="Dashboard"
          width={800}
          height={500}
          priority
          loading="eager"
          className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
        />
      </section>

      {/* Budget Section */}
      <section className="bg-[#090040] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <Image
              src="/budget.png"
              alt="Create Budget"
              width={500}
              height={400}
              priority
              loading="eager"
              className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <h3 className="text-3xl font-bold mb-4 text-[#FFCC00]">Create and Manage Budgets</h3>
            <p className="text-lg text-gray-200">
              Easily create budget categories, assign spending limits, and organize your finances.
              Adding a budget helps you monitor where your money goes and prevents overspending.
            </p>
          </div>
        </div>
      </section>

      {/* Expense Section */}
      <section className="bg-[#471396] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <h3 className="text-3xl font-bold mb-4 text-[#FFCC00]">Add Expenses Under Budgets</h3>
            <p className="text-lg text-gray-100">
              Assign expenses to specific budget categories, track spending accurately, and stay within your set limits.
              This feature helps you make informed financial decisions and analyze your spending patterns.
            </p>
          </div>
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <Image
              src="/expense.png"
              alt="Add Expense"
              width={500}
              height={400}
              priority
              loading="eager"
              className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </>
  )
}
