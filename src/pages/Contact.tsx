import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Send, CheckCircle2, AlertCircle, ArrowUpRight,
} from 'lucide-react';

/* ─── EmailJS credentials (Vite env vars) ────────────────────────────────── */
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

/* ─── Contact info ───────────────────────────────────────────────────────── */
const contactInfo = [
  {
    icon: <Mail size={17} />,
    label: 'Email',
    value: 'williamskoutongodonou@gmail.com',
    href:  'mailto:williamskoutongodonou@gmail.com',
  },
  {
    icon: <Phone size={17} />,
    label: 'Téléphone',
    value: '+33 7 59 55 90 53',
    href:  'tel:+33759559053',
  },
  {
    icon: <MapPin size={17} />,
    label: 'Localisation',
    value: 'Paris, Île-de-France',
    href:  null,
  },
];

const socials = [
  {
    label: 'GitHub',
    href:  'https://github.com/Wil-01',
    icon:  <Github size={18} />,
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/williams-kouton-godonou',
    icon:  <Linkedin size={18} />,
  },
];

/* ─── Input class helper ─────────────────────────────────────────────────── */
const inputCls =
  'w-full px-4 py-3 rounded-xl text-sm ' +
  'bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 ' +
  'text-dark/85 dark:text-light/85 ' +
  'border border-dark-border dark:border-dark-border border-light-border ' +
  'placeholder:text-dark/35 dark:placeholder:text-light/30 ' +
  'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 ' +
  'transition-all duration-200';

/* ─── Component ──────────────────────────────────────────────────────────── */
const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending,    setIsSending]    = useState(false);
  const [sendSuccess,  setSendSuccess]  = useState<boolean | null>(null);

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSending(true);
    setSendSuccess(null);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setSendSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setSendSuccess(null), 6000);
      })
      .catch(() => {
        setSendSuccess(false);
        setTimeout(() => setSendSuccess(null), 6000);
      })
      .finally(() => setIsSending(false));
  };

  const fadeUp = (delay = 0) => ({
    initial:  { opacity: 0, y: 24 },
    animate:  inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
  });

  return (
    <div className="py-28 px-6 relative">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl" ref={ref}>

        {/* ── Header ── */}
        <motion.div className="text-center mb-16" {...fadeUp(0)}>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-3">
            Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Travaillons <span className="text-gradient">ensemble</span>
          </h2>
          <p className="text-sm text-dark/55 dark:text-light/45 max-w-xl mx-auto leading-relaxed">
            Vous souhaitez échanger à propos de mon parcours, de mes projets ou d&rsquo;une opportunité ?
            N&rsquo;hésitez pas à me contacter, je réponds rapidement.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ─── Left — Info (2/5) ─── */}
          <motion.div className="lg:col-span-2 flex flex-col gap-6" {...fadeUp(0.1)}>

            {/* Bloc texte */}
            <div className="p-6 rounded-2xl bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border">
              <h3 className="text-base font-bold text-dark/90 dark:text-light/90 mb-3">
                Parlons de votre projet
              </h3>
              <p className="text-sm text-dark/60 dark:text-light/50 leading-relaxed">
                Développeur Web Full Stack en alternance chez Alfred Meeting, je suis ouvert aux
                échanges sur des projets web, des opportunités d&rsquo;alternance ou des collaborations.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/10 border border-primary/[0.15] flex items-center justify-center text-primary dark:text-primary-light shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-dark/35 dark:text-light/30 mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-dark/70 dark:text-light/60 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-dark/70 dark:text-light/60">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-dark/60 dark:text-light/50 bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border hover:border-primary/40 hover:text-primary dark:hover:text-primary-light transition-all duration-200 group"
                >
                  {s.icon}
                  {s.label}
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ─── Right — Form (3/5) ─── */}
          <motion.div className="lg:col-span-3" {...fadeUp(0.18)}>
            <div className="p-6 sm:p-8 rounded-2xl bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border">
              <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">

                {/* Row: name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_name" className="text-xs font-semibold text-dark/50 dark:text-light/40">
                      Nom <span className="text-primary">*</span>
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_email" className="text-xs font-semibold text-dark/50 dark:text-light/40">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      placeholder="votre@email.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-dark/50 dark:text-light/40">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Objet de votre message"
                    className={inputCls}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-dark/50 dark:text-light/40">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Votre message..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Feedback */}
                <AnimatePresence mode="wait">
                  {sendSuccess === true && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/[0.2] text-emerald-400 text-sm font-medium"
                    >
                      <CheckCircle2 size={16} className="shrink-0" />
                      Message envoyé avec succès ! Je vous répondrai rapidement.
                    </motion.div>
                  )}
                  {sendSuccess === false && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/[0.2] text-red-400 text-sm font-medium"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      Une erreur est survenue. Veuillez réessayer ou m&rsquo;écrire directement.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={isSending ? {} : { scale: 1.01 }}
                  whileTap={isSending ? {}  : { scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                >
                  {isSending ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
