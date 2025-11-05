"use client"

import { useSidebar, AVAILABLE_MODULES } from "@/lib/sidebar-context"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Settings() {
  const { isModuleEnabled, toggleModule, resetToDefaults, enabledModules } = useSidebar()
  const { toast } = useToast()

  const handleReset = () => {
    resetToDefaults()
    toast({
      title: "Settings reset",
      description: "All sidebar modules have been reset to default.",
    })
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="mb-2 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Logo size={20} strokeColor="white" />
          </div>
          <span className="text-sm font-medium text-primary font-heading">Novologic</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-heading">Settings</h1>
        <p className="text-lg text-muted-foreground">Customize your sidebar modules</p>
      </div>

      {/* Settings Content */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Sidebar Modules Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground font-heading mb-2">Sidebar Modules</h2>
              <p className="text-muted-foreground">
                Select which modules appear in your sidebar. Changes are saved automatically.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
              disabled={enabledModules.length === 0}
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </Button>
          </div>

          {/* Available Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_MODULES.map((module) => {
              const Icon = module.icon
              const isEnabled = isModuleEnabled(module.id)

              return (
                <Card
                  key={module.id}
                  className={`p-4 border-2 transition-all ${
                    isEnabled ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isEnabled ? "bg-primary" : "bg-muted"
                      }`}>
                        <Icon className={`w-5 h-5 ${isEnabled ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={module.id}
                          className="text-base font-semibold text-foreground cursor-pointer block mb-1"
                        >
                          {module.label}
                        </Label>
                        <p className="text-xs text-muted-foreground truncate">{module.href}</p>
                      </div>
                    </div>
                    <Switch
                      id={module.id}
                      checked={isEnabled}
                      onCheckedChange={() => toggleModule(module.id)}
                      className="flex-shrink-0"
                    />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Info Message */}
          {enabledModules.length === 0 && (
            <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>No modules selected.</strong> Enable modules above to add them to your sidebar. Dashboard, Modules, and Settings are always visible.
              </p>
            </div>
          )}

          {/* Summary */}
          {enabledModules.length > 0 && (
            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>{enabledModules.length}</strong> module{enabledModules.length !== 1 ? "s" : ""} enabled in your sidebar.
              </p>
            </div>
          )}
        </Card>

        {/* Info Section */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold text-foreground mb-3 font-heading">About Sidebar Customization</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Dashboard, Modules, and Settings are always visible in the sidebar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Your preferences are saved automatically and persist across sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Changes to module visibility take effect immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>You can reset to defaults at any time using the reset button</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

