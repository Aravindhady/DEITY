'use client';

import { motion } from 'framer-motion';

export function BlogsSection() {
    const blogs = [
        {
            image: "https://api.builder.io/api/v1/image/assets/TEMP/845d9ec6dc8ed7ce7c26d679e7bcff838fe9568c?width=646",
            title: "BLOG POST 1"
        },
        {
            image: "https://api.builder.io/api/v1/image/assets/TEMP/b66a7f7e86d98cd39e8fb5e83912fd9f5f4e2224?width=646",
            title: "BLOG POST 2"
        },
        {
            image: "https://api.builder.io/api/v1/image/assets/TEMP/fbe47e47ab8fa99ec02b41a905515ed69259b5e7?width=646",
            title: "BLOG POST 3"
        },
        {
            image: "https://api.builder.io/api/v1/image/assets/TEMP/99c728a7feeca223329fb263b764503ac040bad8?width=646",
            title: "BLOG POST 4"
        }
    ];

    return (
        <section className="w-full bg-black py-8 md:py-12 lg:py-[100px] px-4 md:px-6 lg:px-[50px]">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 md:mb-12 lg:mb-[80px]"
            >
                <h2 className="text-white font-black text-[clamp(36px,6vw,120px)] leading-none uppercase">
                    BLOGS
                </h2>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {blogs.map((blog, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        {/* Photo Frame */}
                        <div className="bg-white p-2 md:p-3 shadow-lg mb-3 md:mb-4 transform group-hover:scale-105 transition-transform duration-300">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full aspect-[3/4] object-cover"
                            />
                        </div>
                        {/* Blog Title */}
                        <h3 className="text-white text-base md:text-lg font-semibold uppercase group-hover:text-deity-green transition-colors">
                            {blog.title}
                        </h3>
                    </motion.div>
                ))}
            </div>

            {/* Explore More */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 md:mt-12 lg:mt-[80px] text-center"
            >
                <a href="/blogs" className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase hover:text-deity-green transition-colors">
                    EXPLORE MORE BLOGS &gt;
                </a>
            </motion.div>
        </section>
    );
}

export default BlogsSection;
