import { Home, FileText, Settings, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Contratos", href: "/contracts" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  return (
    <div
      className={cn(
        "bg-white border-gray-200 transition-all duration-300",
        isMobile
          ? "w-full h-auto border-b"
          : cn("h-screen border-r", collapsed ? "w-16" : "w-64")
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {(!collapsed || isMobile) && (
          <h1 className="text-xl font-bold text-primary">Contratos</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-2 rounded-lg hover:bg-gray-100",
            isMobile && "ml-auto"
          )}
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className={cn("p-4", isMobile && (collapsed ? "hidden" : "block"))}>
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 mb-2"
          >
            <item.icon size={20} />
            {(!collapsed || isMobile) && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};
