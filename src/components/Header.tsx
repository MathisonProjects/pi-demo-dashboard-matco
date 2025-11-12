import { Bell, Search, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 sm:left-16 right-0 z-50 glass-effect border-b border-gray-100/50 flex h-16 items-center justify-between px-4 sm:px-8"
    >
      {/* Left: Payment Intelligence Text Only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center"
      >
        <div className="flex flex-col">
          <span className="text-lg font-medium text-gray-900 leading-tight">Payment</span>
          <span className="text-xs font-medium text-gray-600 leading-tight">Intelligence</span>
        </div>
      </motion.div>
      
      {/* Center: Insurance Selector */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden sm:block absolute left-1/2 -translate-x-1/2"
      >
        <Select defaultValue="humana">
          <SelectTrigger className="w-[200px] h-[50px] bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-900 font-medium shadow-sm rounded-lg">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <SelectValue placeholder="Humana" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="humana">Humana</SelectItem>
            <SelectItem value="bluecross">Blue Cross</SelectItem>
            <SelectItem value="aetna">Aetna</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
      
      {/* Right: Search, Bell, User Profile */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 sm:gap-3"
      >
        {/* Search Icon */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center shadow-sm"
        >
          <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-600" />
        </motion.button>
        
        {/* Bell Icon */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center shadow-sm"
        >
          <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-600" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute top-0.5 right-0.5 h-2.5 w-2.5 bg-red-600 rounded-full border-2 border-white shadow-sm"
          />
        </motion.button>
        
        {/* User Profile - Modern Minimal */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 sm:gap-2.5 cursor-pointer"
        >
          <div className="relative shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs font-medium text-gray-900 leading-tight">John Smith</span>
            <span className="text-[10px] font-normal text-gray-500 leading-tight">john.smith@mail.com</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.header>
  )
}
