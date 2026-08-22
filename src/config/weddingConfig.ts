// Centralized Wedding Configuration
// Updating this single file updates all details across the entire website!

export interface EventDetail {
  id: string;
  day: string;
  date: string;
  title: string;
  subTitle: string;
  time: string;
  venue: string;
  dressCode?: string;
  quote: string;
  interactionType: 'haldi' | 'mehndi' | 'sangeet' | 'wedding';
  interactiveLabel: string;
  coverImage?: string;
  calendarDate: {
    start: string; // ISO string
    end: string;
  };
}

export interface GalleryItem {
  id: number;
  url: string;
  webpUrl?: string;
  caption: string;
  category: 'memories' | 'engagement' | 'portraits' | 'ceremony';
}

export interface WeddingConfig {
  bride: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    parentsDisplay: string;
    avatarUrl?: string;
    bio?: string;
  };
  groom: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    parentsDisplay: string;
    avatarUrl?: string;
    bio?: string;
  };
  weddingDetails: {
    title: string;
    hashtag: string;
    tagline: string;
    mainDate: string;
    mainTime: string;
    venueName: string;
    place: string;
    fullAddress: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionUrl: string;
    countdownTarget: string; // ISO date string: 2026-12-11T18:00:00+05:30
    contactNumber: string; // 8754406795
    whatsappNumber: string; // 918754406795
    rsvpDeadline: string; // 26th August 2026
  };
  events: EventDetail[];
  storyMilestones: {
    year: string;
    title: string;
    description: string;
    tag: string;
  }[];
  gallery: GalleryItem[];
  music: {
    title: string;
    artist: string;
    audioUrl: string;
    autoPlay: boolean;
  };
}

// Import local image assets so Vite can fingerprint them when building
// Use Vite-compatible runtime URLs so TypeScript doesn't require image module declarations
const photo01 = new URL('../assets/photo-01.jpg', import.meta.url).href;
const photo02 = new URL('../assets/photo-02.jpg', import.meta.url).href;
const photo03 = new URL('../assets/photo-03.jpg', import.meta.url).href;
const photo04 = new URL('../assets/photo-04.jpg', import.meta.url).href;
const photo05 = new URL('../assets/photo-05.jpg', import.meta.url).href;
const photo06 = new URL('../assets/photo-06.jpg', import.meta.url).href;
const photo07 = new URL('../assets/photo-07.jpg', import.meta.url).href;
const photo08 = new URL('../assets/photo-08.jpg', import.meta.url).href;
const photo09 = new URL('../assets/photo-09.jpg', import.meta.url).href;
// const photo10 = new URL('../assets/photo-10.png', import.meta.url).href;

export const weddingConfig: WeddingConfig = {
  bride: {
    name: "Sravani",
    fullName: "Chi.la.sow Sravani (Doctor)",
    father: "Somu Sudhakar",
    mother: "",
    parentsDisplay: "D/o Somu Sudhakar",
    bio: ""
  },
  groom: {
    name: "Ram Charan Teja",
    fullName: "Chi. Ram Charan Teja (Software)",
    father: "Charugulla Srinivas",
    mother: "",
    parentsDisplay: "S/o Charugulla Srinivas",
    bio: ""
  },
  weddingDetails: {
    title: "Ram Charan Teja weds Sravani",
    hashtag: "#RAM Weds SRAVANI",
    tagline: "Together with their families, invite you to celebrate love, tradition and new beginnings.",
    mainDate: "26 August 2026",
    mainTime: "10:16 PM",
    venueName: "A1 Convention Hall, Kanchikacherla",
    place: "",
    fullAddress: "A1 Convention Hall, Kanchikacherla, Andhra Pradesh",
    googleMapsEmbedUrl: "",
    googleMapsDirectionUrl: "https://maps.app.goo.gl/sqhZyy3mPT4rPUmi6",
    countdownTarget: "2026-08-26T22:16:00+05:30",
    contactNumber: "+91 8754406795",
    whatsappNumber: "+91 8754406795",
    rsvpDeadline: "26th August 2026"
  },
  events: [
    {
      id: "pellikoduku",
      day: "SATURDAY, 22 AUGUST 2026",
      date: "22 Aug 2026",
      title: "Upanayanam & Pellikoduku",
      subTitle: "Groom's Rituals & Blessings",
      time: "11:56 AM onwards",
      venue: "MY Home, Bhadrachalam",
      quote: "“Blessings for the groom as a new chapter begins.”",
      interactionType: "wedding",
      interactiveLabel: "SEND BLESSINGS",
      calendarDate: {
        start: "20260822T170000",
        end: "20260822T210000"
      }
    },
    {
      id: "haldi",
      day: "SUNDAY, 23 AUGUST 2026",
      date: "23 Aug 2026",
      title: "Haldi (Mangala Snanam)",
      subTitle: "Manjal Neerattu Vizha",
      time: "10:00 AM onwards",
      venue: "My Home, Bhadrachalam",
      quote: "“Turmeric, laughter and the very first blessings.”",
      interactionType: "haldi",
      interactiveLabel: "RUB TO REVEAL",
      calendarDate: {
        start: "20260823T170000",
        end: "20260823T210000"
      }
    },
    {
      id: "wedding",
      day: "WEDNESDAY, 26 AUGUST 2026",
      date: "26 Aug 2026",
      title: "The Wedding",
      subTitle: "The Muhurtham",
      time: "10:16 PM (Muhurtham)",
      venue: "A1 Convention Hall, Kanchikacherla",
      quote: "“The sacred vows — with your love and blessings.”",
      interactionType: "wedding",
      interactiveLabel: "SHOWER BLESSINGS",
      calendarDate: {
        start: "20260826T221600",
        end: "20260827T000000"
      }
    },
    {
      id: "reception",
      day: "THURSDAY, 27 AUGUST 2026",
      date: "27 Aug 2026",
      title: "Reception Party",
      subTitle: "An evening of celebrations",
      time: "7:00 PM onwards",
      venue: "Sree Seetharam Convention Hall, Yettapaka",
      quote: "“Dance, dine and celebrate the newlyweds.”",
      interactionType: "wedding",
      interactiveLabel: "CHEER THE COUPLE",
      calendarDate: {
        start: "20260827T190000",
        end: "20260827T230000"
      }
    }
  ],
  storyMilestones: [
    {
      year: "2026",
      title: "First Met(March 29th)",
      description: "It all began with a simple conversation over coffee. What started as a casual meeting soon turned into meaningful conversations, shared smiles, and the beginning of a beautiful connection.",
      tag: "The First Spark"
    },
    {
      year: "2026",
      title: "The Journey Together(May 3rd)",
      description: "With busy workdays, conversations that lasted late into the night, family moments, and time spent discovering each other, their friendship slowly blossomed into something deeper and more special.",
      tag: "Growing In Love"
    },
    {
      year: "2026",
      title: "The Ring & The Promise(July 5th)",
      description: "With the blessings of their families, two hearts took the next step. A simple question, a heartfelt “Yes,” and a promise to walk through life together marked the beginning of their forever.",
      tag: "Forever Begins"
    },
    {
      year: "2026",
      title: "The Royal Wedding(Aug 26th)",
      description: "Two accomplished individuals, two loving families, and one beautiful journey come together in a celebration of love, tradition, and togetherness. With the blessings of family and loved ones, they begin their new chapter together at the sacred and beautiful Bhadrachalam",
      tag: "The Big Day"
    }
  ],
  gallery: [
    // {
    //   id: 1,
    //   url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    //   caption: "Ram Charan Teja Weds Sravani — Golden Hour Glow",
    //   category: "portraits"
    // },
    // {
    //   id: 2,
    //   url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    //   caption: "Sacred Ceremonies & Golden Blessings",
    //   category: "ceremony"
    // },
    // {
    //   id: 3,
    //   url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    //   caption: "Floral Elegance & Joyful Smiles",
    //   category: "memories"
    // },
    // {
    //   id: 4,
    //   url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    //   caption: "Hand in Hand, Ready for Forever",
    //   category: "engagement"
    // },
    // {
    //   id: 5,
    //   url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80",
    //   caption: "Intricate Henna & Joyous Festivities",
    //   category: "ceremony"
    // },
    // {
    //   id: 6,
    //   url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    //   caption: "Celebrations, Music & Laughter",
    //   category: "memories"
    // }
    // ,
    // User-added placeholders: replace these URLs with real images placed in `public/assets/`
    {
      id: 7,
      url: photo01,
      caption: "",
      category: "portraits"
    },
    {
      id: 8,
      url: photo02,
      caption: "",
      category: "ceremony"
    },
    {
      id: 9,
      url: photo03,
      caption: "",
      category: "memories"
    },
    {
      id: 10,
      url: photo04,
      caption: "",
      category: "portraits"
    },
    {
      id: 11,
      url: photo05,
      caption: "",
      category: "engagement"
    },
    {
      id: 12,
      url: photo06,
      caption: "",
      category: "ceremony"
    },
    {
      id: 13,
      url: photo07,
      caption: "",
      category: "memories"
    },
    {
      id: 14,
      url: photo08,
      caption: "",
      category: "portraits"
    },
    {
      id: 15,
      url: photo09,
      caption: "",
      category: "ceremony"
    }
  ],
  music: {
    title: "Wedding Song (Full Track)",
    artist: "Selected Track",
    audioUrl: "/assets/WeddingSong.mpeg",
    autoPlay: true
  }
};

