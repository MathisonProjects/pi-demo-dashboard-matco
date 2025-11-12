import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { StatCards } from "./components/StatCards"
import { RecoupmentHistory } from "./components/RecoupmentHistory"
import { TopTreatmentCategories } from "./components/TopTreatmentCategories"
import { ClaimGroups } from "./components/ClaimGroups"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"

function App() {
  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Header />
      <Sidebar />
      
      <main className="ml-0 sm:ml-16 pt-16 pb-8 px-4 sm:px-8">
        {/* Welcome Section with Date Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 mt-8 sm:mt-10 gap-4"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-1 tracking-tight" style={{ letterSpacing: '-0.025em' }}>Hello John,</h1>
            <p className="text-xl sm:text-2xl font-normal text-gray-600">welcome back.</p>
          </div>
          {/* Date Selector - Right aligned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-start sm:justify-end w-full sm:w-auto"
          >
            <Select defaultValue="mar-sep-2025">
              <SelectTrigger className="w-full sm:w-[240px] h-[48px] bg-white border border-gray-200 text-gray-900 font-medium shadow-sm rounded-lg">
                <div className="flex items-center gap-2.5 w-full">
                  <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <SelectValue placeholder="Mar 2025 - Sep 2025" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan-mar-2025">Jan 2025 - Mar 2025</SelectItem>
                <SelectItem value="apr-jun-2025">Apr 2025 - Jun 2025</SelectItem>
                <SelectItem value="jul-sep-2025">Jul 2025 - Sep 2025</SelectItem>
                <SelectItem value="mar-sep-2025">Mar 2025 - Sep 2025</SelectItem>
                <SelectItem value="oct-dec-2025">Oct 2025 - Dec 2025</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>

        {/* Main Content Grid - Mobile First Responsive */}
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] gap-6">
          {/* Left Column - Stat Cards + Claim Groups */}
          <div className="flex flex-col gap-6 order-1">
            {/* Stat Cards Row */}
            <div>
              <StatCards />
            </div>
            {/* Claim Groups Chart */}
            <div>
              <ClaimGroups />
            </div>
          </div>

          {/* Right Column - Recoupment History + Top Treatment Categories */}
          <div className="flex flex-col gap-6 order-2">
            {/* Recoupment History */}
            <div>
              <RecoupmentHistory />
            </div>
            {/* Top Treatment Categories */}
            <div>
              <TopTreatmentCategories />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
