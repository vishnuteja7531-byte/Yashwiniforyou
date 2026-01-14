import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export interface CollageCardProps {
  icon: React.ReactNode;
  text: string;
  delay: number;
}

export interface ImageEditorState {
  image: string | null;
  prompt: string;
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
}