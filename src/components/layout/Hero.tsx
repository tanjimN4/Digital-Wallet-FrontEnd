import heroImage from "@/assets/icons/hero.jpg"; // replace with your image
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-900 text-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 py-16 md:py-24">
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-400 animate-shine">
            𝓕𝓲𝓼𝓽 𝓟𝓪𝔂
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90 dark:text-white/80">
            Secure, Fast & Smart Digital Wallet. Manage your money, send and receive payments instantly, and track your transactions all in one place.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="flex-1 mb-8 md:mb-0">
          <img
            src={heroImage}
            alt="Fist Pay Digital Wallet"
            className="w-full max-w-md mx-auto animate-float"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white/10 blur-3xl dark:bg-black/20"></div>
    </section>
  );
};

export default Hero;
