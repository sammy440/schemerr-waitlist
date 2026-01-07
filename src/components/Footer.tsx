'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Heart } from 'lucide-react'

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/schemerr/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/sammy440/schemerr-waitlist", label: "GitHub" },
]

export function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-8 w-auto">
                                <img
                                    src="/schemerr-logo2.png"
                                    alt="Schemerr"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            The ultimate AI-assisted deployment tool for developers. <br className="hidden md:block" />
                            Deploy any project with a single command.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, color: '#10b981' }}
                                className="p-3 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 transition-colors"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Schemerr. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        Made with <Heart size={12} className="text-green-500 fill-current" /> by developers, for developers.
                    </div>
                </div>
            </div>
        </footer>
    )
}
