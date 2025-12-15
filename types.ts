import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}