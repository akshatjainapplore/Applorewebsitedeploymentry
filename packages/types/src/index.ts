// User & Auth
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Page
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: ContentBlock[];
  status: ContentStatus;
  seo?: SEOData;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Blog / Post
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: Author;
  authorId: string;
  categories: Category[];
  tags: Tag[];
  status: ContentStatus;
  seo?: SEOData;
  publishedAt?: Date;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';

// Content Blocks
export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'cta'
  | 'grid'
  | 'cards'
  | 'testimonials'
  | 'faq'
  | 'video'
  | 'divider';

export interface ContentBlock {
  id: string;
  type: BlockType;
  order: number;
  data: BlockData;
}

export interface HeroBlockData {
  heading: string;
  subheading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  align?: 'left' | 'center' | 'right';
}

export interface TextBlockData {
  content: string;
  align?: 'left' | 'center' | 'right';
}

export interface ImageBlockData {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
}

export interface CTABlockData {
  heading: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  backgroundColor?: string;
}

export interface GridBlockData {
  columns: number;
  items: GridItem[];
}

export interface GridItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
}

export interface CardsBlockData {
  heading?: string;
  cards: CardItem[];
  layout?: 'horizontal' | 'vertical';
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  tag?: string;
}

export interface TestimonialsBlockData {
  heading?: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export interface FAQBlockData {
  heading?: string;
  items: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type BlockData =
  | HeroBlockData
  | TextBlockData
  | ImageBlockData
  | CTABlockData
  | GridBlockData
  | CardsBlockData
  | TestimonialsBlockData
  | FAQBlockData
  | Record<string, unknown>;

// SEO
export interface SEOData {
  id?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  robots?: string;
  jsonLd?: string;
  slug?: string;
}

// Media
export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Navigation Menus
export interface Menu {
  id: string;
  name: string;
  location: MenuLocation;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type MenuLocation = 'HEADER' | 'FOOTER' | 'SIDEBAR';

export interface MenuItem {
  id: string;
  label: string;
  url?: string;
  pageId?: string;
  postId?: string;
  target?: '_blank' | '_self';
  order: number;
  parentId?: string;
  children?: MenuItem[];
}

// Settings
export interface SiteSettings {
  id: string;
  siteTitle: string;
  tagline?: string;
  logoUrl?: string;
  faviconUrl?: string;
  socialLinks: SocialLinks;
  analyticsId?: string;
  smtp?: SMTPSettings;
  updatedAt: Date;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
}

export interface SMTPSettings {
  host: string;
  port: number;
  user: string;
  secure: boolean;
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
}

// Query params
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PostQueryParams extends PaginationParams {
  status?: ContentStatus;
  categoryId?: string;
  tagId?: string;
  authorId?: string;
}
