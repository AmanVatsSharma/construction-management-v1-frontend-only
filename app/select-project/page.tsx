/**
 * @file page.tsx
 * @module app/select-project
 * @description Enhanced select project page with search, filters, and modern UI
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Filter,
  Calendar,
  Building2,
  ChevronDown,
} from "lucide-react"
import { staggerContainer, staggerItem, scaleIn } from "@/lib/animations"

interface Project {
  id: string
  name: string
  location: string
  progress: number
  status: "active" | "planning" | "completed" | "on-hold"
  value: string
  valueNum: number
  team: number
  image: string
  deadline: string
  isFavorite?: boolean
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Downtown Office Complex",
    location: "Toronto, ON",
    progress: 65,
    status: "active",
    value: "$12.5M",
    valueNum: 12500000,
    team: 24,
    deadline: "Dec 2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Residential Tower",
    location: "Vancouver, BC",
    progress: 42,
    status: "active",
    value: "$18.3M",
    valueNum: 18300000,
    team: 31,
    deadline: "Mar 2026",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Shopping Mall Renovation",
    location: "Calgary, AB",
    progress: 28,
    status: "planning",
    value: "$8.7M",
    valueNum: 8700000,
    team: 18,
    deadline: "Aug 2026",
    image: "https://images.unsplash.com/photo-1581578731548-c64695b952952?w=500&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Highway Infrastructure",
    location: "Montreal, QC",
    progress: 85,
    status: "active",
    value: "$25.1M",
    valueNum: 25100000,
    team: 42,
    deadline: "Sep 2025",
    image: "https://images.unsplash.com/photo-1503387762519-52582a831b83?w=500&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Hospital Expansion",
    location: "Edmonton, AB",
    progress: 55,
    status: "active",
    value: "$14.9M",
    valueNum: 14900000,
    team: 28,
    deadline: "Nov 2025",
    image: "https://images.unsplash.com/photo-1576092160562-40f08a279491?w=500&h=300&fit=crop",
    isFavorite: true,
  },
  {
    id: "6",
    name: "University Campus",
    location: "Ottawa, ON",
    progress: 100,
    status: "completed",
    value: "$22.4M",
    valueNum: 22400000,
    team: 35,
    deadline: "Completed",
    image: "https://images.unsplash.com/photo-1441070840590-cacbc8fb2ad9?w=500&h=300&fit=crop",
  },
]

export default function SelectProjectPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(SAMPLE_PROJECTS.filter((p) => p.isFavorite).map((p) => p.id))
  )

  if (!user) {
    router.push("/login")
    return null
  }

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    return SAMPLE_PROJECTS.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const handleSelectProject = async (projectId: string) => {
    setSelectedProject(projectId)
    setLoading(true)

    setTimeout(() => {
      localStorage.setItem("currentProject", projectId)
      router.push("/")
    }, 600)
  }

  const toggleFavorite = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent/10 text-accent border-accent/30"
      case "planning":
        return "bg-secondary/10 text-secondary-foreground border-secondary/30"
      case "completed":
        return "bg-muted text-muted-foreground border-border"
      case "on-hold":
        return "bg-destructive/10 text-destructive border-destructive/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-accent to-accent/80"
    if (progress >= 50) return "from-primary to-primary-hover"
    if (progress >= 30) return "from-secondary to-secondary/80"
    return "from-muted-foreground to-muted-foreground/60"
  }

  // Statistics
  const stats = {
    total: SAMPLE_PROJECTS.length,
    active: SAMPLE_PROJECTS.filter((p) => p.status === "active").length,
    completed: SAMPLE_PROJECTS.filter((p) => p.status === "completed").length,
    totalValue: SAMPLE_PROJECTS.reduce((sum, p) => sum + p.valueNum, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10 backdrop-blur-md bg-card/95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center shadow-md">
              <Logo size={24} strokeColor="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-heading">Novologic</h1>
              <p className="text-xs text-muted-foreground">Select Project</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-bold shadow-md">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={staggerItem}
            className="bg-card border border-border rounded-lg p-4 hover-lift"
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Total</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="bg-card border border-border rounded-lg p-4 hover-lift"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Active</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.active}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="bg-card border border-border rounded-lg p-4 hover-lift"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Completed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">Finished</p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="bg-card border border-border rounded-lg p-4 hover-lift"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Value</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              ${(stats.totalValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-muted-foreground">Total Portfolio</p>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["all", "active", "planning", "completed"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">No projects found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div key={project.id} variants={staggerItem} custom={index}>
                  <Card
                    className={`overflow-hidden hover-lift cursor-pointer border-2 transition-all ${
                      selectedProject === project.id
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleSelectProject(project.id)}
                  >
                    {/* Image with overlay */}
                    <div className="relative h-44 overflow-hidden bg-muted group">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Favorite Star */}
                      <motion.button
                        onClick={(e) => toggleFavorite(project.id, e)}
                        className="absolute top-3 left-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            favorites.has(project.id)
                              ? "fill-secondary text-secondary"
                              : "text-foreground"
                          }`}
                        />
                      </motion.button>

                      {/* Status Badge */}
                      <div
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          project.status
                        )} backdrop-blur-sm`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </div>

                      {/* Deadline */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs font-medium text-foreground">
                        <Calendar className="w-3 h-3" />
                        {project.deadline}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-foreground mb-1 font-heading truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-foreground">Progress</span>
                          <span className="text-xs font-bold text-primary">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-primary/5 rounded-lg p-2.5 border border-primary/10">
                          <div className="flex items-center gap-1.5 mb-1">
                            <DollarSign className="w-3 h-3 text-primary" />
                            <p className="text-xs text-muted-foreground">Value</p>
                          </div>
                          <p className="text-sm font-bold text-primary">{project.value}</p>
                        </div>
                        <div className="bg-accent/5 rounded-lg p-2.5 border border-accent/10">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Users className="w-3 h-3 text-accent" />
                            <p className="text-xs text-muted-foreground">Team</p>
                          </div>
                          <p className="text-sm font-bold text-accent">{project.team} members</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className={`w-full ${
                            selectedProject === project.id
                              ? "bg-primary hover:bg-primary-hover"
                              : ""
                          }`}
                          variant={selectedProject === project.id ? "default" : "outline"}
                          disabled={loading && selectedProject !== project.id}
                        >
                          {selectedProject === project.id && loading ? "Entering..." : "Enter Project"}
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Need access to more projects? Contact your administrator for permissions.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
