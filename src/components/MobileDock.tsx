import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Bot, Code } from "lucide-react";

export default function MobileDock() {
  const links = [
    {
      title: "Ana Sayfa",
      icon: <Home className="h-full w-full text-neutral-300" />,
      href: "#",
    },
    {
      title: "AI Çözümleri",
      icon: <Bot className="h-full w-full text-neutral-300" />,
      href: "#ai-view",
    },
    {
      title: "Dijital Çözümler",
      icon: <Code className="h-full w-full text-neutral-300" />,
      href: "#digital-view",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
}
