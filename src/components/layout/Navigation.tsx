import { Dock, DockIcon } from "@/components/magicui/dock";
import { HomeIcon, LayoutTemplate, BookOpen, User, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: HomeIcon, path: "/", label: "首页" },
  { icon: LayoutTemplate, path: "/projects", label: "作品" },
  { icon: BookOpen, path: "/blog", label: "博客" },
  { icon: User, path: "/about", label: "关于" },
  { icon: Mail, path: "/contact", label: "联系" },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Dock className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <DockIcon
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "bg-zinc-800/50 hover:bg-zinc-700/60 transition-colors",
              isActive && "bg-zinc-700/70 text-white"
            )}
          >
            <item.icon
              className={cn("text-zinc-300", isActive && "text-white")}
            />
          </DockIcon>
        );
      })}
    </Dock>
  );
}
