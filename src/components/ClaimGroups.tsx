import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { User, Table2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Bubble data type
type BubbleData = {
  x: number
  y: number
  size: number
  value: string
  color: string
  label: string
  id: string
  icon?: boolean
}

// Different bubble data sets based on view options
const bubbleDataSets: Record<string, BubbleData[]> = {
  edit: [
    { x: 15, y: 10, size: 16, value: "5k", color: "from-purple-500 to-purple-600", label: "5k", id: "edit-1", icon: false },
    { x: 35, y: 10, size: 20, value: "12k", color: "from-red-500 to-red-600", label: "12k", id: "edit-2", icon: false },
    { x: 55, y: 50, size: 24, value: "47.6k", color: "from-orange-500 to-orange-600", label: "47.6k", id: "edit-3", icon: false },
    { x: 75, y: 15, size: 32, value: "121.6k", color: "from-yellow-500 to-orange-500", label: "121.6k", id: "edit-4", icon: false },
    { x: 25, y: 30, size: 14, value: "6.5k", color: "from-gray-400 to-gray-500", label: "6,5k", icon: true, id: "edit-5" },
    { x: 45, y: 12, size: 12, value: "4.8k", color: "from-red-400 to-red-500", label: "4.8k", id: "edit-6", icon: false },
  ],
  provider: [
    { x: 20, y: 25, size: 18, value: "8.2k", color: "from-blue-500 to-blue-600", label: "8.2k", id: "provider-1", icon: false },
    { x: 40, y: 45, size: 22, value: "15.5k", color: "from-indigo-500 to-indigo-600", label: "15.5k", id: "provider-2", icon: false },
    { x: 60, y: 30, size: 26, value: "28k", color: "from-purple-500 to-purple-600", label: "28k", id: "provider-3", icon: false },
    { x: 80, y: 20, size: 30, value: "65k", color: "from-pink-500 to-pink-600", label: "65k", id: "provider-4", icon: false },
    { x: 30, y: 55, size: 16, value: "9k", color: "from-cyan-400 to-cyan-500", label: "9k", id: "provider-5", icon: false },
    { x: 50, y: 35, size: 20, value: "18k", color: "from-blue-400 to-blue-500", label: "18k", id: "provider-6", icon: false },
  ],
  procedure: [
    { x: 25, y: 15, size: 20, value: "12k", color: "from-green-500 to-green-600", label: "12k", id: "proc-1", icon: false },
    { x: 45, y: 40, size: 24, value: "22k", color: "from-emerald-500 to-emerald-600", label: "22k", id: "proc-2", icon: false },
    { x: 65, y: 25, size: 28, value: "35k", color: "from-teal-500 to-teal-600", label: "35k", id: "proc-3", icon: false },
    { x: 35, y: 60, size: 18, value: "14k", color: "from-lime-500 to-lime-600", label: "14k", id: "proc-4", icon: false },
    { x: 55, y: 50, size: 22, value: "19k", color: "from-green-400 to-green-500", label: "19k", id: "proc-5", icon: false },
    { x: 75, y: 35, size: 26, value: "42k", color: "from-emerald-400 to-emerald-500", label: "42k", id: "proc-6", icon: false },
  ],
}

// Table data
const tableData = [
  { confLevel: "High", editOutput: "Lab Panel Bundling", claimLines: "2,320", confLvlHigh: "649", assignedTo: "Robert Fox +3", unassigned: "84%", total: "$12,349" },
  { confLevel: "High", editOutput: "Duplicate Billing", claimLines: "1,850", confLvlHigh: "520", assignedTo: "Sarah Johnson +2", unassigned: "72%", total: "$9,450" },
  { confLevel: "High", editOutput: "Unbundling", claimLines: "1,620", confLvlHigh: "485", assignedTo: "Mike Chen +1", unassigned: "70%", total: "$8,230" },
  { confLevel: "High", editOutput: "Upcoding", claimLines: "1,450", confLvlHigh: "420", assignedTo: "Emily Davis +4", unassigned: "71%", total: "$7,380" },
  { confLevel: "High", editOutput: "Modifier Misuse", claimLines: "1,320", confLvlHigh: "395", assignedTo: "David Lee +2", unassigned: "70%", total: "$6,720" },
  { confLevel: "High", editOutput: "Medical Necessity", claimLines: "1,180", confLvlHigh: "355", assignedTo: "Lisa Wang +3", unassigned: "70%", total: "$6,000" },
  { confLevel: "High", editOutput: "Prior Authorization", claimLines: "1,050", confLvlHigh: "315", assignedTo: "James Brown +1", unassigned: "70%", total: "$5,340" },
  { confLevel: "High", editOutput: "Coordination of Benefits", claimLines: "980", confLvlHigh: "294", assignedTo: "Anna Martinez +2", unassigned: "70%", total: "$4,980" },
  { confLevel: "High", editOutput: "Timely Filing", claimLines: "890", confLvlHigh: "267", assignedTo: "Tom Wilson +1", unassigned: "70%", total: "$4,520" },
  { confLevel: "High", editOutput: "Place of Service", claimLines: "820", confLvlHigh: "246", assignedTo: "Rachel Green +3", unassigned: "70%", total: "$4,170" },
  { confLevel: "High", editOutput: "Billing Errors", claimLines: "750", confLvlHigh: "225", assignedTo: "Chris Taylor +2", unassigned: "70%", total: "$3,810" },
  { confLevel: "High", editOutput: "Documentation", claimLines: "680", confLvlHigh: "204", assignedTo: "Patricia White +1", unassigned: "70%", total: "$3,460" },
]

export function ClaimGroups() {
  const [showTable, setShowTable] = useState(false)
  const [viewOption, setViewOption] = useState<string>("edit")
  
  // Get bubble data based on view option
  const currentBubbleData = bubbleDataSets[viewOption as keyof typeof bubbleDataSets] || bubbleDataSets.edit
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="platform-card p-4 sm:p-6 flex flex-col relative overflow-visible"
      style={{ minHeight: showTable ? '800px' : '530px', height: showTable ? 'auto' : '530px' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between mb-5 pb-5 border-b border-gray-100 gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1.5 leading-tight">
            Claim groups - Edits Output
          </h3>
          <p className="text-sm sm:text-base font-normal text-gray-600 leading-relaxed">
            Claims are grouped and displayed based on confidence level and amount
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto sm:ml-4 sm:flex-shrink-0">
          {/* Filters Dropdown */}
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] lg:w-[204px] bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-sm">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Filters</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          {/* View Options Dropdown */}
          <Select value={viewOption} onValueChange={setViewOption}>
            <SelectTrigger className="w-full sm:w-[180px] lg:w-[204px] bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-sm">
              <SelectValue placeholder="View Options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="edit">Edit Outputs</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
              <SelectItem value="procedure">Procedure Codes</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Table Toggle Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowTable(!showTable)}
            className={cn(
              "w-full sm:w-10 h-10 p-0 border-gray-200 bg-white shadow-sm rounded-lg",
              showTable && "border-[#3B82F6] bg-blue-50"
            )}
          >
            <Table2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chart Area - Hidden when table is shown */}
      {!showTable && (
        <div className="flex-1 relative min-h-0 overflow-visible">
          {/* Chart area above X-axis - divided into thirds */}
          <div className="absolute inset-0 left-[8%] bottom-[15%] overflow-visible">
            {/* Subtle zebra striping for High section (top third) */}
            <div className="absolute top-0 left-0 right-0 h-[33.333%]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`high-${i}`}
                  className={`absolute left-0 right-0 h-[12.5%] ${i % 2 === 0 ? 'bg-gray-50/30' : 'bg-transparent'}`}
                  style={{ top: `${i * 12.5}%` }}
                />
              ))}
            </div>
            
            {/* Subtle zebra striping for Medium section (middle third) */}
            <div className="absolute top-[33.333%] left-0 right-0 h-[33.333%]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`medium-${i}`}
                  className={`absolute left-0 right-0 h-[12.5%] ${i % 2 === 0 ? 'bg-gray-50/30' : 'bg-transparent'}`}
                  style={{ top: `${i * 12.5}%` }}
                />
              ))}
            </div>
            
            {/* Subtle zebra striping for Low section (bottom third) */}
            <div className="absolute top-[66.666%] left-0 right-0 h-[33.333%]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`low-${i}`}
                  className={`absolute left-0 right-0 h-[12.5%] ${i % 2 === 0 ? 'bg-gray-50/30' : 'bg-transparent'}`}
                  style={{ top: `${i * 12.5}%` }}
                />
              ))}
            </div>
          </div>

          {/* Background Grid - vertical lines */}
          <div className="absolute inset-0 left-[8%] bottom-[15%] opacity-[0.03]">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percent) => (
              <div key={percent} className="absolute bg-gray-900 h-full w-px" style={{ left: `${percent}%` }}></div>
            ))}
          </div>

          {/* Y-axis Labels - Conf. Level at top, High/Medium/Low in thirds */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute left-0 top-0 bottom-[15%] w-[8%] flex flex-col z-10"
          >
            {/* Conf. Level at the very top */}
            <div className="pt-2 pb-1">
              <span className="text-label leading-tight">Conf. Level</span>
            </div>
            
            {/* High - top third (centered in first third) */}
            <div className="absolute" style={{ top: '16.666%' }}>
              <span className="text-sm font-medium text-gray-700 leading-tight">High</span>
            </div>
            
            {/* Medium - middle third (centered in second third) */}
            <div className="absolute" style={{ top: '50%' }}>
              <span className="text-sm font-medium text-gray-700 leading-tight">Medium</span>
            </div>
            
            {/* Low - bottom third (centered in third third) */}
            <div className="absolute" style={{ top: '83.333%' }}>
              <span className="text-sm font-medium text-gray-700 leading-tight">Low</span>
            </div>
          </motion.div>

          {/* X-axis - Full width extending to 6000 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-0 left-[8%] right-0 h-16 flex flex-col justify-end"
          >
            <div className="h-px bg-gray-300 mb-2"></div>
            <p className="text-label mb-1 leading-tight">No. of Claim Lines</p>
            <div className="flex justify-between text-caption">
              {["0", "1k", "2k", "3k", "4k", "5k", "6k"].map((label, i) => (
                <span key={i} className="leading-tight">{label}</span>
              ))}
            </div>
          </motion.div>

          {/* Modern Animated Bubbles - Smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewOption}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 left-[8%] bottom-[15%] overflow-visible"
            >
              {currentBubbleData.map((bubble, index) => {
                const size = bubble.size * 4
                const fontSize = bubble.size <= 14 ? '10px' : bubble.size <= 20 ? '11px' : bubble.size <= 24 ? '12px' : '14px'
                
                return (
                  <motion.div
                    key={bubble.id}
                    layout
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.6
                      },
                      opacity: { duration: 0.3 },
                      scale: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: index * 0.03
                      }
                    }}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    className={cn(
                      "absolute rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium shadow-xl cursor-pointer border-2 border-white/30",
                      bubble.color
                    )}
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      fontSize: fontSize,
                      transform: 'translate(-50%, -50%)',
                    }}
                    title={`${bubble.label} claims`}
                  >
                    {bubble.icon ? (
                      <motion.div
                        key={`icon-${viewOption}-${bubble.id}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: index * 0.05 + 0.2
                        }}
                      >
                        <User className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key={`label-${viewOption}-${bubble.id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.05 + 0.3,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                      >
                        {bubble.label}
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Table View */}
      <AnimatePresence>
        {showTable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Conf. Level</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Output Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Lines</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Conf. Lvl High</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned to</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Unassigned</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-gray-100 hover:bg-gray-50 smooth-transition"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-sm font-medium text-gray-700">{row.confLevel}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">{row.editOutput}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-700">{row.claimLines}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-700">{row.confLvlHigh}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-700">{row.assignedTo}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-700">{row.unassigned}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">{row.total}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
