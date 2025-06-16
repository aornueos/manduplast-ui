// src/components/PageWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  padding-top: 40px;
`;

export function PageWrapper({ children }) {
  return (
    <Wrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </Wrapper>
  );
}
