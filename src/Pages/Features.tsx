import { Send, Users, Wallet } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Wallet className="w-6 h-6 text-primary" />,
      title: "Secure Wallet",
      desc: "Industry-standard encryption keeps your funds safe.",
    },
    {
      icon: <Send className="w-6 h-6 text-primary" />,
      title: "Instant Transfers",
      desc: "Send and receive money in real-time with zero delays.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Role-based Access",
      desc: "Separate dashboards for Users, Agents, and Admins.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Features</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 border rounded-lg shadow-sm flex flex-col items-start">
            {f.icon}
            <h2 className="text-lg font-semibold mt-4">{f.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
