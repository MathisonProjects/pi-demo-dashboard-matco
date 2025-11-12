import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const categories = [
  { name: "Pharmacy", total: "$49,209.99", height: 337 },
  { name: "Physical Therapy", total: "$22,329.54", height: 239 },
  { name: "Surgery Center", total: "$13,029.99", height: 157 },
  { name: "Radiology", total: "$5,239.34", height: 126 },
  { name: "Radiology", total: "$5,239.34", height: 117 },
  { name: "Radiology", total: "$5,239.34", height: 92 },
  { name: "Radiology", total: "$5,239.34", height: 78 },
]

export function TopTreatmentCategories() {
  const maxHeight = 337
  const [animated, setAnimated] = useState(false)
  
  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="platform-card p-4 sm:p-6 flex flex-col"
      style={{ height: 'fit-content', minHeight: '380px' }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-title">Top Treatment Categories</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 px-3 text-xs font-medium rounded-lg border-gray-200 bg-white shadow-sm"
        >
          More
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        {categories.map((category, index) => {
          const widthPercentage = (category.height / maxHeight) * 100
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between px-1">
                <span className={`text-sm ${index === 0 ? 'font-medium text-gray-900' : 'font-normal text-gray-700'} truncate pr-2 leading-tight`}>
                  {category.name}
                </span>
                <span className="text-sm font-medium text-gray-900 flex-shrink-0 leading-tight tabular-nums">
                  {category.total}
                </span>
              </div>
              <div className="relative h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ffb52e] to-[#cc2d55] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: animated ? `${widthPercentage}%` : '0%' }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  style={{ minWidth: "20px" }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
