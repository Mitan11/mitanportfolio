"use client";
import React, { useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  ContactSection,
  ContactBackground,
  ContactContainer,
  ContactSidebar,
  ContactFormCard,
  ContactFormHeader
} from '@/components/ui/contact';

const Contact = () => {
  const contactData = useSelector((state) => state.portfolio.contact);
  const ref = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    region: '+91',
    phone: '',
    message: '',
    permission: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end","end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%","30%"]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) newErrors.firstName = "Only letters allowed";
    
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) newErrors.lastName = "Only letters allowed";
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email address";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Must be exactly 10 digits";
    
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Minimum 10 characters required";
    
    if (!formData.permission) newErrors.permission = "You must agree to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { id, value, type, checked } = e.target;
    if (id === 'phone') {
      value = value.replace(/\D/g, ''); 
    } else if (id === 'region') {
      value = value.replace(/[^\d+]/g, ''); 
    } else if (id === 'firstName' || id === 'lastName') {
      value = value.replace(/[^A-Za-z\s]/g, ''); 
    }

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
      payload.append("name", `${formData.firstName} ${formData.lastName}`);
      payload.append("email", formData.email);
      payload.append("phone", `${formData.region} ${formData.phone}`);
      payload.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`Thanks ${formData.firstName}! Your message was sent successfully.`);
        setFormData({ firstName: '', lastName: '', email: '', region: '+91', phone: '', message: '', permission: false });
        setErrors({});
      } else {
        throw new Error(data.error || data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form. (PII redacted)");
      toast.error("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection containerRef={ref}>
      
      <ContactBackground yTransform={y} heading={contactData.heading} />

      <ContactContainer>
        <ContactSidebar socials={contactData.socials} email={contactData.email} location={contactData.location} />
        <ContactFormCard>
          <ContactFormHeader formHeading={contactData.formHeading} />

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10 md:gap-14 w-full">
            <fieldset disabled={isSubmitting} className="flex flex-col gap-10 md:gap-14 w-full border-none p-0 m-0 disabled:opacity-60 transition-opacity duration-300">
              <div className="flex flex-col lg:flex-row gap-10 md:gap-14 w-full">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="relative flex-1 group">
                    <input 
                      type="text" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name" 
                      className={`w-full bg-white/[0.03] border ${errors.firstName ? 'border-red-500/50' : 'border-white/[0.05] group-hover:border-white/10'} rounded-2xl px-6 py-4 text-base md:text-lg focus:outline-none focus:border-[#2563eb]/50 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/30`}
                    />
                    {errors.firstName && <span className="absolute -bottom-6 left-2 text-xs text-red-400">{errors.firstName}</span>}
                  </div>
                  <div className="relative flex-1 group">
                    <input 
                      type="text" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name" 
                      className={`w-full bg-white/[0.03] border ${errors.lastName ? 'border-red-500/50' : 'border-white/[0.05] group-hover:border-white/10'} rounded-2xl px-6 py-4 text-base md:text-lg focus:outline-none focus:border-[#2563eb]/50 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/30`}
                    />
                    {errors.lastName && <span className="absolute -bottom-6 left-2 text-xs text-red-400">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/[0.05] group-hover:border-white/10'} rounded-2xl px-6 py-4 text-base md:text-lg focus:outline-none focus:border-[#2563eb]/50 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/30`}
                  />
                  {errors.email && <span className="absolute -bottom-6 left-2 text-xs text-red-400">{errors.email}</span>}
                </div>
                <div className="relative group flex gap-3">
                  <input 
                    type="text" 
                    id="region" 
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="+91" 
                    maxLength="5"
                    className="w-[80px] sm:w-[90px] bg-white/[0.03] border border-white/[0.05] group-hover:border-white/10 rounded-2xl px-3 py-4 text-center text-base md:text-lg focus:outline-none focus:border-[#2563eb]/50 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/30"
                  />
                  <div className="relative flex-1">
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Mobile No (10 digits)" 
                      maxLength="10"
                      className={`w-full bg-white/[0.03] border ${errors.phone ? 'border-red-500/50' : 'border-white/[0.05] hover:border-white/10'} rounded-2xl px-6 py-4 text-base md:text-lg focus:outline-none focus:border-[#2563eb]/50 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/30`}
                    />
                    {errors.phone && <span className="absolute -bottom-6 left-2 text-xs text-red-400">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col group">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..." 
                    className={`w-full h-full min-h-[160px] bg-white/[0.03] border ${errors.message ? 'border-red-500/50' : 'border-white/[0.05] group-hover:border-white/10'} rounded-3xl px-6 py-6 text-base md:text-lg focus:outline-none focus:border-[#2563eb]/50 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/30 resize-none`}
                  ></textarea>
                  {errors.message && <span className="absolute -bottom-6 left-4 text-xs text-red-400">{errors.message}</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mt-6 pt-10 border-t border-white/[0.05]">
              {/* Left text */}
              <div 
                className="flex-1 flex flex-col items-start gap-2 select-none"
              >
                <div 
                  className={`flex items-start gap-4 text-sm text-white/60 transition-colors ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer hover:text-white/80'}`}
                  onClick={() => {
                    if (isSubmitting) return;
                    setFormData(prev => ({ ...prev, permission: !prev.permission }));
                    if (errors.permission) setErrors(prev => ({ ...prev, permission: null }));
                  }}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all duration-300 ${errors.permission ? 'border-red-500 bg-red-500/10' : formData.permission ? 'bg-[#2563eb] border-[#2563eb]' : 'border-white/20 bg-white/5'}`}>
                    {formData.permission && (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                  <span className="max-w-[320px] leading-relaxed">
                    I agree to the processing of my personal data for the purpose of contact and project discussion.
                  </span>
                </div>
                {errors.permission && <span className="text-xs text-red-400 ml-10">{errors.permission}</span>}
              </div>

              {/* Right button */}
              <div className="flex-1 flex flex-col gap-8 justify-end">
                <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-6 h-full">
                  <button 
                    type="submit" 
                    className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#2563eb] to-blue-500 text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 group whitespace-nowrap self-start sm:self-auto overflow-hidden relative disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 disabled:hover:shadow-none disabled:hover:translate-y-0"
                  >
                    <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {!isSubmitting && (
                      <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                  </button>
                </div>
              </div>
            </div>
            </fieldset>
          </form>

        </ContactFormCard>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;