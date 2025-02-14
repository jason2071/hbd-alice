// App.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cake, Gift, Heart, Clock } from 'lucide-react'

const Countdown: React.FC = () => {
  // ฟังก์ชันคำนวณเวลาที่เหลือจนถึงวันที่ 11 มีนาคม
  const calculateTimeLeft = () => {
    const now = new Date()
    // กำหนดวันที่ 11 มีนาคมของปีปัจจุบัน
    let eventDate = new Date(now.getFullYear(), 2, 11)
    // ถ้าวันนี้ผ่านแล้ว ให้เปลี่ยนไปปีถัดไป
    if (now > eventDate) {
      eventDate = new Date(now.getFullYear() + 1, 2, 11)
    }
    const difference = eventDate.getTime() - now.getTime()
    let timeLeft = {} as { days: number; hours: number; minutes: number; seconds: number }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })

  // แสดงผลตัวนับถอยหลัง
  return (
    <motion.div
      className="flex justify-center gap-4 my-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {Object.keys(timeLeft).length > 0 ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <TimeUnit key={unit} value={value} label={unit.charAt(0).toUpperCase() + unit.slice(1)} />
        ))
      ) : (
        <span className="text-2xl font-medium">Time's up!</span>
      )}
    </motion.div>
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
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <FloatingIcon key={i}>{i % 3 === 0 ? <Heart size={24} /> : <Gift size={24} />}</FloatingIcon>
        ))}
      </div>

      <div className="absolute right-0 bottom-0">
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

        <Countdown />
      </motion.div>
    </div>
  )
}
