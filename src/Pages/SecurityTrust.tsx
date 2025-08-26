export const SecurityTrust = () => {
  const features = [
    {
      title: "End-to-End Encryption",
      desc: "All transactions and user data are securely encrypted.",
      icon: "🔒",
    },
    {
      title: "KYC Verification",
      desc: "Agents and users are verified to prevent fraud.",
      icon: "✅",
    },
    {
      title: "Fraud Detection",
      desc: "Advanced monitoring to protect your wallet from suspicious activity.",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-20 bg-background dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          Security & Trust
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mx-3">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-card dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {f.title}
              </h3>
              <p className="text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
