import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Clock, UserCheck, CheckCircle, Heart } from "lucide-react"
import { motion } from "framer-motion"

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string | React.ReactNode
  icon: React.ReactNode
  valueColor?: string
  className?: string
  index: number
}

function StatCard({ title, value, subtitle, icon, valueColor = "text-gray-900", className, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "stat-card-modern p-4 sm:p-6 h-[158px] flex flex-col justify-between group relative",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider leading-tight">{title}</span>
        <motion.div 
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100/50 flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="text-gray-500 group-hover:text-gray-700 smooth-transition">
            {icon}
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col gap-2">
        <motion.span 
          className={cn("text-4xl font-semibold leading-none tracking-tight", valueColor)} 
          style={{ letterSpacing: '-0.03em' }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        >
          {value}
        </motion.span>
        <span className="text-xs font-normal text-gray-600 leading-tight whitespace-nowrap">{subtitle}</span>
      </div>
    </motion.div>
  )
}

export function StatCards() {
  // Claims Status data - exact values from image
  const total = 385
  const data = [
    { label: "Pending", value: 21, color: "#97005d" }, // Purple
    { label: "In review", value: 250, color: "#fe5c43" }, // Orange-red
    { label: "Sent to customer", value: 114, color: "#ffb52e" }, // Yellow-orange
  ]
  
  // Donut chart setup
  const size = 96
  const center = size / 2
  const outerRadius = 42
  const innerRadius = 32
  
  // Helper to convert angle to radians
  const toRad = (deg: number) => (deg * Math.PI) / 180
  
  // Helper to create donut segment path
  const createSegment = (startAngle: number, endAngle: number) => {
    const startRad = toRad(startAngle)
    const endRad = toRad(endAngle)
    
    const x1 = center + outerRadius * Math.cos(startRad)
    const y1 = center + outerRadius * Math.sin(startRad)
    const x2 = center + outerRadius * Math.cos(endRad)
    const y2 = center + outerRadius * Math.sin(endRad)
    
    const x3 = center + innerRadius * Math.cos(endRad)
    const y3 = center + innerRadius * Math.sin(endRad)
    const x4 = center + innerRadius * Math.cos(startRad)
    const y4 = center + innerRadius * Math.sin(startRad)
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`
  }
  
  // Calculate segment angles based on values
  // Purple (21): ~5.45% = ~19.6° - positioned at top-right
  // Orange-Red (250): ~64.94% = ~233.8° - largest segment
  // Yellow-Orange (114): ~29.61% = ~106.6° - bottom-left
  
  // Start from top-right (-45°) and go clockwise
  const purpleStart = -45
  const purpleEnd = purpleStart + (21 / total) * 360
  
  const orangeRedStart = purpleEnd
  const orangeRedEnd = orangeRedStart + (250 / total) * 360
  
  const yellowOrangeStart = orangeRedEnd
  const yellowOrangeEnd = yellowOrangeStart + (114 / total) * 360
  
  const segments = [
    { ...data[0], path: createSegment(purpleStart, purpleEnd) },
    { ...data[1], path: createSegment(orangeRedStart, orangeRedEnd) },
    { ...data[2], path: createSegment(yellowOrangeStart, yellowOrangeEnd) },
  ]
  
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <StatCard
        title="Time Out Date"
        value={18}
        subtitle={<>to be reviewed in <span className="font-medium">7 days</span></>}
        icon={<Clock className="w-4 h-4" />}
        valueColor="text-[#cc2d55]"
        className="flex-1 min-w-0"
        index={0}
      />
      <StatCard
        title="Pending"
        value={4}
        subtitle="By me"
        icon={<UserCheck className="w-4 h-4" />}
        valueColor="text-[#ff9426]"
        className="flex-1 min-w-0"
        index={1}
      />
      <StatCard
        title="Reviewed"
        value={10}
        subtitle="By manager"
        icon={<CheckCircle className="w-4 h-4" />}
        valueColor="text-[#ffb52e]"
        className="flex-1 min-w-0"
        index={2}
      />
      <StatCard
        title="Playlists"
        value={14}
        subtitle="used by you and others"
        icon={<Heart className="w-4 h-4" />}
        className="flex-1 min-w-0"
        index={3}
      />
      <div className="stat-card-modern p-4 sm:p-6 h-[158px] flex flex-col flex-1 min-w-[280px] sm:min-w-[320px]">
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider leading-tight whitespace-nowrap">Claims Status</span>
          <div className="flex-1 min-w-0"></div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-6 px-2.5 text-xs font-medium rounded-lg border-gray-200 bg-white shadow-sm flex-shrink-0"
          >
            More
          </Button>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-center min-h-0">
          {/* Donut Chart */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0">
            <svg 
              width="96" 
              height="96" 
              viewBox="0 0 96 96"
              className="w-full h-full"
            >
              {/* Background circle */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={outerRadius - innerRadius}
              />
              {/* Segments */}
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={segment.path}
                  fill={segment.color}
                />
              ))}
            </svg>
            {/* Center text */}
            <span 
              className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-900 leading-none pointer-events-none"
              style={{ letterSpacing: '-0.02em' }}
            >
              {total}
            </span>
          </div>
          
          {/* Legend */}
          <div className="flex flex-col justify-center gap-2 sm:gap-2.5 flex-1 min-w-0">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between min-w-0 gap-2"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <div 
                    className="h-2 w-4 sm:w-5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-gray-700 leading-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 flex-shrink-0 leading-tight whitespace-nowrap">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
