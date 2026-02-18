/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

const avatars = [
  {
    src: "https://randomuser.me/api/portraits/men/6.jpg",
    alt: "@shadcn",
  },
  {
    src: "https://randomuser.me/api/portraits/men/8.jpg",
    alt: "@maxleiter",
  },
  {
    src: "https://randomuser.me/api/portraits/men/9.jpg",
    alt: "@evilrabbit",
  },
  {
    src: "https://randomuser.me/api/portraits/men/10.jpg",
    alt: "@evilrabbit",
  },
];

export function AvatarGroupCount() {
  return (
    <div className="flex -space-x-4 ">
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          className="relative inline-block h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-gray-900/5 dark:border-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.1,
            zIndex: 10,
            transition: { duration: 0.2 },
          }}
        >
          <img
            className="h-full w-full object-cover"
            src={avatar.src}
            alt={avatar.alt}
          />
        </motion.div>
      ))}
    </div>
  );
}
