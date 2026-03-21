"use client";

import { CSSProperties, ReactNode, useState, useEffect } from "react";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { BackgroundGlobe } from "./BackgroundGlobe";
import ClientLogos from "./ClientLogos";

interface MergedShapeProps extends Omit<HTMLMotionProps<"div">, "style"> {
    fill?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const AboutGrid = ({ fill = "#0F0C1B", children, style: containerStyle, ...props }: MergedShapeProps) => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = time
        ? time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })
        : "--:-- --";

    // Reusable animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 },
        },
    };

    const innerShapeStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative" as const,
        overflow: "hidden",
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-0 overflow-hidden bg-[#05030f]">
            {/* Background ambient lighting to match Hero flow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] h-[70vh] w-[70vw] bg-[radial-gradient(circle_at_50%_50%,rgba(108,99,255,0.08),transparent_60%)] blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[60vh] w-[60vw] bg-[radial-gradient(circle_at_50%_50%,rgba(255,111,145,0.06),transparent_60%)] blur-[120px]" />
            </div>

            <BackgroundGlobe />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 px-4 xl:px-12">
                {/* Left side for Image (Children) */}
                <div className="w-full xl:w-[40%] flex items-center justify-center xl:justify-start z-20">
                    {children}
                </div>

                {/* Right side for Grid */}
                <div className="w-full xl:w-[60%] flex items-center justify-center xl:justify-end">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        style={{
                            position: "relative",
                            width: '100%',
                            maxWidth: 720,
                            height: 510,
                            transformOrigin: 'center center',
                            ...containerStyle,
                        }}
                        className="max-lg:scale-[0.85] max-md:scale-[0.7] max-sm:scale-[0.5] origin-center xl:origin-right"
                        {...props}
                    >
                {/* Shape 4 (Top Left) - ABOUT TITLE */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 210,
                        height: 190,
                        backgroundColor: fill,
                        borderRadius: "32px",
                    }}
                    className="group border border-white/[0.02] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div style={innerShapeStyle}>
                        <motion.h2 
                            className="text-4xl font-black italic tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-purple-500 transition-all duration-500"
                        >
                            ABOUT
                        </motion.h2>
                        <div className="w-8 h-1 bg-gradient-to-r from-red-600 to-purple-600 mt-4 group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                </motion.div>

                {/* Shape 2 (Top Middle) - AVAILABILITY / LIVE TIME */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 220,
                        top: 0,
                        width: 210,
                        height: 200,
                        backgroundColor: fill,
                        borderRadius: "32px 32px 0px 0px",
                    }}
                    className="group border border-white/[0.02]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] to-transparent rounded-[32px_32px_0_0] pointer-events-none" />
                    <div style={{ ...innerShapeStyle, padding: "1.5rem" }}>
                        <div className="flex items-center gap-3 mb-6 bg-white/[0.03] rounded-full px-3 py-1.5 w-fit border border-white/[0.05] backdrop-blur-md group-hover:border-purple-500/30 transition-colors duration-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                                Booking Now
                            </span>
                        </div>
                        <div className="mt-auto group-hover:translate-x-1 transition-transform duration-500">
                            <p className="text-[10px] text-purple-300/50 uppercase tracking-widest mb-1">Local Time</p>
                            <p className="text-[1.1rem] font-mono text-white/90 tabular-nums">{timeString}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Shape 5 (Top Right) - BULLET POINTS */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 440,
                        top: 0,
                        width: 280,
                        height: 190,
                        backgroundColor: fill,
                        borderRadius: "32px",
                    }}
                    className="group border border-white/[0.02] overflow-hidden"
                >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-600/10 rounded-full blur-[60px] group-hover:bg-purple-600/20 transition-all duration-700" />
                    <div style={innerShapeStyle} className="justify-center cursor-default">
                        <ul className="space-y-4">
                            {["Conceptualize.", "Execute.", "Captivate."].map(
                                (text, i) => (
                                    <motion.li 
                                        key={i} 
                                        className="flex items-center gap-4 text-white/60 text-sm group-hover:text-white/90 transition-colors"
                                        whileHover={{ x: 10 }}
                                    >
                                        <Sparkles className="w-4 h-4 shrink-0 text-red-500/80 group-hover:text-purple-400 transition-colors" />
                                        <span className="font-semibold tracking-wide uppercase text-xs">{text}</span>
                                    </motion.li>
                                )
                            )}
                        </ul>
                    </div>
                </motion.div>

                {/* Shape 1 (Bottom Left) - MAIN PARAGRAPH */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 200,
                        width: 260,
                        height: 310,
                        backgroundColor: fill,
                        borderRadius: "32px 0px 32px 32px",
                    }}
                    className="group border border-white/[0.02] overflow-hidden"
                >
                    <div style={{ ...innerShapeStyle, justifyContent: "flex-start", padding: "3rem 1.5rem 1.5rem 1.5rem" }}>
                        <div className="absolute -left-10 bottom-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700" />
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-red-500 transition-all duration-500">
                            Bold Frame Media.
                        </h3>
                        <p className="text-sm leading-relaxed text-white/60 font-light z-10">
                            We fuse striking visuals with strategic intent.<br/><br/>
                            From dynamic video production to immersive digital branding, we engineer media that demands attention.
                        </p>
                    </div>
                </motion.div>

                {/* Shape 6 (Bottom Middle) - CTA BUTTON */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 270,
                        top: 290,
                        width: 110,
                        height: 220,
                        backgroundColor: fill,
                        borderRadius: "32px 0px 32px 32px",
                    }}
                    className="cursor-pointer group flex"
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div style={{ ...innerShapeStyle, alignItems: "center", padding: "1rem", borderRadius: "32px 0 32px 32px" }} className="bg-gradient-to-t from-purple-900/[0.05] to-transparent hover:from-purple-900/[0.15] transition-all duration-500 border border-transparent group-hover:border-purple-500/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                        <span className="text-white/90 text-[10px] font-bold tracking-widest uppercase">Launch</span>
                    </div>
                </motion.div>

                {/* Shape 3 (Middle Right) - SECONDARY PARAGRAPH */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 380,
                        top: 200,
                        width: 240,
                        height: 130,
                        backgroundColor: fill,
                        borderRadius: "0px 32px 0px 0px",
                    }}
                    className="group border border-white/[0.02] overflow-hidden"
                >
                    <div style={innerShapeStyle}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
                        <p className="text-white/70 font-medium leading-relaxed text-sm group-hover:text-white/90 transition-colors">
                            <span className="text-purple-400 font-mono text-xs mr-2">01.</span> Intentional Design.<br />
                            <span className="text-red-500 font-mono text-xs mr-2">02.</span> Undeniable Impact.
                        </p>
                    </div>
                </motion.div>

                {/* Shape 7 (Bottom Right) - HIGHLIGHT */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 560,
                        top: 330,
                        width: 160,
                        height: 180,
                        backgroundColor: fill,
                        borderRadius: "0px 32px 32px 32px",
                    }}
                    className="group border border-white/[0.02] overflow-hidden"
                >
                    <div style={{ ...innerShapeStyle, padding: "1.2rem" }}>
                        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/[0.03] to-transparent pointer-events-none" />
                        
                        <motion.div 
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors duration-500"
                            whileHover={{ rotate: 180 }}
                        >
                            <Lock className="w-4 h-4 text-white/50 group-hover:text-purple-400 transition-colors duration-500" />
                        </motion.div>
                        
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 group-hover:text-purple-300/60 transition-colors">Vision</p>
                        <p className="text-xs font-semibold text-white/80 leading-snug group-hover:text-white transition-colors">
                            Unlock your brand&apos;s <br/> true potential.
                        </p>
                    </div>
                </motion.div>

                {/* Empty Area Content (Impact Statement in negative space) */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: "absolute",
                        left: 380,
                        top: 340,
                        width: 100,
                        height: 180,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                        textAlign: "center"
                    }}
                >
                    <motion.div 
                        className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] leading-loose cursor-default"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Create<br/><span className="text-purple-500/30">Destroy</span><br/>Rebuild
                    </motion.div>
                </motion.div>

                {/* Bridges Component */}
                <Bridge svgs={[
                    { left: 188, top: 168, path: "M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z", viewBox: "-32 0 32 32" },
                    { left: 260, top: 200, path: "M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z", viewBox: "0 -32 32 32" },
                    { left: 348, top: 200, path: "M 0 0 C 0 -23.872 -5.76 -32 -32 -32 H 0 Z", viewBox: "-32 -32 32 32" },
                    { left: 430, top: 168, path: "M 0 0 C 0 23.872 5.76 32 32 32 H 0 Z", viewBox: "0 0 32 32" },
                    { left: 348, top: 258, path: "M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z", viewBox: "-32 0 32 32" },
                    { left: 528, top: 330, path: "M 0 0 C 0 -23.872 -5.76 -32 -32 -32 H 0 Z", viewBox: "-32 -32 32 32" },
                    { left: 380, top: 330, path: "M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z", viewBox: "0 -32 32 32" },
                    { left: 620, top: 298, path: "M 0 0 C 0 23.872 5.76 32 32 32 H 0 Z", viewBox: "0 0 32 32" }
                ]} fill={fill} />
            </motion.div>
                </div>
            </div>

            <ClientLogos />
        </section>
    );
};

// Extracted Bridge to map out SVG gaps nicely
const Bridge = ({ svgs, fill }: { svgs: { left: number; top: number; path: string; viewBox: string }[], fill: string }) => (
    <>
        {svgs.map((svg, i) => (
            <svg
                key={i}
                style={{
                    position: "absolute",
                    left: svg.left,
                    top: svg.top,
                    width: 32,
                    height: 32,
                    pointerEvents: "none",
                    zIndex: 20
                }}
                viewBox={svg.viewBox}
            >
                <path d={svg.path} fill={fill} />
            </svg>
        ))}
    </>
);

export default AboutGrid;