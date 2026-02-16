import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useTranslation } from "react-i18next"
import {
  Loader2, Calculator, Sparkles, TrendingUp,
  Wallet, ReceiptText, Moon, Sun, Languages
} from "lucide-react"

function App() {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const [formData, setFormData] = useState({
    grossSalary: "",      // Μηνιαίος
    annualGross: "",      // Ετήσιος
    sector: "private",
    children: "0",
    isMarried: false
  })

  // --- ΠΡΟΣΘΗΚΗ: Υπολογισμός αφορολόγητου σε πραγματικό χρόνο για το UI ---
  const calculateTaxFree = () => {
    let base = 8636;
    let bonus = (parseInt(formData.children) || 0) * 1000;
    if (formData.isMarried) bonus += 1000;
    return base + bonus;
  };
  const currentTaxFree = calculateTaxFree();

  // Διαχείριση Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Αυτόματος υπολογισμός Ετήσιου/Μηνιαίου όταν αλλάζει ο τομέας ή ο μισθός
  const updateSalaries = (value, type, currentSector) => {
    const months = currentSector === "private" ? 14 : 12
    if (type === "monthly") {
      const annual = value ? (parseFloat(value) * months).toFixed(2) : ""
      setFormData(prev => ({ ...prev, grossSalary: value, annualGross: annual }))
    } else {
      const monthly = value ? (parseFloat(value) / months).toFixed(2) : ""
      setFormData(prev => ({ ...prev, annualGross: value, grossSalary: monthly }))
    }
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'el' ? 'en' : 'el'
    i18n.changeLanguage(newLang)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Number(formData.grossSalary) <= 0) {
      toast.error(t("errorSalary", "Παρακαλώ εισάγετε έγκυρο μισθό"))
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gross_salary: parseFloat(formData.grossSalary),
          sector: formData.sector,
          children: parseInt(formData.children),
          is_married: formData.isMarried
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setResults(data)
        toast.success(t("successCalculation", "Ο υπολογισμός ολοκληρώθηκε!"))
      }
    } catch (error) {
      toast.error(t("errorConnection", "Αποτυχία σύνδεσης με το Backend"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20 relative">
      <Toaster position="top-center" richColors />

      {/* --- TOP BAR (Πάνω Δεξιά) --- */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 shadow-sm dark:bg-slate-800">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{i18n.language === 'el' ? 'EN' : 'EL'}</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)} className="shadow-sm dark:bg-slate-800">
          {darkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-slate-700" />}
        </Button>
      </div>

      <div className="max-w-xl mx-auto pt-16 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-2 dark:text-white">
            <Calculator className="h-8 w-8 text-primary" />
            {t("appTitle", "Υπολογιστής Μισθού & AI")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("appSubtitle", "Έξυπνη ανάλυση μεικτών και καθαρών αποδοχών.")}
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-t-4 border-t-primary dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-white/50 dark:bg-white/5">
            <CardTitle className="dark:text-white">{t("formTitle", "Στοιχεία Υπολογισμού")}</CardTitle>
            <CardDescription>{t("formDesc", "Εισάγετε τον μηνιαίο ή ετήσιο μισθό σας.")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Salary Inputs (Monthly & Annual) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grossSalary" className="dark:text-slate-200 font-semibold">{t("grossSalaryLabel", "Μηνιαία Μεικτά")}</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                    <Input
                      id="grossSalary"
                      type="number"
                      className="pl-7 dark:bg-slate-800 dark:text-white"
                      value={formData.grossSalary}
                      onChange={(e) => updateSalaries(e.target.value, "monthly", formData.sector)}
                      placeholder="1200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualGross" className="dark:text-slate-200 font-semibold">{t("annualGrossLabel", "Ετήσια Μεικτά")}</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                    <Input
                      id="annualGross"
                      type="number"
                      className="pl-7 dark:bg-slate-800 dark:text-white bg-slate-50"
                      value={formData.annualGross}
                      onChange={(e) => updateSalaries(e.target.value, "annual", formData.sector)}
                      placeholder="16800"
                    />
                  </div>
                </div>
              </div>

              {/* Sector & Children */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="dark:text-slate-200">{t("sectorLabel")}</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(val) => {
                      setFormData(prev => ({ ...prev, sector: val }))
                      updateSalaries(formData.grossSalary, "monthly", val) // Αναπροσαρμογή ετήσιου
                    }}
                  >
                    <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">{t("privateSector")}</SelectItem>
                      <SelectItem value="public">{t("publicSector")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="children" className="dark:text-slate-200">{t("childrenLabel")}</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    className="dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Marital Status */}
              <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 transition-all">
                <div className="space-y-0.5">
                  <Label htmlFor="isMarried" className="text-base font-medium dark:text-slate-200">{t("marriedLabel")}</Label>
                  {/* ΔΙΟΡΘΩΣΗ: Χρησιμοποιούμε t() και δείχνουμε το ποσό live */}
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    {t("marriedDesc")}
                    <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {t("taxFreeLimit")}: €{currentTaxFree.toLocaleString()}
                    </span>
                  </p>
                </div>
                <Switch
                  id="isMarried"
                  checked={formData.isMarried}
                  onCheckedChange={(val) => setFormData({ ...formData, isMarried: val })}
                />
              </div>

              <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : t("analyzeButton")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* --- RESULTS SECTION --- */}
        {results && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <Card className="border-2 border-primary/20 dark:bg-slate-900 shadow-2xl">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/50">
                <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t("resultsTitle", "Αποτελέσματα Ανάλυσης")}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800">
                    <span className="text-xs uppercase font-bold text-muted-foreground block mb-1">{t("annualGross", "Μεικτά Ετήσια")}</span>
                    <p className="text-2xl font-black dark:text-white">€{results.annual_gross?.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950/30 border-green-100">
                    <span className="text-xs uppercase font-bold text-green-700 block mb-1">{t("annualNet", "Καθαρά Ετήσια")}</span>
                    <p className="text-2xl font-black text-green-700">€{results.annual_net?.toLocaleString()}</p>
                  </div>
                </div>

                {/* AI Advice Box */}
                <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-6 text-white">
                  <h4 className="font-bold flex items-center gap-2 mb-2 italic">
                    <Sparkles className="h-4 w-4" /> AI Insights
                  </h4>
                  <p className="text-sm opacity-90">{results.ai_advice}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default App