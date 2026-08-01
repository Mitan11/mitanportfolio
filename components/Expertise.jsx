"use client";
import React, { useRef } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { useSelector } from 'react-redux';
import {
  ExpertiseSection,
  ExpertiseHeader,
  ExpertiseDesktopPath,
  ExpertiseMobilePath,
  ExpertiseCardsContainer,
  ExpertiseCard,
  ExpertiseEndText
} from '@/components/ui/expertise';

const Expertise = () => {
  const expertiseData = useSelector((state) => state.portfolio.expertise);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <ExpertiseSection containerRef={containerRef}>

      <ExpertiseHeader
        headerTitle={expertiseData.headerTitle}
        heading={expertiseData.heading}
        description={expertiseData.description}
      />

      <ExpertiseDesktopPath pathLength={pathLength} />

      <ExpertiseMobilePath pathLength={pathLength} />

      <ExpertiseCardsContainer>
        {expertiseData.cards.map((card, idx) => {
          // Pre-assigned positions/rotations for the first 4 cards
          const styles = [
            { className: "md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6", aosType: "fade-left", aosDelay: "100" },
            { className: "md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6", aosType: "fade-right", aosDelay: "200" },
            { className: "md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3", aosType: "fade-left", aosDelay: "300" },
            { className: "md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3", aosType: "fade-right", aosDelay: "400" },
          ];
          const style = styles[idx % styles.length];

          return (
            <ExpertiseCard
              key={idx}
              number={card.expertiseId || card.id}
              title={card.title}
              text={card.text}
              className={style.className}
              aosType={style.aosType}
              aosDelay={style.aosDelay}
            />
          );
        })}

        <ExpertiseEndText />
      </ExpertiseCardsContainer>

    </ExpertiseSection>
  );
};

export default Expertise;
