export default function About() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-muted-foreground max-w-2xl">
        Our fist pay service is designed to make financial transactions
        seamless, secure, and fast. We aim to empower users and agents with a
        reliable platform while ensuring transparency and convenience.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-sm text-muted-foreground">
            Providing a trusted, easy-to-use wallet system for everyone.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-sm text-muted-foreground">
            Become the leading financial technology platform for digital
            payments.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Our Team</h2>
          <p className="text-sm text-muted-foreground">
            A passionate group of developers, designers, and strategists making
            finance better.
          </p>
        </div>
      </div>
    </section>
  )
}
