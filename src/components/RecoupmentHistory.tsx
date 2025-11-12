import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"

const recoupmentData = [
  { month: "Jan", total: 8000, my: 2000 },
  { month: "Feb", total: 9500, my: 2500 },
  { month: "Mar", total: 11000, my: 3000 },
  { month: "Apr", total: 10500, my: 2800 },
  { month: "May", total: 12000, my: 3200 },
  { month: "Jun", total: 11500, my: 3100 },
  { month: "Jul", total: 13000, my: 3500 },
  { month: "Aug", total: 12500, my: 3400 },
  { month: "Sep", total: 14000, my: 3800 },
  { month: "Oct", total: 13500, my: 3600 },
  { month: "Nov", total: 15000, my: 4000 },
  { month: "Dec", total: 14500, my: 3900 },
]

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        style={{ 
          backgroundColor: 'white', 
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '10px 14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        {payload.map((entry: any, index: number) => {
          const color = entry.dataKey === 'total' ? '#F57C00' : '#EF4444'
          const label = entry.dataKey === 'total' ? 'Total Recouped' : 'My Recoupment'
          const value = entry.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          
          return (
            <div key={index} style={{ fontSize: '12px', fontWeight: 500, marginBottom: index === 0 ? '4px' : '0' }}>
              <span style={{ color: '#000000' }}>{label}: </span>
              <span style={{ color: color }}>${value}</span>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export function RecoupmentHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="platform-card p-4 sm:p-6 h-[260px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-title">Recoupment History</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 px-3 text-xs font-medium rounded-lg border-gray-200 bg-white shadow-sm"
        >
          More
        </Button>
      </div>
      {/* Modern Minimal Legend */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-[#F57C00] rounded-full"></div>
          <span className="text-xs font-medium text-gray-600">Total Recouped</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-[#EF4444] rounded-full"></div>
          <span className="text-xs font-medium text-gray-600">My Recoupment</span>
        </div>
      </div>
      <div className="flex-1 min-h-0 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={recoupmentData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 400 }}
              tickMargin={8}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 400 }}
              tickMargin={8}
              domain={[0, 15000]}
              tickFormatter={(value) => `${value / 1000}k`}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#F57C00" 
              strokeWidth={2.5}
              name="Total Recouped"
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="my" 
              stroke="#EF4444" 
              strokeWidth={2.5}
              name="My Recoupment"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
