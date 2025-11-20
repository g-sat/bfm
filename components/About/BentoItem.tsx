"use client";
import React from 'react';
import { motion } from 'framer-motion';

// A simple utility to merge class names. You can replace this with `clsx` and `tailwind-merge` if you have them.
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface BentoItemProps {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BentoItem = ({
  className,
  children,
  title,
  description,
  header,
  icon,
}: BentoItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.6 }}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl md:p-6",
        className
      )}
    >
      {/* Subtle gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-slate-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {header}
        <div className="mt-auto flex flex-col">
          {icon}
          {title && <h3 className="mt-2 text-xl md:text-2xl font-semibold text-slate-900 leading-tight tracking-tight">{title}</h3>}
          {description && <p className="mt-1 text-sm md:text-base text-slate-600 leading-relaxed">{description}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
};
