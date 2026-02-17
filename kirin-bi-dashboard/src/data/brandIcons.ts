import { Shield, Coffee, Leaf } from 'lucide-react';
import type { ElementType } from 'react';

export interface BrandIconConfig {
  icon: ElementType;
  color: string;
}

export const brandIconMap: Record<string, BrandIconConfig> = {
  'プラズマ乳酸菌': { icon: Shield, color: '#7B1FA2' },
  'iMUSE': { icon: Shield, color: '#7B1FA2' },
  '午後の紅茶': { icon: Coffee, color: '#DC0000' },
  '生茶': { icon: Leaf, color: '#2E7D32' },
};
