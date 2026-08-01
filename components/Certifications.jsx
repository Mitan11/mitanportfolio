"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import {
  CertificationsSection,
  CertificationsHeader,
  CertificationsList,
  CertificationItem
} from '@/components/ui/certifications';

const Certifications = () => {
  const certsData = useSelector((state) => state.portfolio.certifications);

  return (
    <CertificationsSection>
      <CertificationsHeader 
        headerTitle={certsData.headerTitle}
        headingStart={certsData.headingStart}
        headingHighlight={certsData.headingHighlight}
        description={certsData.description}
      />
      
      <CertificationsList>
        {certsData.list.map((cert, idx) => (
          <CertificationItem 
            key={idx}
            idx={idx}
            title={cert.title}
            organization={cert.organization}
            description={cert.description}
          />
        ))}
      </CertificationsList>
    </CertificationsSection>
  );
};

export default Certifications;
