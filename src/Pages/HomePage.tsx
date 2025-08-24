import Hero from "@/components/layout/Hero";
import { HowItWorks } from "./HowItWorks";
import { Testimonials } from "./Testimonials";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <HowItWorks />
            <Testimonials />
        </div>
    );
};

export default HomePage;