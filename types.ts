import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'Creative' | 'Engine' | 'Growth' | 'Foundation';
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  image: string;
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string; // Static image
  gif: string;   // Hover GIF
}