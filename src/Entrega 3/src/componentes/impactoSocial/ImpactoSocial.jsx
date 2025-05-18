import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, GraduationCap, Lightbulb, UserCheck } from 'lucide-react';

const ImpactoSocial = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const stats = [
    {
      value: 30000,
      label: "Pessoas alcançadas",
      icon: <Users size={32} className="text-[#1CEBE5]" />,
    },
    {
      value: 2500,
      label: "Educadores desenvolvidos",
      icon: <UserCheck size={32} className="text-[#FF4464]" />,
    },
    {
      value: 20000,
      label: "Estudantes impactados",
      icon: <GraduationCap size={32} className="text-[#1CEBE5]" />,
    },
    {
      value: 100,
      label: "Projetos criativos",
      icon: <Lightbulb size={32} className="text-[#FF4464]" />,
    },
  ];

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      controls.start("visible");
    }
  }, [inView, controls, hasAnimated]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const Counter = ({ target, duration = 1 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let start = 0;
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [hasAnimated, target, duration]);

    return (
      <span className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
        {new Intl.NumberFormat('pt-BR').format(count)}+
      </span>
    );
  };

  return (
    <section
      ref={ref}
      id="impacto"
      className="relative my-20 py-20"
      style={{ backgroundColor: 'rgba(28, 235, 229, 0.1)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Transformando Vidas,{' '}
            <span className="bg-gradient-to-r from-[#FF4464] to-[#FF254A] bg-clip-text text-transparent">
              Criando Impacto
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Cada número representa uma história de transformação
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center"
          initial="hidden"
          animate={controls}
          variants={container}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md">
                {stat.icon}
              </div>
              <Counter target={stat.value} />
              <p className="text-sm font-medium text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactoSocial;
