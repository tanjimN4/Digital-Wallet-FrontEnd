import { useEffect } from "react";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { role } from "@/constants/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home", className: "nav-home" },
  { href: "/about", label: "About", className: "nav-about" },
  { href: "/features", label: "Features", className: "nav-features" },
  { href: "/contact", label: "Contact", className: "nav-contact" },
  { href: "/faq", label: "FAQ", className: "nav-faq" },
  { href: "/admin", label: "Dashboard", role: role.admin, className: "nav-dashboard" },
  { href: "/admin", label: "Dashboard", role: role.superAdmin, className: "nav-dashboard" },
  { href: "/user", label: "Dashboard", role: role.user, className: "nav-dashboard" },
  { href: "/user", label: "Dashboard", role: role.agent, className: "nav-dashboard" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const currentRole = data?.data?.role;
  const isLoggedIn = !!data?.data?.email;
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  // Filter links based on user role
  const filteredLinks = navigationLinks.filter((link) => {
    if (!link.role) return true;
    return link.role === currentRole;
  });

  // Handle Logout
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  // Guided Tour
  useEffect(() => {
    if (!isLoggedIn) return; // only run for logged-in users

    const hasSeenTour = localStorage.getItem("navbarTourDone");
    if (hasSeenTour) return;

    const driverObj = driver({
      showProgress: true,
      allowClose: false,
      overlayColor: "rgba(0, 0, 0, 0.6)",
      nextBtnText: "Next →",
      prevBtnText: "← Back",
      doneBtnText: "Finish",
      popoverClass: "custom-driver-popover",
      steps: [
        {
          element: ".nav-home",
          popover: {
            title: "🏠 Home",
            description: "Go back to the main page anytime from here.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: ".nav-about",
          popover: {
            title: "ℹ️ About",
            description: "Learn more about our platform and mission.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: ".nav-features",
          popover: {
            title: "⚙️ Features",
            description: "Explore our core app features here.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: ".nav-contact",
          popover: {
            title: "📞 Contact",
            description: "Need help? Reach out to our support team.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: ".nav-faq",
          popover: {
            title: "❓ FAQ",
            description: "Find answers to commonly asked questions.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: ".nav-dashboard",
          popover: {
            title: "📊 Dashboard",
            description: "Access your personalized user dashboard here.",
            side: "bottom",
            align: "center",
          },
        },
      ],
    });

    driverObj.drive();
    localStorage.setItem("navbarTourDone", "true");
  }, [isLoggedIn]);

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {filteredLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className={`py-1.5 ${link.className}`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <Logo />
              <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-900">
                𝓕𝓲𝓼𝓽 𝓟𝓪𝔂
              </h1>
            </div>

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {filteredLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className={`text-muted-foreground hover:text-primary py-1.5 font-medium ${link.className}`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="outline" className="text-sm">
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
