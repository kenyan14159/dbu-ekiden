"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] });

const records = [
    {
        event: "5000m",
        name: "大濱 逞真",
        time: "13:35.78",
        color: "from-daito-green"
    },
    {
        event: "10000m",
        name: "棟方 一楽",
        time: "28:19.82",
        color: "from-amber-500"
    },
    {
        event: "Half Marathon",
        name: "大濱 逞真",
        time: "1:01:08",
        color: "from-daito-orange"
    }
];

export default function TopRecords() {
    return (
        <section className="relative py-20 bg-neutral-900 overflow-hidden text-white">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black opacity-80" />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-daito-green/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-daito-orange/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <p className="text-daito-green font-bold tracking-[0.3em] text-sm mb-2 uppercase">UNIVERSITY</p>
                    <h2 className={cn("text-6xl md:text-8xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500", bebas.className)}>
                        RECORDS
                    </h2>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {records.map((record, index) => (
                        <motion.div
                            key={record.event}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="group relative"
                        >
                            {/* Card Background which glows on hover */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-3xl",
                                    record.color
                                )}
                            />

                            <div className="relative border-l-2 border-neutral-800 pl-8 transition-all duration-500 group-hover:border-daito-green py-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                                >
                                    <h3 className="text-sm font-medium text-neutral-400 mb-2 uppercase tracking-widest">
                                        {record.event}
                                    </h3>
                                    <div className={cn("text-5xl md:text-6xl text-white mb-4 tracking-tighter", bebas.className)}>
                                        {record.time}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-[1px] bg-neutral-700 group-hover:bg-daito-green transition-colors duration-500" />
                                        <p className="text-lg font-bold text-neutral-300 group-hover:text-white transition-colors duration-300">
                                            {record.name}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
