import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Award, Edit3, Heart, ChevronRight, Share2 } from 'lucide-react';

const BlogCard = ({ blog }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 flex flex-col group hover:shadow-md transition-shadow cursor-pointer"
    >
        <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {blog.tag && <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded shadow-sm text-gray-800 font-semibold uppercase tracking-wide">{blog.tag}</div>}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight group-hover:text-brand-primary transition-colors">{blog.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{blog.summary}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-4 border-t border-gray-50">
                <div className="flex items-center space-x-2">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author}`} className="w-6 h-6 rounded-full bg-gray-100" />
                    <span className="font-medium text-gray-600">{blog.author}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="flex items-center hover:text-red-500 transition-colors cursor-pointer"><Heart className="w-3.5 h-3.5 mr-1" /> {blog.likes}</span>
                    <span className="flex items-center hover:text-blue-500 transition-colors cursor-pointer"><Share2 className="w-3.5 h-3.5 mr-1" /> Share</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const MOCK_BLOGS = [
    {
        id: 1,
        title: "From Debt to Prosperity: A Kishan Credit Card Success Story",
        summary: "Ramesh, a small farmer from Nashik, transformed his grape yield using timely credit and modern irrigation subsidies.",
        image: "https://images.unsplash.com/photo-1595248882068-152e03882793?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        author: "Ramesh P.",
        tag: "Agriculture",
        likes: 124
    },
    {
        id: 2,
        title: "Empowering Rural Women: Ujjwala Yojana's Impact",
        summary: "How clean cooking fuel changed the health and daily lives of 50 women in a remote Rajasthan village.",
        image: "https://images.unsplash.com/photo-1623194038165-839556094042?ixlib=rb-4.0.3&auto=format&fit=crop&w=1762&q=80",
        author: "Savita Devi",
        tag: "Women Welfare",
        likes: 89
    },
    {
        id: 3,
        title: "Build Your Dream Home: PMAY Success in Urban Slums",
        summary: "A family of four moves from a temporary shelter to a permanent concrete home thanks to government support.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1673&q=80",
        author: "Vinod K.",
        tag: "Housing",
        likes: 215
    }
];

const Blogs = ({ language }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md pb-24 px-4 pt-2"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Community Stories</h2>
                <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded cursor-pointer hover:bg-brand-primary hover:text-white transition-colors">View All</span>
            </div>

            <div className="space-y-6">
                {MOCK_BLOGS.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {/* Featured Highlight */}
            <div className="mt-8 bg-gradient-to-r from-brand-secondary to-green-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-10 -translate-y-10" />
                <div className="relative z-10">
                    <span className="bg-white/20 text-xs px-2 py-1 rounded backdrop-blur-sm mb-2 inline-block">Featured</span>
                    <h3 className="font-bold text-xl mb-2">Share Your Story</h3>
                    <p className="text-sm opacity-90 mb-4">Have you benefited from a scheme? Inspire others.</p>
                    <button className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-gray-100 transition-colors flex items-center">
                        Write Post <Edit3 className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

        </motion.div>
    );
};

export default Blogs;
