import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Calendar, Users, Zap } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ProjectCarousel: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'MacroMate',
      subtitle: 'Cross-Platform AI Health & Fitness App',
      description: 'Cross-platform mobile application built with Flutter and Node.js backend, featuring AI-powered meal planning, workout tracking, and nutritional analysis.',
      longDescription: 'MacroMate is my final year project - a cross-platform mobile app built with Flutter for the frontend and Node.js for the backend. It combines machine learning with health technology, featuring personalized meal recommendations, workout tracking, calorie counting, and nutritional analysis using advanced AI algorithms.',
      image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Flutter', 'Node.js', 'AI/ML', 'MongoDB', 'Python', 'TensorFlow'],
      liveUrl: 'https://macromate-demo.netlify.app',
      githubUrl: 'https://github.com/mabdullahuzair/macromate',
      featured: true,
      category: 'Full-Stack',
      status: 'In Development',
      year: '2024',
      team: '4 members',
      highlights: ['AI Meal Planning', 'Workout Tracking', 'Nutritional Analysis', 'Progress Monitoring']
    },
    {
      id: 2,
      title: 'XRevStudio',
      subtitle: 'Creative Agency Portfolio',
      description: 'Modern, responsive portfolio website for a creative agency featuring stunning animations and interactive galleries.',
      longDescription: 'Assisted in building and maintaining XRevStudio.com with cross-browser and mobile compatibility in mind. Features advanced animations and interactive project showcases.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Tailwind CSS', 'Framer Motion', 'SEO', 'CMS'],
      liveUrl: 'https://xrevstudio.com',
      githubUrl: 'https://github.com/mabdullahuzair/xrevstudio',
      featured: false,
      category: 'Frontend',
      status: 'Completed',
      year: '2024',
      team: 'Solo',
      highlights: ['Stunning Animations', 'Interactive Gallery', 'SEO Optimized', 'Mobile First']
    },
    {
      id: 3,
      title: 'ObecheInterior',
      subtitle: 'Interior Design Landing Page',
      description: 'Elegant landing page for an interior design company with showcase galleries and service listings.',
      longDescription: 'Designed and developed ObecheInterior.com, a visually appealing landing page for an interior design company with elegant design showcases and service portfolios.',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
      liveUrl: 'https://obecheinterior.com',
      githubUrl: 'https://github.com/mabdullahuzair/obeche-interior',
      featured: false,
      category: 'Frontend',
      status: 'Completed',
      year: '2024',
      team: 'Solo',
      highlights: ['Elegant Design', 'Gallery Showcase', 'Contact Integration', 'Responsive Layout']
    },
    {
      id: 4,
      title: 'LevelUpSol',
      subtitle: 'Corporate Website',
      description: 'Professional WordPress corporate website with service showcases, team profiles, and content management system.',
      longDescription: 'Contributed to UI/UX enhancements and page optimization for the company website LevelUpSol.com.pk built on WordPress, featuring service showcases, team profiles, and integrated content management.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['WordPress', 'PHP', 'MySQL', 'jQuery', 'Bootstrap'],
      liveUrl: 'https://levelupsol.com.pk',
      githubUrl: 'https://github.com/mabdullahuzair/levelupsol',
      featured: false,
      category: 'Full-Stack',
      status: 'Completed',
      year: '2024',
      team: '2 members',
      highlights: ['Custom CMS', 'Team Profiles', 'Service Showcase', 'Client Portal']
    },
    {
      id: 5,
      title: 'CricketX',
      subtitle: 'Sports Platform Enhancement',
      description: 'Enhanced existing sports platform with responsive design improvements and performance optimization.',
      longDescription: 'Worked on the CricketX.net website, focusing on layout design and responsiveness with performance optimization across all devices.',
      image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Responsive Design', 'Performance Optimization', 'CSS3', 'JavaScript'],
      liveUrl: 'https://cricketx.net',
      githubUrl: 'https://github.com/mabdullahuzair/cricketx',
      featured: false,
      category: 'Frontend',
      status: 'Completed',
      year: '2023',
      team: 'Solo',
      highlights: ['Performance Boost', 'Mobile Optimization', 'UI Enhancement', 'Cross-browser Support']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              🚀
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
              Projects I've <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Built</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in full-stack development, modern web technologies, and creative problem-solving.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="project-swiper pb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-[600px] group"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.liveUrl}
                          className="p-3 bg-white rounded-full text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col h-[352px]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.year}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {project.title}
                    </h3>
                    <h4 className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">
                      {project.subtitle}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.team}
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-1" />
                        {project.highlights.length} features
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-auto">
                      <motion.a
                        href={project.liveUrl}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </motion.a>
                      
                      <motion.a
                        href={project.githubUrl}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Want to see more of my work or discuss a potential project?
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get In Touch
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .project-swiper .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.5;
        }
        .project-swiper .swiper-pagination-bullet-active {
          background: #8b5cf6;
          opacity: 1;
        }
        .project-swiper .swiper-button-next,
        .project-swiper .swiper-button-prev {
          color: #3b82f6;
          background: white;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .project-swiper .swiper-button-next:after,
        .project-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .dark .project-swiper .swiper-button-next,
        .dark .project-swiper .swiper-button-prev {
          background: #1f2937;
          color: #60a5fa;
        }
      `}</style>
    </section>
  );
};

export default ProjectCarousel;
