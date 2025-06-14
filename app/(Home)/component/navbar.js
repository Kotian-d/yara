"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  PowerIcon,
  Settings,
  Unplug,
  Users,
} from "lucide-react";
import { logout } from "../../actions/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const components = [
  {
    title: "Transaction Report",
    href: "/admin/transactionRpt",
    description:
      "This report detailing transaction dates, amounts, payment methods, and recipients for accurate tracking and analysis.",
  },
  {
    title: "Load Wallet Transction",
    href: "/admin/loadwalletRpt",
    description:
      "It includes details such as transaction dates, amounts loaded, payment sources, and wallet balances.",
  },
  {
    title: "User Ledger Report",
    href: "/admin/userlegerRpt",
    description:
      "This Report provides a detailed record of all financial transactions associated with a user's account.",
  },
  {
    title: "Cashback Report",
    href: "/admin/cashbackRpt",
    description: "Visually or semantically separates content.",
  },
  {
    title: "OperatorWise Report",
    href: "/admin/operatorwiseRpt",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "UserWise Report",
    href: "/admin/userwiseRpt",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
  {
    title: "ApiWise Report",
    href: "/admin/apiwiseRpt",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
  {
    title: "Complaint Report",
    href: "/admin/complaintRpt",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  async function onSubmit() {
    try {
      await logout();
      router.push("/auth/signIn");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <div className="sticky top-0 z-50">
      <div className="text-2xl bg-primary p-4 text-primary-foreground font-bold">
        <h1 className="mx-8">
          <Link href={"/"}>My App</Link>
        </h1>
      </div>
      <nav className="p-3 border-b-2 bg-white">
        <div className="mx-8 flex items-center justify-between bg-white">
          <Menu className="md:hidden cursor-pointer" />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-5">
              <NavigationMenuItem>
                {session?.user?.role === "ADMIN" ? (
                  <Link href="/admin/dashboard">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard />
                      DashBoard
                    </div>
                  </Link>
                ) : (
                  <Link href="/user/dashboard">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard />
                      DashBoard
                    </div>
                  </Link>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center gap-2">
                    <Unplug />
                    <span>API master</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/admin/apimaster"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            API
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            allows users to manage API connections by defining
                            authentication methods, access permissions, and
                            endpoint configurations. Proper configuration
                            ensures secure data exchange, seamless integration,
                            and optimal system performance.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/admin/smsapimaster" title="SMS Api Master">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem
                      href="/admin/providerSetting"
                      title="Provider Api Setting"
                    >
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Custom Api Setting"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center gap-2">
                    <ChartNoAxesCombined />
                    Reports
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/users">
                  <div className="flex items-center gap-2">
                    <Users />
                    Users
                  </div>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/settings">
                  <div className="flex items-center gap-2">
                    <Settings />
                    Settings
                  </div>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <form action={onSubmit} className="flex">
            <button className="cursor-pointer text-3xl" aria-label="Logout">
              <PowerIcon className="text-primary stroke-3" />
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

const ListItem = ({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
