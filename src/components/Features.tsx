'use client'

import { motion } from 'framer-motion'
import {
    Terminal, Globe, Zap, Settings2, Lock,
    MessageSquare, GitBranch, Code, Puzzle,
    ArrowRight, Sparkles, LayoutGrid, Repeat, Server,
    SpaceIcon,
    Projector
} from 'lucide-react'

const features = [
    {
        icon: Terminal,
        title: "One-Command Deployment",
        description: "Deploy frontend apps with a single CLI command. No dashboard hopping or manual uploads.",
        command: "schemerr deploy",
        color: "from-emerald-400 to-cyan-400",
        iconColor: "text-emerald-400"
    },
    {
        icon: Globe,
        title: "Multi-Provider Support",
        description: "Deploy to Netlify, Vercel, and Railway, Render, and more from a single tool. One CLI, multiple platforms.",
        color: "from-blue-400 to-indigo-400",
        iconColor: "text-blue-400"
    },
    {
        icon: Projector,
        title: "Smart Provider Detection",
        description: "Automatically detects static sites, React/Vite, and Next.js projects to choose the right strategy.",
        color: "from-purple-400 to-pink-400",
        iconColor: "text-purple-400"
    },
    {
        icon: Settings2,
        title: "Fast Configuration",
        description: "Get started instantly with sensible defaults. Optional config available when you need total control.",
        color: "from-amber-400 to-orange-400",
        iconColor: "text-amber-400"
    },
    {
        icon: Lock,
        title: "Env Variable Management",
        description: "Securely handle secrets with .env support and provider-specific injection. Keep keys safe.",
        color: "from-red-400 to-rose-400",
        iconColor: "text-red-400"
    },
    {
        icon: MessageSquare,
        title: "Clear Feedback & Logs",
        description: "Human-readable deployment status and errors. No cryptic logs, just clear explanations.",
        color: "from-teal-400 to-emerald-400",
        iconColor: "text-teal-400"
    },
    {
        icon: GitBranch,
        title: "CI/CD Friendly",
        description: "Designed for automation. GitHub Actions ready with token-based authentication.",
        color: "from-cyan-400 to-blue-400",
        iconColor: "text-cyan-400"
    },
    {
        icon: Code,
        title: "Developer-First Experience",
        description: "Built by developers for developers. Clean output, helpful errors, and blazing fast execution.",
        color: "from-indigo-400 to-violet-400",
        iconColor: "text-indigo-400"
    },
    {
        icon: Sparkles,
        title: "AI insight and debugging",
        description: "Converse with schemerrAI to get insights and debugging help.",
        color: "from-fuchsia-400 to-pink-400",
        iconColor: "text-fuchsia-400"
    }
]

const roadmap = [
    { icon: Repeat, text: "Auto-deploy on git push" },
    { icon: Globe, text: "Custom domain support" },
    { icon: Server, text: "Backend deployments" },
    { icon: LayoutGrid, text: "Deployment history" },
]

export function Features() {
    return (
        <section className="relative mt-[-120px] py-32 px-6 overflow-hidden">
            {/* Background Gradients */}
            {/* Background Gradients */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <Zap size={12} className="fill-current" />
                        Why Schemerr?
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-md text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Schemerr is a unified deployment layer that helps teams ship reliably across modern hosting providers, without stitching together separate workflows for frontend and backend services.

                        Today, Schemerr supports Vercel, Netlify, Railway, and Render, enabling teams to deploy with one command and a consistent release experience across environments.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                        >
                            <div className="mb-4 inline-flex p-3 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                                <feature.icon size={26} className={feature.iconColor} />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>

                            {feature.command && (
                                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                                    <div className="px-2 py-1 bg-white/[0.05] rounded text-[10px] font-mono text-emerald-400 border border-white/[0.05]">
                                        <span className="text-slate-500 select-none">$</span> {feature.command}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    )
}
