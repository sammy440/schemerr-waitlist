'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react'

interface CommandLine {
    command: string
    output: string[]
    delay: number // delay before this command starts (ms)
    typingSpeed?: number // ms per character
}

const commands: CommandLine[] = [
    {
        command: 'schemerr init',
        output: [
            '✓ Created .schemerrc',
            '✓ Project initialized successfully!'
        ],
        delay: 1000,
        typingSpeed: 50
    },
    {
        command: 'schemerr config set --token=sk_live_***',
        output: [
            '✓ Token validated',
            '✓ Token set successfully!'
        ],
        delay: 800,
        typingSpeed: 40
    },
    {
        command: 'schemerr deploy',
        output: [
            '◐ Building project...',
            '◐ Uploading assets...',
            '✓ Deployed successfully!',
            '  → https://my-app.schemerr.dev',
            '  → Ready in 2.3s'
        ],
        delay: 800,
        typingSpeed: 45
    }
]

export function CliDemo() {
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
    const [typedCommand, setTypedCommand] = useState('')
    const [showOutput, setShowOutput] = useState(false)
    const [visibleOutputLines, setVisibleOutputLines] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [commandHistory, setCommandHistory] = useState<{ command: string; output: string[] }[]>([])
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (currentCommandIndex >= commands.length) {
            setIsComplete(true)
            // Restart after a pause
            const restartTimer = setTimeout(() => {
                setCommandHistory([])
                setCurrentCommandIndex(0)
                setTypedCommand('')
                setShowOutput(false)
                setVisibleOutputLines(0)
                setIsComplete(false)
            }, 5000)
            return () => clearTimeout(restartTimer)
        }

        const currentCommand = commands[currentCommandIndex]

        // Start typing after delay
        const startTimer = setTimeout(() => {
            setIsTyping(true)
            let charIndex = 0

            const typeInterval = setInterval(() => {
                if (charIndex < currentCommand.command.length) {
                    setTypedCommand(currentCommand.command.slice(0, charIndex + 1))
                    charIndex++
                } else {
                    clearInterval(typeInterval)
                    setIsTyping(false)

                    // Show output after typing completes
                    setTimeout(() => {
                        setShowOutput(true)
                        let lineIndex = 0

                        const outputInterval = setInterval(() => {
                            if (lineIndex < currentCommand.output.length) {
                                setVisibleOutputLines(lineIndex + 1)
                                lineIndex++
                            } else {
                                clearInterval(outputInterval)

                                // Move to next command
                                setTimeout(() => {
                                    setCommandHistory(prev => [...prev, {
                                        command: currentCommand.command,
                                        output: currentCommand.output
                                    }])
                                    setTypedCommand('')
                                    setShowOutput(false)
                                    setVisibleOutputLines(0)
                                    setCurrentCommandIndex(prev => prev + 1)
                                }, 600)
                            }
                        }, 150)
                    }, 300)
                }
            }, currentCommand.typingSpeed || 50)

            return () => clearInterval(typeInterval)
        }, currentCommand.delay)

        return () => clearTimeout(startTimer)
    }, [currentCommandIndex])

    const currentCommand = commands[currentCommandIndex]

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full max-w-2xl mx-auto mt-16"
        >
            {/* Terminal Window */}
            <div className="relative group">
                {/* Glow Effect */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 via-teal-500/30 to-emerald-600/30 rounded-2xl blur-xl"
                />

                {/* Terminal Container */}
                <div className="relative bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {/* Title Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                            <Terminal size={12} />
                            <span>Terminal</span>
                        </div>
                        <div className="w-14" /> {/* Spacer for centering */}
                    </div>

                    {/* Terminal Content */}
                    <div className="p-4 font-mono text-sm min-h-[320px] max-h-[400px] overflow-hidden text-left">
                        {/* Previous Commands (History) */}
                        <AnimatePresence>
                            {commandHistory.map((cmd, idx) => (
                                <motion.div
                                    key={`history-${idx}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    className="mb-4"
                                >
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <span className="text-emerald-500">$</span>
                                        <span>{cmd.command}</span>
                                    </div>
                                    <div className="mt-1 ml-4 space-y-0.5">
                                        {cmd.output.map((line, lineIdx) => (
                                            <div key={lineIdx} className={`text-xs ${line.startsWith('✓') ? 'text-emerald-400' :
                                                line.startsWith('→') ? 'text-cyan-400' :
                                                    line.startsWith('◐') ? 'text-yellow-400' :
                                                        'text-slate-500'
                                                }`}>
                                                {line}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Current Command */}
                        {currentCommand && !isComplete && (
                            <div className="mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-500">$</span>
                                    <span className="text-white">{typedCommand}</span>
                                    {/* Blinking Cursor */}
                                    <motion.span
                                        animate={{ opacity: isTyping ? 1 : [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-2 h-4 bg-emerald-500"
                                    />
                                </div>

                                {/* Command Output */}
                                <AnimatePresence>
                                    {showOutput && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 ml-4 space-y-1"
                                        >
                                            {currentCommand.output.slice(0, visibleOutputLines).map((line, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`text-xs flex items-center gap-2 ${line.startsWith('✓') ? 'text-emerald-400' :
                                                        line.startsWith('→') ? 'text-cyan-400' :
                                                            line.startsWith('◐') ? 'text-yellow-400' :
                                                                line === '' ? '' :
                                                                    'text-slate-400'
                                                        }`}
                                                >
                                                    {line.startsWith('◐') && (
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        >
                                                            <Loader2 size={10} className="text-yellow-400" />
                                                        </motion.span>
                                                    )}
                                                    {line.startsWith('◐') ? line.slice(2) : line}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Completion State */}
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-4"
                            >
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="text-emerald-500">$</span>
                                    <span className="text-white">echo "Done!"</span>
                                </div>
                                <div className="mt-1 ml-4 space-y-0.5">
                                    <div className="text-xs text-emerald-400">✓ All commands completed successfully!</div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Bottom Gradient Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Caption */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center text-xs text-slate-500 mt-4"
            >
                Deploy your projects to your favourite providers using a unified CLI command
            </motion.p>
        </motion.div>
    )
}
