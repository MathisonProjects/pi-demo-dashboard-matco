import { 
  Zap,
  Home, 
  FileText, 
  Search,
  Receipt,
  TrendingUp,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { figmaImages } from "@/lib/figma-assets"
import { motion } from "framer-motion"

const navItems = [
  { icon: Zap, label: "Dashboard", path: "/" },
  { icon: Home, label: "Home", path: "/home" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Receipt, label: "Receipts", path: "/receipts" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
]

export function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0) // Lightning bolt is active
  
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 top-0 bottom-0 w-16 glass-effect border-r border-gray-100/50 flex flex-col z-40 hidden sm:flex"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="h-16 flex items-center justify-center border-b border-gray-100/50 shrink-0"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img alt="Logo" className="h-full w-full object-contain" src={figmaImages.logo} />
          </div>
        </motion.div>
        
        {/* Navigation */}
        <div className="flex-1 flex flex-col items-center py-4 gap-1 overflow-y-auto min-h-0">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeIndex === index
            
            return (
              <TooltipPrimitive.Root key={index}>
                <TooltipPrimitive.Trigger asChild>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center rounded-lg relative",
                      isActive
                        ? "bg-[#FFF7ED] border border-[#FED7AA]" 
                        : "bg-transparent"
                    )}
                  >
                    {/* Gradient background behind icon for active items */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(245, 124, 0, 0.15) 0%, rgba(255, 247, 237, 0) 70%)',
                        }}
                      />
                    )}
                    <Icon 
                      className={cn(
                        "w-5 h-5 smooth-transition relative z-10",
                        isActive 
                          ? "text-[#F57C00]" 
                          : "text-gray-500"
                      )} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.button>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                  <TooltipPrimitive.Content
                    className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg z-50 data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0"
                    side="right"
                    sideOffset={8}
                  >
                    {item.label}
                    <TooltipPrimitive.Arrow className="fill-gray-900" />
                  </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
              </TooltipPrimitive.Root>
            )
          })}
        </div>
      </motion.aside>
    </TooltipPrimitive.Provider>
  )
}
