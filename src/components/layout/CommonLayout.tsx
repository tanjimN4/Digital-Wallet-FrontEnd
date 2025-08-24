import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({children}:{children:React.ReactNode}) => {
    return (
       <div className="flex justify-center">
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CommonLayout;