import { PrismaClient, ContentStatus, MenuLocation } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@applore.com' },
    update: {},
    create: {
      email: 'admin@applore.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create site settings
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteTitle: 'Applore',
      tagline: 'Explore the World of Technology',
      socialLinks: {
        twitter: 'https://twitter.com/applore',
        linkedin: 'https://linkedin.com/company/applore',
        github: 'https://github.com/applore',
      },
    },
  });
  console.log('✅ Site settings created');

  // Create homepage
  const homepage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      title: 'Home',
      slug: 'home',
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      content: [
        {
          id: 'hero-1',
          type: 'hero',
          order: 0,
          data: {
            heading: 'Welcome to Applore',
            subheading: 'Technology That Inspires',
            description:
              'Discover the latest in tech, innovation, and digital experiences. We build products that matter.',
            ctaText: 'Get Started',
            ctaLink: '/blog',
            secondaryCtaText: 'Learn More',
            secondaryCtaLink: '/about',
            align: 'center',
            overlay: true,
            overlayOpacity: 0.5,
          },
        },
        {
          id: 'cards-1',
          type: 'cards',
          order: 1,
          data: {
            heading: 'What We Do',
            cards: [
              {
                id: 'card-1',
                title: 'Web Development',
                description: 'We build scalable, modern web applications using cutting-edge technologies.',
                tag: 'Development',
              },
              {
                id: 'card-2',
                title: 'Mobile Apps',
                description: 'Cross-platform mobile apps that deliver exceptional user experiences.',
                tag: 'Mobile',
              },
              {
                id: 'card-3',
                title: 'Cloud Solutions',
                description: 'Cloud architecture and DevOps solutions to scale your business.',
                tag: 'Cloud',
              },
            ],
          },
        },
        {
          id: 'testimonials-1',
          type: 'testimonials',
          order: 2,
          data: {
            heading: 'What Our Clients Say',
            testimonials: [
              {
                id: 'testimonial-1',
                quote: 'Applore transformed our digital presence. Their team is exceptional and the results speak for themselves.',
                author: 'Sarah Johnson',
                role: 'CEO',
                company: 'TechCorp',
                rating: 5,
              },
              {
                id: 'testimonial-2',
                quote: 'Working with Applore was a game-changer. They delivered beyond our expectations.',
                author: 'Michael Chen',
                role: 'CTO',
                company: 'StartupXYZ',
                rating: 5,
              },
            ],
          },
        },
        {
          id: 'cta-1',
          type: 'cta',
          order: 3,
          data: {
            heading: 'Ready to Build Something Amazing?',
            description: 'Let\'s work together to bring your vision to life.',
            buttonText: 'Contact Us',
            buttonLink: '/contact',
            buttonVariant: 'primary',
          },
        },
      ],
      seo: {
        create: {
          metaTitle: 'Applore - Technology That Inspires',
          metaDescription:
            'Discover the latest in tech, innovation, and digital experiences. Applore builds products that matter.',
          ogTitle: 'Applore - Technology That Inspires',
          ogDescription: 'Discover the latest in tech, innovation, and digital experiences.',
          robots: 'index,follow',
        },
      },
    },
  });
  console.log('✅ Homepage created');

  // Create About page
  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      title: 'About Us',
      slug: 'about',
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      content: [
        {
          id: 'hero-about',
          type: 'hero',
          order: 0,
          data: {
            heading: 'About Applore',
            subheading: 'Our Story',
            description: 'We are a team of passionate technologists dedicated to building digital experiences that inspire.',
            align: 'center',
          },
        },
        {
          id: 'text-about',
          type: 'text',
          order: 1,
          data: {
            content: '<h2>Who We Are</h2><p>Applore is a technology company founded with a mission to make technology accessible and impactful. We specialize in web development, mobile applications, and cloud solutions.</p><p>Our team consists of experienced engineers, designers, and strategists who are passionate about creating digital products that solve real problems.</p>',
            align: 'left',
          },
        },
        {
          id: 'faq-about',
          type: 'faq',
          order: 2,
          data: {
            heading: 'Frequently Asked Questions',
            items: [
              {
                id: 'faq-1',
                question: 'What services does Applore offer?',
                answer: 'We offer web development, mobile app development, cloud solutions, and digital transformation consulting.',
              },
              {
                id: 'faq-2',
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on complexity. Most projects take between 4-16 weeks from kickoff to launch.',
              },
              {
                id: 'faq-3',
                question: 'Do you offer ongoing support?',
                answer: 'Yes, we offer maintenance and support packages to ensure your digital products continue to perform optimally.',
              },
            ],
          },
        },
      ],
      seo: {
        create: {
          metaTitle: 'About Us - Applore',
          metaDescription: 'Learn about Applore - a team of passionate technologists building digital experiences.',
          robots: 'index,follow',
        },
      },
    },
  });
  console.log('✅ About page created');

  // Create categories
  const techCategory = await prisma.category.upsert({
    where: { slug: 'technology' },
    update: {},
    create: {
      name: 'Technology',
      slug: 'technology',
      description: 'Latest in technology and innovation',
    },
  });

  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Tips and tutorials for web developers',
    },
  });
  console.log('✅ Categories created');

  // Create tags
  const nextjsTag = await prisma.tag.upsert({
    where: { slug: 'nextjs' },
    update: {},
    create: { name: 'Next.js', slug: 'nextjs' },
  });

  const reactTag = await prisma.tag.upsert({
    where: { slug: 'react' },
    update: {},
    create: { name: 'React', slug: 'react' },
  });

  const typescriptTag = await prisma.tag.upsert({
    where: { slug: 'typescript' },
    update: {},
    create: { name: 'TypeScript', slug: 'typescript' },
  });
  console.log('✅ Tags created');

  // Create sample blog post
  const samplePost = await prisma.post.upsert({
    where: { slug: 'building-modern-web-apps-with-nextjs-14' },
    update: {},
    create: {
      title: 'Building Modern Web Apps with Next.js 14',
      slug: 'building-modern-web-apps-with-nextjs-14',
      excerpt: 'Explore the powerful new features in Next.js 14 and how they can help you build faster, more scalable web applications.',
      content: `<h2>Introduction</h2>
<p>Next.js 14 brings a host of exciting new features that make building web applications faster and more enjoyable than ever before. In this article, we'll explore the key features and how to use them effectively.</p>

<h2>App Router</h2>
<p>The App Router is the new way to build applications in Next.js. It's built on React Server Components and provides a more intuitive file-based routing system.</p>

<pre><code>// app/page.tsx
export default function HomePage() {
  return (
    &lt;main&gt;
      &lt;h1&gt;Welcome to My App&lt;/h1&gt;
    &lt;/main&gt;
  );
}</code></pre>

<h2>Server Components</h2>
<p>React Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client. This improves performance significantly.</p>

<h2>Partial Prerendering</h2>
<p>Partial Prerendering is a new rendering model that combines static and dynamic rendering in a single route. This gives you the best of both worlds — fast initial loads with dynamic content.</p>

<h2>Conclusion</h2>
<p>Next.js 14 is a significant step forward for the React ecosystem. By leveraging these new features, you can build applications that are faster, more reliable, and easier to maintain.</p>`,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
      categories: {
        create: [
          { categoryId: webDevCategory.id },
          { categoryId: techCategory.id },
        ],
      },
      tags: {
        create: [
          { tagId: nextjsTag.id },
          { tagId: reactTag.id },
          { tagId: typescriptTag.id },
        ],
      },
      seo: {
        create: {
          metaTitle: 'Building Modern Web Apps with Next.js 14 - Applore',
          metaDescription: 'Explore the powerful new features in Next.js 14 and how they can help you build faster, more scalable web applications.',
          robots: 'index,follow',
        },
      },
    },
  });
  console.log('✅ Sample blog post created');

  // Create navigation menus
  const headerMenu = await prisma.menu.upsert({
    where: { id: 'header-menu' },
    update: {},
    create: {
      id: 'header-menu',
      name: 'Header Navigation',
      location: MenuLocation.HEADER,
      items: {
        create: [
          { label: 'Home', url: '/', order: 0 },
          { label: 'About', url: '/about', order: 1 },
          { label: 'Blog', url: '/blog', order: 2 },
          { label: 'Contact', url: '/contact', order: 3 },
        ],
      },
    },
  });

  const footerMenu = await prisma.menu.upsert({
    where: { id: 'footer-menu' },
    update: {},
    create: {
      id: 'footer-menu',
      name: 'Footer Navigation',
      location: MenuLocation.FOOTER,
      items: {
        create: [
          { label: 'Privacy Policy', url: '/privacy', order: 0 },
          { label: 'Terms of Service', url: '/terms', order: 1 },
          { label: 'Sitemap', url: '/sitemap.xml', order: 2 },
        ],
      },
    },
  });
  console.log('✅ Navigation menus created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
