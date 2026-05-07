"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap, Briefcase, Cpu, Layout, Code, Rocket, Target, Workflow, Calendar, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export type NodeKey = "product" | "engineering" | "design" | "code" | "pm" | "founder";

export interface TimelineItem {
  id: number;
  key: NodeKey;
  icon: React.ElementType;
  relatedIds: number[];
  energy: number;
}

export const defaultTimelineData: TimelineItem[] = [
  {
    id: 1,
    key: "pm",
    "icon": Calendar, 
    relatedIds: [2, 5, 6],
    energy: 95,
  },
  {
    id: 2,
    key: "engineering",
    icon: Cpu,
    relatedIds: [1, 4, 6], 
    energy: 90,
  },
  {
    id: 3,
    key: "design",
    icon: Layout,
    relatedIds: [4, 5],
    energy: 80,
  },
  {
    id: 4,
    key: "code",
    icon: Code,
    relatedIds: [2, 3],
    energy: 85,
  },
  {
    id: 5,
    key: "product",
    icon: Briefcase,
    relatedIds: [1, 3, 6],
    energy: 95,
  },
];

const founderNode: TimelineItem = {
  id: 6,
  key: "founder",
  "icon": Zap,
  relatedIds: [1, 2, 5],
  energy: 100
};

interface RadialOrbitalTimelineProps {
  timelineData?: TimelineItem[];
}

export function RadialOrbitalTimeline({
  timelineData = defaultTimelineData,
}: RadialOrbitalTimelineProps) {
  const t = useTranslations("Timeline");
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [hoverPulse, setHoverPulse] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const handleNodeMouseEnter = (id: number) => {
    if (activeNodeId) return;
    const relatedItems = getRelatedItems(id);
    const newHoverPulse: Record<number, boolean> = { [id]: true };
    relatedItems.forEach((relId) => {
      newHoverPulse[relId] = true;
    });
    setHoverPulse(newHoverPulse);
  };

  const handleNodeMouseLeave = () => {
    if (activeNodeId) return;
    setHoverPulse({});
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { [id]: !prev[id] };
      
      if (newState[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        setHoverPulse({});
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.15) % 360);
      }, 50);
    }
    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (nodeId === 6) return; // Don't rotate for center node
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 220;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.3, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    if (itemId === 6) return founderNode.relatedIds;
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center pointer-events-auto">
        <div className="absolute w-full h-full flex items-center justify-center" ref={orbitRef} style={{ perspective: "1000px" }}>
          
          {/* Central Pulsating Node (Business/Founder) */}
          <div 
            className={`absolute w-24 h-24 rounded-full bg-gradient-to-br from-petrol via-accent to-background animate-pulse flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 ${expandedItems[founderNode.id] ? "z-[300]" : "z-10"}`}
            onClick={(e) => { e.stopPropagation(); toggleItem(founderNode.id); }}
          >
            <div className="absolute w-32 h-32 rounded-full border border-accent/20 animate-ping opacity-70"></div>
            <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <div className="absolute top-28 whitespace-nowrap text-[10px] font-mono tracking-[0.2em] font-bold text-accent uppercase">
              {t("node_founder_title")}
            </div>

            {expandedItems[founderNode.id] && (
               <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-80 lg:w-[500px] bg-background/95 backdrop-blur-xl border-accent/40 shadow-2xl shadow-black/50 overflow-visible z-50">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-accent/50"></div>
               <CardHeader className="pb-3 pt-6 flex flex-row items-center justify-between">
                 <CardTitle className="text-base md:text-xl font-display font-bold text-accent uppercase tracking-widest leading-tight">
                   {t("node_founder_title")}
                 </CardTitle>
                 <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-accent/10 hover:text-accent -mr-2 -mt-2"
                    onClick={(e) => { e.stopPropagation(); toggleItem(founderNode.id); }}
                 >
                   <X size={14} />
                 </Button>
               </CardHeader>
               <CardContent className="text-xs md:text-sm lg:text-base text-foreground/80 font-sans font-light pb-8">
                 <p className="leading-relaxed mb-6">{t("node_founder_content")}</p>
                 <div className="mt-8 pt-6 border-t border-foreground/10">
                   <div className="flex justify-between items-center text-[10px] md:text-xs uppercase font-mono tracking-widest mb-3 opacity-70">
                     <span className="flex items-center">
                       <Zap size={12} className="mr-2 text-accent" />
                       Strategic Traction
                     </span>
                     <span>100%</span>
                   </div>
                   <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                     <div className="h-full bg-accent w-full animate-in slide-in-from-left duration-1000"></div>
                   </div>
                 </div>
               </CardContent>
             </Card>
            )}
          </div>

          <div className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full border border-white/5 opacity-50"></div>

          {/* Orbital Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isHovered = hoverPulse[item.id];
            const isPulsing = pulseEffect[item.id] || hoverPulse[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex: isExpanded ? 200 : position.zIndex, opacity: isExpanded ? 1 : position.opacity }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                onMouseEnter={() => handleNodeMouseEnter(item.id)}
                onMouseLeave={handleNodeMouseLeave}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{ background: isPulsing ? `radial-gradient(circle, rgba(var(--accent-rgb),0.2) 0%, rgba(var(--accent-rgb),0) 70%)` : 'none', width: `${item.energy * 0.5 + 40}px`, height: `${item.energy * 0.5 + 40}px`, left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`, top: `-${(item.energy * 0.5 + 40 - 40) / 2}px` }}
                ></div>

                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isExpanded ? "bg-foreground text-background border-accent scale-125 shadow-lg shadow-accent/30" : isRelated || isHovered ? "bg-accent/80 text-foreground border-accent animate-pulse" : "bg-background text-foreground border-foreground/20"}`}>
                  <Icon size={18} />
                </div>

                <div className={`absolute top-14 whitespace-nowrap left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none ${isExpanded || isHovered ? "text-[#1B3A4B] font-bold" : "text-[#1B3A4B]/50"}`}>
                  {t(`node_${item.key}_title`)}
                </div>

                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 md:w-80 bg-background/95 backdrop-blur-xl border-accent/30 shadow-2xl shadow-black/50 overflow-visible z-50">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-accent/50"></div>
                    <CardHeader className="pb-3 pt-6 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm md:text-base font-display font-bold text-accent uppercase tracking-wider">{t(`node_${item.key}_title`)}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-accent/10 hover:text-accent -mr-2 -mt-2"
                        onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                      >
                        <X size={14} />
                      </Button>
                    </CardHeader>
                    <CardContent className="text-xs md:text-sm text-foreground/80 font-sans font-light pb-6">
                      <p className="leading-relaxed">{t(`node_${item.key}_content`)}</p>
                      <div className="mt-5 pt-4 border-t border-foreground/10">
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest mb-2 opacity-70"><span className="flex items-center"><Zap size={10} className="mr-2 text-accent" />Skills</span><span>{item.energy}%</span></div>
                        <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden text-accent"><div className="h-full bg-accent transition-all duration-1000 ease-out" style={{ width: `${item.energy}%` }}></div></div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-foreground/10">
                          <div className="flex items-center mb-3"><LinkIcon size={10} className="text-foreground/50 mr-2" /><h4 className="text-[10px] uppercase tracking-widest font-mono text-foreground/50">Connections</h4></div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((rid) => {
                              const rItem = [...defaultTimelineData, founderNode].find(i => i.id === rid);
                              return (
                                <Button key={rid} variant="outline" size="sm" className="h-7 px-3 py-0 text-[10px] rounded-none border-foreground/20 bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent/40 transition-all font-mono uppercase" onClick={(e) => { e.stopPropagation(); toggleItem(rid); }}>
                                  {rItem ? t(`node_${rItem.key}_title`) : ''} <ArrowRight size={8} className="ml-2" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RadialOrbitalTimeline;
