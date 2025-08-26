import Hero from "@/components/layout/Hero";
import { HowItWorks } from "./HowItWorks";
import { SecurityTrust } from "./SecurityTrust";
import { Testimonials } from "./Testimonials";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <HowItWorks />
            <Testimonials />
            <SecurityTrust />
        </div>
    );
};

export default HomePage;