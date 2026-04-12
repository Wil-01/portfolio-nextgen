import React from 'react';
import Hero    from './Home';
import About   from './About';
import Projects from './Projects';
import Resume  from './Resume';
import Contact from './Contact';

const MainPage: React.FC = () => (
  <>
    <Hero />
    <About />
    {/* section id injecté ici pour préserver le layout interne de Projects */}
    <section id="projets">
      <Projects />
    </section>
    <section id="parcours">
      <Resume />
    </section>
    <section id="contact">
      <Contact />
    </section>
  </>
);

export default MainPage;
