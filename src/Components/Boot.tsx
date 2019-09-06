import React from 'react'
import { SessionCheck } from './Authentication';

export const Boot: React.FC = ({ children }) => {
  return <SessionCheck>{children}</SessionCheck>
}
