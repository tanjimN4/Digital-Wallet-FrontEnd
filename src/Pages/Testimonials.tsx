export const Testimonials = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=1",
      quote: "Fist Pay makes transferring money effortless. Highly recommended!",
    },
    {
      name: "Bob Smith",
      role: "Agent",
      avatar: "https://i.pravatar.cc/150?img=2",
      quote: "Managing clients and transactions is super easy with Fist Pay.",
    },
    {
      name: "Carol Lee",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=3",
      quote: "Secure, fast, and intuitive wallet. Love the interface!",
    },
  ];

  return (
    <section className="py-20 bg-foreground/5 dark:bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-card dark:bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              <img
                src={r.avatar}
                alt={r.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-foreground/80 mb-3">&quot;{r.quote}&quot;</p>
              <h4 className="text-lg font-semibold text-foreground">{r.name}</h4>
              <p className="text-sm text-foreground/60">{r.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
