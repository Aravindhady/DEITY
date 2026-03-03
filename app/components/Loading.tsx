'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-deity-green">DEITY</h1>
        </motion.div>
        <motion.div
          className="flex justify-center gap-2"
          initial="hidden"
          animate="visible"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-deity-green rounded-full"
              variants={{
                hidden: { opacity: 0, y: 0 },
                visible: {
                  opacity: [0, 1, 0],
                  y: [0, -10, 0],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                  },
                },
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-deity-green rounded-full animate-spin`} />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-gray-200 border-t-deity-green rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
