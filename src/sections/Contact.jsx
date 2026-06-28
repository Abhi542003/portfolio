import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === 'true') {
      setShowToast(true);
      // Clean query parameters from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setShowToast(false), 7000);
    }
  }, []);

  const handleSubmit = (e) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: '' }));
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-10 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl floating-element"></div>
      <div className="absolute bottom-5 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl floating-element-slow"></div>

      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Get in <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Contact Info & Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-5/12 flex flex-col justify-between space-y-8"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Let's build something stable
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-body">
              Have a platform that needs comprehensive testing strategies? Need automated CI/CD checks or API stress-testing? Drop a line and let's collaborate on boosting your system stability.
            </p>

            {/* Direct Channels */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</h4>
                  <a href="mailto:rajpurohitabhijit543@gmail.com" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-purple-500 transition-colors">
                    rajpurohitabhijit543@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</h4>
                  <a href="tel:+919427671301" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-500 transition-colors">
                    +91 94276 71301
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</h4>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Palanpur, Gujarat
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Holographic Vector Illustration */}
          <div className="relative w-full aspect-video hidden lg:block overflow-hidden rounded-3xl glass-panel p-6 border border-slate-200 dark:border-slate-800/60 select-none">
            <svg viewBox="0 0 400 200" className="w-full h-full text-slate-300 dark:text-slate-800 fill-none stroke-current stroke-2 floating-element-slow">
              {/* Grid Background */}
              <defs>
                <pattern id="illustration-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#illustration-grid)" />
              
              {/* Nodes */}
              <circle cx="80" cy="100" r="15" className="stroke-purple-500 fill-purple-500/10" />
              <circle cx="200" cy="60" r="15" className="stroke-cyan-500 fill-cyan-500/10" />
              <circle cx="200" cy="140" r="15" className="stroke-emerald-500 fill-emerald-500/10" />
              <circle cx="320" cy="100" r="15" className="stroke-purple-500 fill-purple-500/10" />

              {/* Connecting Lines */}
              <path d="M 95 100 Q 140 70 185 62" className="stroke-slate-400 dark:stroke-slate-700 stroke-dasharray-[4]" />
              <path d="M 95 100 Q 140 130 185 138" className="stroke-slate-400 dark:stroke-slate-700 stroke-dasharray-[4]" />
              <path d="M 215 60 Q 260 70 305 98" className="stroke-slate-400 dark:stroke-slate-700" />
              <path d="M 215 140 Q 260 130 305 102" className="stroke-slate-400 dark:stroke-slate-700" />

              {/* Glowing animated signals */}
              <circle cx="140" cy="80" r="4" className="fill-cyan-400 animate-ping" />
              <circle cx="260" cy="120" r="4" className="fill-emerald-400 animate-ping" />

              {/* Inner Details */}
              <path d="M 75 97 L 79 101 L 86 94" className="stroke-purple-400" />
              <path d="M 194 57 L 199 62 L 206 55" className="stroke-cyan-400" />
              <path d="M 194 137 L 199 142 L 206 135" className="stroke-emerald-400" />
              <path d="M 314 97 L 318 101 L 325 94" className="stroke-purple-400" />
            </svg>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-7/12 glass-panel p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 glow-border"
        >
          <form
            action="https://formsubmit.co/rajpurohitabhijit543@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* FormSubmit Configurations */}
            <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/?submitted=true` : ''} />
            <input type="hidden" name="_subject" value={`📩 New Portfolio Contact Request: ${formData.subject}`} />
            <input
              type="hidden"
              name="_autoresponse"
              value={`Hello ${formData.name},\n\nThank you for contacting me through my portfolio website.\n\nI have successfully received your message and appreciate your interest.\n\nYour message has been added to my inbox, and I will review it carefully.\n\nI typically respond within 24–48 hours.\n\nIn the meantime, feel free to explore my portfolio and connect with me on LinkedIn.\n\nThank you once again for your time.\n\nBest Regards,\n\nAbhijit Rajpurohit\nQA Engineer\n📧 rajpurohitabhijit543@gmail.com\n\n---\nThis is an automated confirmation email. Please do not reply to this email.\n© 2026 Abhijit Rajpurohit. All Rights Reserved.`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-heading uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  } focus:border-purple-500 focus:outline-none text-slate-800 dark:text-slate-200 text-sm transition-all duration-300`}
                  placeholder="Alex Mercer"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <FiAlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-heading uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  } focus:border-purple-500 focus:outline-none text-slate-800 dark:text-slate-200 text-sm transition-all duration-300`}
                  placeholder="alex@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <FiAlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-heading uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border ${
                  errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                } focus:border-purple-500 focus:outline-none text-slate-800 dark:text-slate-200 text-sm transition-all duration-300`}
                placeholder="Automation Project Proposal"
              />
              {errors.subject && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <FiAlertCircle className="w-3 h-3" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-heading uppercase tracking-wider">
                Message Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border ${
                  errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                } focus:border-purple-500 focus:outline-none text-slate-800 dark:text-slate-200 text-sm transition-all duration-300`}
                placeholder="Describe your testing needs..."
              />
              {errors.message && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <FiAlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 mt-2 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl font-body">
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-95 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'glow-shadow-purple hover:scale-[1.01]'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send Message</span>
                  <FiSend className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Custom Glass Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-start space-x-3.5 py-5 px-6 rounded-2xl border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10 backdrop-blur-xl shadow-2xl max-w-sm"
          >
            <FiCheckCircle className="w-5.5 h-5.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Message Sent Successfully
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-400 mt-1 leading-normal font-body">
                Thank you for contacting me. A confirmation email has been sent to your email address. I will get back to you as soon as possible.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Contact;
