'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Background() {
    const [mounted, setMounted] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    if (!mounted) return <div className="fixed inset-0 bg-[#000103]" />

    return (
        <>
            {/* Aurora Effect - follows mouse subtly */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {/* Primary Aurora Blob */}
                <motion.div
                    animate={{
                        x: ['-10%', '10%', '-10%'],
                        y: ['-10%', '15%', '-10%'],
                        scale: [1, 1.3, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        left: `${mousePosition.x * 0.1}%`,
                        top: `${mousePosition.y * 0.1}%`,
                    }}
                    className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent blur-[120px] rounded-full"
                />

                {/* Secondary Aurora */}
                <motion.div
                    animate={{
                        x: ['10%', '-15%', '10%'],
                        y: ['10%', '-10%', '10%'],
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -60, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] bg-gradient-to-tl from-emerald-600/20 via-cyan-500/15 to-transparent blur-[100px] rounded-full"
                />

                {/* Tertiary Accent - Purple/Pink for contrast */}
                <motion.div
                    animate={{
                        x: ['-5%', '5%', '-5%'],
                        y: ['5%', '-5%', '5%'],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent blur-[80px] rounded-full"
                />

                {/* Central Glow Pulse */}
                <motion.div
                    animate={{
                        opacity: [0.15, 0.35, 0.15],
                        scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)]"
                />
            </div>

            {/* Animated Grid Pattern */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
                <motion.div
                    animate={{
                        backgroundPosition: ['0px 0px', '80px 80px'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: 0
                        }}
                        animate={{
                            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            opacity: [0, Math.random() * 0.5 + 0.2, 0],
                            scale: [0, Math.random() * 0.8 + 0.3, 0],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 8
                        }}
                        className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
                        style={{
                            boxShadow: '0 0 10px 2px rgba(52, 211, 153, 0.4)'
                        }}
                    />
                ))}
            </div>

            {/* Shooting Stars */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        initial={{
                            x: '-10%',
                            y: `${20 + i * 30}%`,
                            opacity: 0
                        }}
                        animate={{
                            x: ['110%'],
                            y: [`${40 + i * 20}%`],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 8 + i * 5,
                            ease: "easeOut",
                            delay: i * 4
                        }}
                        className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-white to-emerald-400"
                        style={{
                            filter: 'blur(0.5px)'
                        }}
                    />
                ))}
            </div>

            {/* Floating Geometric Rings */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`ring-${i}`}
                        initial={{
                            rotate: i * 60,
                            opacity: 0
                        }}
                        animate={{
                            rotate: [i * 60, i * 60 + 360],
                            opacity: 0.04,
                        }}
                        transition={{
                            duration: 40 + i * 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: `${300 + i * 150}px`,
                            height: `${300 + i * 150}px`,
                        }}
                    >
                        <div className="w-full h-full border border-emerald-500/30 rounded-full" />
                    </motion.div>
                ))}
            </div>
        </>
    )
}
