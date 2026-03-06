import { ReactNativePhoneMockup } from './components/ReactNativePhoneMockup';
import { ReactNativeEcommerceScreen } from './components/ReactNativeEcommerceScreen';
import { ReactNativeFoodScreen } from './components/ReactNativeFoodScreen';
import { ReactNativeFitnessScreen } from './components/ReactNativeFitnessScreen';
import { Smartphone, Code2, Layers, Zap, Star, Github, ExternalLink, Mail, Phone, MapPin, Linkedin, Globe, Monitor, Palette, Server, Award, TrendingUp, Users } from 'lucide-react';
import profileImage from './assets/passport photograph.jpg';
import mealketImage from './assets/mealket.png';
import eduoverseasImage from './assets/eduoverseas.png';
import nearbyLaundryImage from './assets/nearby_laundry.jpg';
import { useRef, useState } from 'react';

type Page = 'About' | 'Resume' | 'Portfolio' | 'Blog' | 'Contact';
type PortfolioCategory = 'Applications' | 'Web Development';
type PortfolioFilter = 'All' | PortfolioCategory;

type PortfolioProject = {
  title: string;
  category: PortfolioCategory;
  href?: string;
  ctaLabel?: string;
  image?: string;
  imageClassName?: string;
  badge: string;
  bg: string;
  badgeClass: string;
  summary?: string;
  highlights?: string[];
  featured?: boolean;
  featuredOrder?: number;
  snapshot?: Array<{
    label: string;
    value: string;
  }>;
  demoCredentials?: {
    email: string;
    password: string;
  };
};

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePage, setActivePage] = useState<Page>('About');
  const [portfolioFilter, setPortfolioFilter] = useState<PortfolioFilter>('All');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const navItems: Array<Page> = [
    'About',
    'Resume',
    'Portfolio',
    'Blog',
    'Contact'
  ];

  const portfolioFilters: Array<PortfolioFilter> = [
    'All',
    'Applications',
    'Web Development'
  ];

  const portfolioProjects: PortfolioProject[] = [
    {
      title: 'Mealket App',
      category: 'Applications',
      href: 'https://play.google.com/store/apps/details?id=com.niconnected.mealket&hl=en',
      ctaLabel: 'View on Google Play',
      image: mealketImage,
      imageClassName: 'h-full w-full object-contain p-5',
      badge: 'MEALKET',
      bg: 'from-[#0d1824] via-[#11283d] to-[#1350b8]',
      badgeClass: 'text-emerald-700',
      summary: 'Workplace meal voucher platform for staff and vendors, built as a polished mobile product and published on Google Play.',
      highlights: ['Flutter app', 'Google Play release', 'Staff + vendor workflow'],
      featured: true,
      featuredOrder: 1,
      snapshot: [
        { label: 'Platform', value: 'Android / Flutter' },
        { label: 'Product', value: 'Meal voucher platform' },
        { label: 'Users', value: 'Staff and vendors' }
      ]
    },
    {
      title: 'EduOverseas Consult',
      category: 'Web Development',
      href: 'https://eduoverseasconsult.com/',
      ctaLabel: 'View Live Site',
      image: eduoverseasImage,
      imageClassName: 'h-full w-full object-cover object-top',
      badge: 'EDU',
      bg: 'from-[#0b0b0b] via-[#171717] to-[#252525]',
      badgeClass: 'text-white',
      summary: 'Responsive consultancy website for international student placement, built to present destinations, admissions support, and a clear inquiry path.',
      highlights: ['Responsive website', 'Service-led landing page', 'Inquiry focused'],
      featured: true,
      featuredOrder: 2,
      snapshot: [
        { label: 'Client', value: 'EduOverseas Consult' },
        { label: 'Focus', value: 'Trust, clarity, lead capture' },
        { label: 'Type', value: 'Marketing website' }
      ]
    },
    {
      title: 'Nearby Laundry',
      category: 'Applications',
      href: 'https://nearbylaundry-cb646.web.app/',
      ctaLabel: 'Open Live Demo',
      image: nearbyLaundryImage,
      imageClassName: 'h-full w-full object-cover object-top',
      badge: 'LAUNDRY',
      bg: 'from-[#11294a] via-[#173d67] to-[#1d548c]',
      badgeClass: 'text-white',
      summary: 'Laundry service mobile app experience with account access, sign-in flow, and a live hosted demo recruiters can test.',
      highlights: ['Flutter app', 'Hosted demo', 'Authentication flow'],
      demoCredentials: {
        email: 'nike@gmail.com',
        password: '123456'
      }
    }
  ];

  const filteredProjects =
    portfolioFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === portfolioFilter);
  const portfolioFilterCounts: Record<PortfolioFilter, number> = {
    All: portfolioProjects.length,
    Applications: portfolioProjects.filter((project) => project.category === 'Applications').length,
    'Web Development': portfolioProjects.filter((project) => project.category === 'Web Development').length
  };
  const featuredProject = [...filteredProjects]
    .filter((project) => project.featured)
    .sort((left, right) => (left.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (right.featuredOrder ?? Number.MAX_SAFE_INTEGER))[0];
  const gridProjects = filteredProjects.filter((project) => project !== featuredProject);
  const resumeDownloadHref = '/Oseghale-Nicholas-Flutter-Dev-CV.pdf';
  const resumeSummary =
    'Flutter / mobile developer with hands-on experience building user-centered applications, integrating APIs, improving performance, and shipping practical products for real business use cases.';
  const resumeHighlights = [
    {
      label: 'Primary Stack',
      value: 'Flutter, Dart, Firebase',
      icon: <Code2 className="h-5 w-5 text-yellow-300" />
    },
    {
      label: 'Delivery Focus',
      value: 'Cross-platform apps, UI, APIs',
      icon: <Layers className="h-5 w-5 text-yellow-300" />
    },
    {
      label: 'Project Style',
      value: 'Freelance and product delivery',
      icon: <Zap className="h-5 w-5 text-yellow-300" />
    }
  ];
  const resumeSkills = [
    'Flutter',
    'Dart programming',
    'State management (Provider, Riverpod)',
    'Cross-platform mobile development',
    'API integration and RESTful services',
    'Firebase',
    'SQLite and local storage',
    'UI/UX design principles',
    'Git / GitHub',
    'Performance optimization',
    'Geolocation and geofencing'
  ];
  const resumeExperience = [
    {
      role: 'Flutter Developer',
      company: 'Freelance / Project-based',
      period: '2022 - 2026',
      context: 'Project work referenced in the CV includes Gravitas and Mealket.',
      points: [
        'Developed and maintained cross-platform mobile applications using Flutter and Dart.',
        'Collaborated with designers and product teams to turn requirements into scalable features.',
        'Built responsive interfaces aligned with product and design guidelines.',
        'Integrated backend services, Firebase, REST APIs, and third-party libraries.',
        'Handled debugging, performance optimization, and responsiveness tuning.',
        'Implemented geolocation and geofencing for secure, context-aware app features.',
        'Provided updates, support, and improvements for deployed applications.'
      ]
    }
  ];
  const resumeProjects = [
    {
      title: 'Mealket - Staff Meal Ticket App',
      description: 'Flutter-based application that automates an organization cafeteria meal ticket system.',
      bullets: [
        'Implemented geofencing to restrict app functionality to organization premises.',
        'Enabled employee meal ticket payments and daily usage tracking.',
        'Designed the flow for secure, location-based operations.'
      ]
    },
    {
      title: 'Monogram Pro',
      description: 'Workflow tool for monogram designers focused on faster service delivery.',
      bullets: [
        'Captured design, material, and customer information in one flow.',
        'Logged services and tracked orders more effectively.',
        'Reduced manual process overhead for production work.'
      ]
    },
    {
      title: 'Nearby Laundry',
      description: 'Mobile app connecting users with nearby laundry services.',
      bullets: [
        'Implemented location-based search for available laundry shops.',
        'Integrated order placement, service details, and contact options.',
        'Designed a clean, intuitive UI to simplify service discovery.'
      ]
    }
  ];
  const resumeEducation = [
    {
      school: 'Pristine School of Management, UK',
      award: 'Post Graduate Diploma, Strategic Leadership and Management',
      period: 'September 2018 - March 2021'
    }
  ];
  const resumeCertifications = [
    {
      title: 'Google IT Support Certification',
      issuer: 'Google / Coursera'
    }
  ];

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get('fullName') ?? '');
    const email = String(formData.get('email') ?? '');
    const subject = String(formData.get('subject') ?? 'Portfolio Contact');
    const message = String(formData.get('message') ?? '');
    const company = String(formData.get('company') ?? '');

    setIsSubmittingContact(true);
    setContactFeedback({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          email,
          subject,
          message,
          company
        })
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to send your message right now.');
      }

      setContactFeedback({
        type: 'success',
        message: result?.message || 'Message sent successfully.'
      });
      form.reset();
    } catch (error) {
      setContactFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? `${error.message} You can also email oseghale5432@gmail.com directly.`
            : 'Unable to send your message right now. You can also email oseghale5432@gmail.com directly.'
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const skills = [
    {
      name: 'Dart',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <defs>
            <linearGradient id="dart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00D2B8' }} />
              <stop offset="100%" style={{ stopColor: '#55DDCA' }} />
            </linearGradient>
          </defs>
          <path fill="url(#dart-gradient)" d="M8.95 108.96l-5.57 5.57c-1.75 1.75-2.71 4.09-2.69 6.52l.07 5.04c.01 1.07.88 1.93 1.95 1.93h5.04c2.43.02 4.77-.94 6.52-2.69l5.57-5.57-11.06-11.07.17.27z"/>
          <path fill="url(#dart-gradient)" d="M8.95 108.96l92.25-92.25L119.6 35.1l-92.25 92.25z"/>
          <path fill="url(#dart-gradient)" d="M23.12 23.12L101.2 1.67c1.88-.52 3.87.45 4.72 2.23l18.39 18.39c1.78.85 2.75 2.84 2.23 4.72l-21.45 78.08-81.97-81.97z"/>
          <path fill="#00D2B8" d="M23.12 23.12l78.08 78.08c-5.89 5.89-15.44 5.89-21.33 0l-56.75-56.75c-5.89-5.89-5.89-15.44 0-21.33z" opacity=".4"/>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    },
    {
      name: 'Flutter',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <defs>
            <linearGradient id="flutter-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#47C5FB' }} />
              <stop offset="100%" style={{ stopColor: '#00A4DB' }} />
            </linearGradient>
            <linearGradient id="flutter-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#00559A' }} />
              <stop offset="100%" style={{ stopColor: '#007FC1' }} />
            </linearGradient>
          </defs>
          <path fill="url(#flutter-gradient-1)" d="M12.3 72.1L39.9 44.5l47.9 47.9-27.6 27.6L12.3 72.1z"/>
          <path fill="url(#flutter-gradient-2)" d="M39.9 44.5L87.8 92.4l27.6-27.6L67.5 16.9 39.9 44.5z"/>
          <path fill="#00D2B8" d="M67.5 92.4l20.3-20.3 27.6 27.6-20.3 20.3L67.5 92.4z" opacity=".7"/>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    },
    {
      name: 'Firebase',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <defs>
            <linearGradient id="firebase-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFD900' }} />
              <stop offset="100%" style={{ stopColor: '#FFA000' }} />
            </linearGradient>
          </defs>
          <path fill="#FFA000" d="M27.35 80.52l10.68-68.44c.37-2.33 3.5-2.89 4.6-.8l11.48 21.48-26.76 47.76z"/>
          <path fill="#F57C00" d="M27.35 80.52l-11.97-7.31c-1.65-1.01-1.65-3.47 0-4.48l88.97-54.37-19.57 19.57-57.43 46.59z"/>
          <path fill="url(#firebase-gradient)" d="M75.78 34.43L64.3 12.95c-1.1-2.09-4.11-2.09-5.21 0L27.35 80.52l36.64 22.36c1.43.87 3.21.87 4.64 0l36.64-22.36-29.49-46.09z"/>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    },
    {
      name: 'Figma',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <path fill="#0ACF83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129z"/>
          <path fill="#A259FF" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5z"/>
          <path fill="#F24E1E" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5z"/>
          <path fill="#FF7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67V0z"/>
          <path fill="#1ABCFE" d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5z"/>
        </svg>
      ),
      bgColor: 'from-[#FF6B35] to-[#E8563A]'
    },
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <g fill="#61DAFB">
            <circle cx="64" cy="64" r="11.4"/>
            <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2.1-2.4-4.2-3.6-6.2 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6zm25.7 11.9c-7.7 3.4-15.2 5.2-20.6 6.2 2.3-3.7 4.3-7.7 5.9-11.9 1.5-4.1 2.8-8.4 3.9-12.9 2.4.7 4.6 1.4 6.8 2.3 10.2 3.9 15.9 9.2 15.9 13.3 0 4.1-5.7 9.4-15.9 13.3-.1 0-1.8-.7-1.8-.7zm-4.3 30.1c-1.7 10.5-3.2 18-7.3 20.4-1 .6-2.2.9-3.5.9-6.1 0-13.6-5-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zM116 92.4c-2.1-.8-4.4-1.5-6.8-2.3-1.1-4.4-2.4-8.7-3.9-12.9-1.6-4.2-3.6-8.1-5.9-11.9 5.4 1 12.9 2.8 20.6 6.2 10.1 3.9 15.9 9.2 15.9 13.3 0 4.1-5.7 9.4-15.9 13.3zM35.5 113.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM12.3 85.6c-7.7-3.4-15.9-8.7-15.9-13.3 0-4.1 5.7-9.4 15.9-13.3 2.1-.8 4.4-1.5 6.8-2.3 1.1 4.4 2.4 8.7 3.9 12.9 1.6 4.2 3.6 8.1 5.9 11.9-5.4-1-12.9-2.8-20.6-6.2z"/>
          </g>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    },
    {
      name: 'JavaScript',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <path fill="#F7DF1E" d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-10.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"/>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    },
    {
      name: 'Git',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <path fill="#F05032" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    },
    {
      name: 'Node.js',
      icon: (
        <svg viewBox="0 0 128 128" className="w-24 h-24">
          <path fill="#83CD29" d="M112.678 30.334L68.535 4.729c-2.781-1.584-6.424-1.584-9.227 0L14.82 30.334C11.951 31.985 10 35.088 10 38.407v51.142c0 3.319 1.951 6.423 4.82 8.073l11.898 6.84c6.45 3.228 8.773 3.228 11.755 3.228 9.628 0 15.134-5.839 15.134-15.962V38.407c0-.609-.547-1.072-1.141-1.072h-5.034c-.594 0-1.142.463-1.142 1.072v53.321c0 4.174-4.33 8.349-11.386 4.817l-12.375-7.13a1.298 1.298 0 01-.547-.985V38.407c0-.438.273-.84.547-1.072l43.914-25.605a1.391 1.391 0 011.094 0l43.913 25.605c.328.232.547.634.547 1.072v51.142c0 .438-.219.84-.547 1.072L68.535 119.3c-.328.232-.766.232-1.094 0l-11.755-6.84c-.328-.232-.875-.328-1.203-.109-3.422 1.947-4.047 2.179-7.195 3.228-.766.328-1.969.766.328 1.947l15.134 8.959c1.422.766 3.047 1.182 4.672 1.182 1.625 0 3.25-.416 4.672-1.182l43.913-25.605c2.869-1.65 4.82-4.754 4.82-8.073V38.407c0-3.319-1.951-6.423-4.82-8.073zM97.8 77.79c0 10.29-6.997 13.009-21.641 13.009-4.11 0-8.219-.328-11.755-1.072-1.422-.328-1.969-1.072-1.969-2.394V38.407c0-.609.547-1.072 1.141-1.072h5.034c.594 0 1.142.463 1.142 1.072v48.846c0 1.947.547 2.394 2.297 2.394h9.519c9.191 0 14.226-2.394 14.226-11.755V38.407c0-.609.547-1.072 1.141-1.072h5.034c.594 0 1.142.463 1.142 1.072V77.79z"/>
        </svg>
      ),
      bgColor: 'from-[#263238] to-[#1a2327]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8 max-w-[1400px] mx-auto">
        {/* Sidebar Profile Card */}
        <aside className="lg:w-[320px] flex-shrink-0">
          <div className="bg-[#1e1e1f] rounded-3xl p-8 border border-gray-800/50 sticky top-8">
            {/* Profile Image */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-900/30 to-orange-900/30 p-1">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full rounded-3xl object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-4 border-[#1e1e1f]"></div>
            </div>

            {/* Name & Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl text-white mb-2">OSEGHALE NICHOLAS</h1>
              <div className="inline-block px-4 py-1 bg-[#2b2b2c] rounded-lg">
                <span className="text-gray-300 text-sm">Flutter / Mobile Developer</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-[#2b2b2c] rounded-2xl border border-gray-800/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs mb-1">EMAIL</p>
                  <p className="text-gray-300 text-sm truncate">oseghale5432@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#2b2b2c] rounded-2xl border border-gray-800/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs mb-1">PHONE</p>
                  <p className="text-gray-300 text-sm">+234 9057615269</p>
                </div>
              </div>

                  <div className="flex items-start gap-4 p-4 bg-[#2b2b2c] rounded-2xl border border-gray-800/30">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-500 text-xs mb-1">LOCATION</p>
                      <p className="text-gray-300 text-sm">Ajah, Lekki, Lagos, Nigeria</p>
                    </div>
                  </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3">
              <button className="w-12 h-12 rounded-xl bg-[#2b2b2c] hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-orange-500/20 flex items-center justify-center transition-all duration-300 border border-gray-800/30">
                <Linkedin className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-12 h-12 rounded-xl bg-[#2b2b2c] hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-orange-500/20 flex items-center justify-center transition-all duration-300 border border-gray-800/30">
                <Github className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-12 h-12 rounded-xl bg-[#2b2b2c] hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-orange-500/20 flex items-center justify-center transition-all duration-300 border border-gray-800/30">
                <Globe className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-[#1e1e1f] rounded-3xl border border-gray-800/50">
            {/* Navigation */}
            <nav className="flex items-center gap-2 px-6 py-4 border-b border-gray-800/50 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActivePage(item)}
                  className={`px-6 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activePage === item
                      ? 'text-white bg-gradient-to-r from-purple-600 to-orange-600'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Content Area */}
            <div className="p-6 lg:p-12">
              {activePage === 'About' && (
                <>
                  {/* About Me Section */}
                  <section className="mb-16">
                    <h2 className="text-3xl text-white mb-6 flex items-center">
                      About Me
                      <div className="ml-4 h-[3px] w-12 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"></div>
                    </h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                      <p>
                        A passionate Flutter developer with strong expertise in cross-platform apps, REST APIs, UI/UX, widgets, and state 
                        management solutions. Proven track record in delivering cutting-edge solutions, including API integration, third-party libraries, 
                        and performance optimization. Adept at debugging to ensure high-quality, responsive apps and an agile collaborator 
                        committed to staying current with industry trends.
                      </p>
                      <p>
                        If you're seeking a skilled Flutter developer to breathe life into your project and exceed your expectations, I am here to 
                        collaborate and create magic together. Reach out, and let's transform your vision into a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">reality!</span>
                      </p>
                    </div>
                  </section>

                  {/* What I'm Doing Section */}
                  <section className="mb-16">
                    <h2 className="text-3xl text-white mb-8 flex items-center">
                      What I'm Doing
                      <div className="ml-4 h-[3px] w-12 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"></div>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-[#2b2b2c] rounded-2xl border border-gray-800/30 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <Smartphone className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-white text-lg mb-2">Mobile Apps</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              Professional development of applications for Android and iOS.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-[#2b2b2c] rounded-2xl border border-gray-800/30 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <Monitor className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-white text-lg mb-2">Web Development</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              High-quality development of sites at the professional level.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-[#2b2b2c] rounded-2xl border border-gray-800/30 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <Palette className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-white text-lg mb-2">UI/UX Design</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              The most modern and high-quality design made at a professional level.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-[#2b2b2c] rounded-2xl border border-gray-800/30 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <Server className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-white text-lg mb-2">Backend Development</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              High-performance backend services designed for scalability and seamless user experience.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Skills Section */}
                  <section className="mb-16">
                    <h2 className="text-3xl text-white mb-8 flex items-center">
                      Skills
                      <div className="ml-4 h-[3px] w-12 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full"></div>
                    </h2>
                    
                    {/* Horizontal Scrollable Skills */}
                    <div 
                      ref={scrollContainerRef}
                      onScroll={handleScroll}
                      className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {skills.map((skill, idx) => (
                        <div 
                          key={idx} 
                          className="flex-shrink-0 w-48 h-48 snap-center"
                        >
                          <div className={`w-full h-full bg-gradient-to-br ${skill.bgColor} rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                            {skill.icon}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-2 mt-8 max-w-md">
                      <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(scrollProgress + 20, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </section>

                  {/* Stats Section */}
                  <section>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-2xl border border-purple-500/20 text-center">
                        <Award className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                        <h3 className="text-3xl text-white mb-1">4+</h3>
                        <p className="text-gray-400 text-sm">Years Experience</p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-2xl border border-purple-500/20 text-center">
                        <TrendingUp className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                        <h3 className="text-3xl text-white mb-1">10+</h3>
                        <p className="text-gray-400 text-sm">Projects Completed</p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-2xl border border-purple-500/20 text-center">
                        <Users className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                        <h3 className="text-3xl text-white mb-1">3+</h3>
                        <p className="text-gray-400 text-sm">Happy Clients</p>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activePage === 'Portfolio' && (
                <section>
                  <header className="flex items-center gap-4">
                    <h2 className="text-3xl text-white">Portfolio</h2>
                    <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  </header>

                  <div className="mt-6 flex flex-wrap gap-6">
                    {portfolioFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setPortfolioFilter(filter)}
                        className={`flex items-center gap-2 border-b-2 pb-2 text-sm transition ${
                          portfolioFilter === filter
                            ? 'border-yellow-400 text-yellow-300'
                            : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                      >
                        <span>{filter}</span>
                        <span
                          className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            portfolioFilter === filter
                              ? 'bg-yellow-400/15 text-yellow-200'
                              : 'bg-white/5 text-gray-300'
                          }`}
                        >
                          {portfolioFilterCounts[filter]}
                        </span>
                      </button>
                    ))}
                  </div>

                  {featuredProject && (
                    <article className="mt-8 overflow-hidden rounded-3xl border border-yellow-400/20 bg-[#202024]">
                      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                        <div className={`relative min-h-[320px] bg-gradient-to-br ${featuredProject.bg}`}>
                          {featuredProject.image && (
                            <>
                              <img
                                src={featuredProject.image}
                                alt={featuredProject.title}
                                className={featuredProject.imageClassName ?? 'h-full w-full object-contain p-6'}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/65 to-transparent"></div>
                            </>
                          )}
                          <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                            <div>
                              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-yellow-300">
                                <Star className="h-3.5 w-3.5" />
                                Featured Build
                              </div>
                              <h3 className="mt-5 max-w-md text-3xl text-white lg:text-4xl">{featuredProject.title}</h3>
                              {featuredProject.summary && (
                                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-200">{featuredProject.summary}</p>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              {featuredProject.href && (
                                <a
                                  href={featuredProject.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-3 text-sm font-semibold text-[#111111] transition hover:opacity-90"
                                >
                                  {featuredProject.ctaLabel ?? 'Open Project'}
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                              <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200">
                                {featuredProject.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between p-6 lg:p-8">
                          <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-gray-500">Project Snapshot</p>
                            <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                              {featuredProject.snapshot?.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-gray-800/60 bg-[#26262b] p-4">
                                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500">{item.label}</p>
                                  <p className="mt-2 text-base text-white">{item.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {featuredProject.highlights && (
                            <div className="mt-8 flex flex-wrap gap-3">
                              {featuredProject.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-200"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  )}

                  <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {gridProjects.map((project) => (
                      <li key={project.title} className="group">
                        <a
                          href={project.href ?? '#'}
                          target={project.href ? '_blank' : undefined}
                          rel={project.href ? 'noreferrer' : undefined}
                          className="block h-full rounded-2xl border border-transparent p-2 transition hover:border-white/10"
                        >
                          <div className="flex h-full flex-col rounded-[20px] bg-[#242427] p-3">
                            <div className={`relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.bg}`}>
                              {project.image ? (
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className={project.imageClassName ?? 'h-full w-full object-contain p-6'}
                                />
                              ) : (
                                <span
                                  className={`rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.3em] ${project.badgeClass}`}
                                >
                                  {project.badge}
                                </span>
                              )}
                              <ExternalLink className="absolute bottom-3 right-3 h-4 w-4 text-white/70 opacity-0 transition group-hover:opacity-100" />
                            </div>
                            <div className="mt-4 flex flex-1 flex-col">
                              <h3 className="text-lg text-white">{project.title}</h3>
                              <p className="text-sm text-gray-500">{project.category}</p>
                              {project.summary && (
                                <p className="mt-3 text-sm leading-6 text-gray-400">{project.summary}</p>
                              )}
                              {project.demoCredentials && (
                                <div className="mt-4 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-3">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300">Demo Login</p>
                                  <p className="mt-2 text-xs text-gray-300">
                                    <span className="font-medium text-white">Email:</span>{' '}
                                    <span className="font-mono">{project.demoCredentials.email}</span>
                                  </p>
                                  <p className="mt-1 text-xs text-gray-300">
                                    <span className="font-medium text-white">Password:</span>{' '}
                                    <span className="font-mono">{project.demoCredentials.password}</span>
                                  </p>
                                </div>
                              )}
                              {project.highlights && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {project.highlights.map((highlight) => (
                                    <span
                                      key={highlight}
                                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300"
                                    >
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {activePage === 'Resume' && (
                <section className="space-y-8">
                  <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <div className="flex items-center gap-4">
                        <h2 className="text-3xl text-white">Resume</h2>
                        <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                      </div>
                      <p className="mt-4 max-w-3xl text-gray-400 leading-relaxed">
                        {resumeSummary}
                      </p>
                    </div>

                    <a
                      href={resumeDownloadHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 self-start rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-3 text-sm font-semibold text-[#111111] transition hover:opacity-90"
                    >
                      Open CV PDF
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </header>

                  <div className="grid gap-4 md:grid-cols-3">
                    {resumeHighlights.map((item) => (
                      <article
                        key={item.label}
                        className="rounded-3xl border border-yellow-400/15 bg-[#222226] p-5"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                          {item.icon}
                        </div>
                        <p className="mt-4 text-xs uppercase tracking-[0.26em] text-gray-500">{item.label}</p>
                        <p className="mt-2 text-base leading-7 text-white">{item.value}</p>
                      </article>
                    ))}
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-3xl border border-gray-800/50 bg-[#222226] p-6 lg:p-8">
                      <header className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                          <Award className="h-5 w-5 text-yellow-300" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.26em] text-gray-500">Experience</p>
                          <h3 className="mt-1 text-2xl text-white">Professional Work</h3>
                        </div>
                      </header>

                      <div className="mt-8 space-y-8">
                        {resumeExperience.map((item) => (
                          <article key={`${item.role}-${item.company}`} className="relative border-l border-yellow-400/20 pl-6">
                            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-yellow-400"></div>
                            <p className="text-sm font-medium uppercase tracking-[0.22em] text-yellow-300">{item.period}</p>
                            <h4 className="mt-3 text-2xl text-white">{item.role}</h4>
                            <p className="mt-1 text-base text-gray-400">{item.company}</p>
                            <p className="mt-4 text-sm leading-7 text-gray-400">{item.context}</p>
                            <ul className="mt-5 space-y-3">
                              {item.points.map((point) => (
                                <li key={point} className="flex gap-3 text-sm leading-7 text-gray-300">
                                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-400"></span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </article>

                    <div className="grid gap-6">
                      <article className="rounded-3xl border border-gray-800/50 bg-[#222226] p-6">
                        <header className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                            <Code2 className="h-5 w-5 text-yellow-300" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.26em] text-gray-500">Skills</p>
                            <h3 className="mt-1 text-xl text-white">Core Technical Stack</h3>
                          </div>
                        </header>
                        <div className="mt-6 flex flex-wrap gap-3">
                          {resumeSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </article>

                      <article className="rounded-3xl border border-gray-800/50 bg-[#222226] p-6">
                        <header className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                            <TrendingUp className="h-5 w-5 text-yellow-300" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.26em] text-gray-500">Education</p>
                            <h3 className="mt-1 text-xl text-white">Academic Background</h3>
                          </div>
                        </header>
                        <div className="mt-6 space-y-5">
                          {resumeEducation.map((item) => (
                            <article key={`${item.school}-${item.award}`} className="rounded-2xl border border-white/5 bg-[#26262b] p-4">
                              <p className="text-sm uppercase tracking-[0.18em] text-yellow-300">{item.period}</p>
                              <h4 className="mt-2 text-lg text-white">{item.school}</h4>
                              <p className="mt-2 text-sm leading-6 text-gray-400">{item.award}</p>
                            </article>
                          ))}
                        </div>
                      </article>

                      <article className="rounded-3xl border border-gray-800/50 bg-[#222226] p-6">
                        <header className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                            <Star className="h-5 w-5 text-yellow-300" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.26em] text-gray-500">Certification</p>
                            <h3 className="mt-1 text-xl text-white">Professional Learning</h3>
                          </div>
                        </header>
                        <div className="mt-6 space-y-4">
                          {resumeCertifications.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-white/5 bg-[#26262b] p-4">
                              <h4 className="text-lg text-white">{item.title}</h4>
                              <p className="mt-2 text-sm text-gray-400">{item.issuer}</p>
                            </article>
                          ))}
                        </div>
                      </article>
                    </div>
                  </div>

                  <article className="rounded-3xl border border-gray-800/50 bg-[#222226] p-6 lg:p-8">
                    <header className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                        <Layers className="h-5 w-5 text-yellow-300" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.26em] text-gray-500">Selected Work</p>
                        <h3 className="mt-1 text-2xl text-white">Projects Highlighted In My CV</h3>
                      </div>
                    </header>

                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                      {resumeProjects.map((project) => (
                        <article key={project.title} className="rounded-3xl border border-white/5 bg-[#26262b] p-5">
                          <h4 className="text-xl text-white">{project.title}</h4>
                          <p className="mt-3 text-sm leading-7 text-gray-400">{project.description}</p>
                          <ul className="mt-5 space-y-3">
                            {project.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3 text-sm leading-7 text-gray-300">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-400"></span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </article>
                </section>
              )}

              {activePage === 'Contact' && (
                <section>
                  <header className="flex items-center gap-4">
                    <h2 className="text-3xl text-white">Contact</h2>
                    <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  </header>

                  <div className="mt-8 overflow-hidden rounded-3xl border border-gray-800/40 bg-[#1f1f22]">
                    <iframe
                      title="Ajah, Lekki, Lagos, Nigeria Map"
                      src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Ajah%2C%20Lekki%2C%20Lagos%2C%20Nigeria&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                      className="h-[320px] w-full md:h-[360px]"
                      loading="lazy"
                    ></iframe>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-2xl text-white">Contact Form</h3>
                    <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
                      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                        <label htmlFor="company">Company</label>
                        <input
                          id="company"
                          type="text"
                          name="company"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Full name"
                          name="fullName"
                          required
                          className="w-full rounded-2xl border border-gray-800/60 bg-[#1f1f22] px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-400/60 focus:outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          name="email"
                          required
                          className="w-full rounded-2xl border border-gray-800/60 bg-[#1f1f22] px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-400/60 focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        className="w-full rounded-2xl border border-gray-800/60 bg-[#1f1f22] px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-400/60 focus:outline-none"
                      />
                      <textarea
                        placeholder="Your Message"
                        rows={5}
                        name="message"
                        required
                        className="w-full rounded-2xl border border-gray-800/60 bg-[#1f1f22] px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-400/60 focus:outline-none"
                      ></textarea>
                      {contactFeedback.type && (
                        <div
                          className={`rounded-2xl border px-4 py-3 text-sm ${
                            contactFeedback.type === 'success'
                              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                              : 'border-red-500/30 bg-red-500/10 text-red-200'
                          }`}
                        >
                          {contactFeedback.message}
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmittingContact ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </div>
                </section>
              )}

              {activePage !== 'About' && activePage !== 'Portfolio' && activePage !== 'Contact' && activePage !== 'Resume' && (
                <section className="rounded-3xl border border-gray-800/40 bg-[#222225] p-8">
                  <h2 className="text-3xl text-white">{activePage}</h2>
                  <p className="mt-3 text-gray-400">
                    coming soon.
                  </p>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
