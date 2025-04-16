import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser'; // Importe la nouvelle bibliothèque
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Icônes

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null); // Type le formulaire
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null); // null | true | false

  // Remplace par tes vrais IDs EmailJS
  const SERVICE_ID = 'service_6o252wr'; // Ton Service ID
  const TEMPLATE_ID = 'template_nid9nka'; // Ton Template ID
  const PUBLIC_KEY = 'PCeU95ahKyzH6P_Uc'; // Ta clé publique (User ID)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return; // Vérification pour TypeScript

    setIsSending(true);
    setSendSuccess(null);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setSendSuccess(true);
          form.current?.reset(); // Réinitialise le formulaire
          setTimeout(() => setSendSuccess(null), 5000); // Cache le message après 5s
        },
        (error) => {
          setSendSuccess(false);
          console.error('EmailJS Error:', error.text);
          setTimeout(() => setSendSuccess(null), 5000); // Cache le message après 5s
        },
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  // Variants pour l'animation
   const sectionVariants = {
     hidden: { opacity: 0 },
     visible: { opacity: 1, transition: { staggerChildren: 0.3, duration: 0.5 } },
   };

   const itemVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
   };


  return (
    <motion.section
      className="min-h-screen container mx-auto px-6 py-24 flex items-center justify-center"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-6xl bg-light/10 dark:bg-dark-light/30 p-8 md:p-12 rounded-xl shadow-lg backdrop-blur-md border border-dark/10 dark:border-light/10 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Colonne Informations */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-primary">Contactez-moi</h2>
          <p className="mb-8 text-dark/80 dark:text-light/80 leading-relaxed">
            Une question, une proposition d'alternance ou simplement envie de discuter ?
            N'hésitez pas à m'envoyer un message !
          </p>
          <div className="space-y-4">
            <a href="mailto:amsktn01@gmail.com" className="flex items-center gap-3 group">
              <FaEnvelope className="text-primary text-xl group-hover:scale-110 transition-transform" />
              <span className="text-dark dark:text-light group-hover:text-primary transition-colors">amsktn01@gmail.com</span>
            </a>
            <a href="tel:+33759559053" className="flex items-center gap-3 group">
              <FaPhone className="text-primary text-xl group-hover:scale-110 transition-transform" />
              <span className="text-dark dark:text-light group-hover:text-primary transition-colors">+33 7 59 55 90 53</span>
            </a>
             <div className="flex items-center gap-3">
               <FaMapMarkerAlt className="text-primary text-xl" />
               <span className="text-dark dark:text-light">Vitry-sur-Seine, France</span>
             </div>
          </div>
          {/* Ajouter les liens vers les réseaux sociaux ici si souhaité */}
        </motion.div>

        {/* Colonne Formulaire */}
        <motion.div variants={itemVariants}>
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label htmlFor="user_name" className="sr-only">Nom</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-md bg-light dark:bg-dark-lighter border border-dark/20 dark:border-light/20 focus:border-primary focus:ring-primary focus:ring-opacity-50 transition duration-200 text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50"
              />
            </div>
            <div>
              <label htmlFor="user_email" className="sr-only">Email</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-md bg-light dark:bg-dark-lighter border border-dark/20 dark:border-light/20 focus:border-primary focus:ring-primary focus:ring-opacity-50 transition duration-200 text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Votre message..."
                className="w-full px-4 py-3 rounded-md bg-light dark:bg-dark-lighter border border-dark/20 dark:border-light/20 focus:border-primary focus:ring-primary focus:ring-opacity-50 transition duration-200 text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50"
              ></textarea>
            </div>

            {/* Affichage des messages de succès/erreur */}
            <AnimatePresence>
              {sendSuccess === true && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-green-600 dark:text-green-400 text-sm"
                >
                  Message envoyé avec succès !
                </motion.p>
              )}
              {sendSuccess === false && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-600 dark:text-red-400 text-sm"
                >
                  Erreur lors de l'envoi. Veuillez réessayer.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSending}
              className="w-full px-6 py-3 bg-primary text-white dark:text-dark rounded-lg font-semibold shadow-md hover:bg-primary/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSending ? 1 : 1.02 }}
              whileTap={{ scale: isSending ? 1 : 0.98 }}
            >
              {isSending ? 'Envoi en cours...' : 'Envoyer le Message'}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Contact;