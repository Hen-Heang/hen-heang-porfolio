"use client"

import { BentoGrid, BentoGridItem } from "@/src/components/ui/BentoGrid"
import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Code, Database, Globe, Server, Cpu, Layers } from "lucide-react"

export function AboutBento() {
    return (
        <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
                title="Full Stack Developer"
                description="I specialize in building robust applications with Spring Boot and Next.js."
                header={<CodeSnippet />}
                icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                className="md:col-span-2"
            />
            <BentoGridItem
                title="Tech Enthusiast"
                description="Always exploring new technologies like Three.js and AI integration."
                header={<TechStackViz />}
                icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
                className="md:col-span-1"
            />
            <BentoGridItem
                title="Problem Solver"
                description="Turning complex requirements into clean, maintainable code."
                header={<LogicViz />}
                icon={<IconSignature className="h-4 w-4 text-neutral-500" />}
                className="md:col-span-1"
            />
            <BentoGridItem
                title="Constantly Learning"
                description="Currently diving deep into Advanced React Patterns and System Design."
                header={<TopicsList />}
                icon={<IconTableColumn className="h-4 w-4 text-neutral-500" />}
                className="md:col-span-2"
            />
        </BentoGrid>
    )
}

const CodeSnippet = () => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-slate-900 rounded-xl p-4 flex-col border border-slate-800 relative overflow-hidden group">
            <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-xs text-slate-300 z-10">
                <div><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}</div>
                <div className="pl-4">name: <span className="text-green-400">&quot;Hen Heang&quot;</span>,</div>
                <div className="pl-4">role: <span className="text-green-400">&quot;Full Stack&quot;</span>,</div>
                <div className="pl-4">skills: [<span className="text-green-400">&quot;Next.js&quot;</span>, <span className="text-green-400">&quot;Spring&quot;</span>]</div>
                <div>{"};"}</div>
            </div>
            
            {/* Hover Glitch Effect */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"
                transition={{ duration: 1, repeat: Infinity }}
            />
        </div>
    );
};

const TechStackViz = () => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl relative overflow-hidden items-center justify-center">
             <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
             />
             <div className="grid grid-cols-2 gap-3 z-10">
                 <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                     <Code size={20} />
                 </motion.div>
                 <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                     <Server size={20} />
                 </motion.div>
                 <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                     <Database size={20} />
                 </motion.div>
                 <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                     <Globe size={20} />
                 </motion.div>
             </div>
        </div>
    );
};

const LogicViz = () => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-100 dark:bg-neutral-900 rounded-xl items-center justify-center relative overflow-hidden">
             {/* Simple node graph animation */}
             <div className="relative w-24 h-24">
                <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 w-4 h-4 bg-teal-500 rounded-full z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 w-4 h-4 bg-purple-500 rounded-full z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full stroke-indigo-300 dark:stroke-indigo-700 stroke-2">
                    <line x1="50%" y1="10%" x2="10%" y2="90%" />
                    <line x1="50%" y1="10%" x2="90%" y2="90%" />
                    <line x1="10%" y1="90%" x2="90%" y2="90%" />
                </svg>
             </div>
        </div>
    );
};

const TopicsList = () => {
    const topics = ["System Design", "Cloud Architecture", "AI Agents", "Three.js", "Rust"];
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-white dark:bg-black border border-transparent dark:border-white/[0.2] rounded-xl p-4 overflow-hidden relative">
           <div className="flex flex-wrap gap-2 content-start">
               {topics.map((topic, i) => (
                   <motion.div
                        key={topic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                   >
                       {topic}
                   </motion.div>
               ))}
           </div>
           
           <motion.div 
                className="absolute -bottom-10 -right-10 opacity-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
               <Cpu size={120} />
           </motion.div>
        </div>
    );
};
