'use client'

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#000103]/40 border-b border-white/[0.03] h-20">
            <div className="flex items-center justify-between px-8 h-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-2.5 group cursor-pointer"
                >
                    <div className="relative h-9 w-auto group-hover:scale-105 transition-transform">
                        <img
                            src="/schemerr-logo2.png"
                            alt="Schemerr Logo"
                            className="h-full w-auto object-contain object-left"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <a
                        href="https://github.com/sammy440/schemerr-waitlist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 text-slate-400 hover:text-white transition-colors bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-emerald-500/40"
                    >
                        <Github size={20} />
                    </a>

                    {/* Hover Tooltip */}
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none"
                    >
                        Star on GitHub
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                    </motion.div>
                </motion.div>
            </div>
        </nav >
    )
}
