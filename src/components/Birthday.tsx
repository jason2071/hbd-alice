// App.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cake, Gift, Heart, Clock } from 'lucide-react'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date('2025-03-11T00:00:00')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-4 my-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm" whileHover={{ scale: 1.05 }}>
    <div className="text-4xl font-bold text-purple-200">{value.toString().padStart(2, '0')}</div>
    <div className="text-sm text-purple-100">{label}</div>
  </motion.div>
)

const FloatingIcon = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="text-purple-200 opacity-50"
  >
    {children}
  </motion.div>
)

export default function Birthday() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingIcon key={i}>{i % 3 === 0 ? <Heart size={24} /> : <Gift size={24} />}</FloatingIcon>
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Cake className="mx-auto mb-4 text-purple-200" size={48} />
        <h1 className="text-5xl font-bold text-white mb-2">Happy Birthday Alice!</h1>
        <p className="text-xl text-purple-200 mb-8">March 11, 2025</p>

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="inline-block">
          <Clock className="text-purple-200 mx-auto mb-4" size={32} />
        </motion.div>

        <CountdownTimer />
      </motion.div>
    </div>
  )
}
