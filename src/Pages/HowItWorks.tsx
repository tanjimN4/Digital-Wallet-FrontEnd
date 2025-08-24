export const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      desc: "Create your account in seconds and choose your role as User or Agent.",
      icon: "👤",
    },
    {
      title: "Add Money",
      desc: "Top-up your wallet via agent or bank transfer quickly and securely.",
      icon: "💰",
    },
    {
      title: "Send & Receive Payments",
      desc: "Transfer money instantly to anyone using phone/email.",
      icon: "📲",
    },
    {
      title: "Track Transactions",
      desc: "Monitor your transactions with full history and analytics.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 bg-background dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8 mx-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-card dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-foreground/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
