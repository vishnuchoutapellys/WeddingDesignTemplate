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
    contactNumber: string; // 9014249898
    whatsappNumber: string; // 919014249898
    rsvpDeadline: string; // 15 November 2026
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

export const weddingConfig: WeddingConfig = {
  bride: {
    name: "Sri Lakshmi Sravani",
    fullName: "Chi.la.sow Sri Lakshmi Sravani (Doctor)",
    father: "Somu Sudhakar",
    mother: "",
    parentsDisplay: "D/o Somu Sudhakar",
    bio: ""
  },
  groom: {
    name: "SitaRam Charan Teja",
    fullName: "Chi. SitaRam Charan Teja (Software)",
    father: "Charugulla Srinivas",
    mother: "",
    parentsDisplay: "S/o Charugulla Srinivas",
    bio: ""
  },
  weddingDetails: {
    title: "SitaRam Charan Teja & Sri Lakshmi Sravani",
    hashtag: "#RAM Weds SRAVANI",
    tagline: "Together with their families, invite you to celebrate love, tradition and new beginnings.",
    mainDate: "26 August 2026",
    mainTime: "10:16 PM",
    venueName: "A1 Convention Hall, Kanchikacherla",
    place: "Kanchikacherla",
    fullAddress: "A1 Convention Hall, Kanchikacherla, Andhra Pradesh",
    googleMapsEmbedUrl: "",
    googleMapsDirectionUrl: "",
    countdownTarget: "2026-08-26T22:16:00+05:30",
    contactNumber: "9014249898",
    whatsappNumber: "919014249898",
    rsvpDeadline: "15 November 2026"
  },
  events: [
    {
      id: "pellikoduku",
      day: "SATURDAY, 22 AUGUST 2026",
      date: "22 Aug 2026",
      title: "PelliKoduku",
      subTitle: "Groom's Rituals & Blessings",
      time: "5:00 PM onwards",
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
      time: "5:00 PM onwards",
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
      year: "2022",
      title: "First Met",
      description: "A casual coffee conversation that turned into hours of shared laughter, stories, and the spark of something magical.",
      tag: "The First Spark"
    },
    {
      year: "2024",
      title: "The Journey Together",
      description: "Through countless road trips, shared dreams, family get-togethers, and quiet sunsets, two hearts became inseparable.",
      tag: "Growing In Love"
    },
    {
      year: "2025",
      title: "The Ring & The Promise",
      description: "Under starry skies, SitaRam asked the easiest question and Sri Lakshmi Sravani gave the easiest 'Yes!' of her life.",
      tag: "Forever Begins"
    },
    {
      year: "2026",
      title: "The Royal Wedding",
      description: "Two souls, two families, united in love and sacred traditions at Bhadrachalam.",
      tag: "The Big Day"
    }
  ],
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "SitaRam Charan Teja & Sri Lakshmi Sravani — Golden Hour Glow",
      category: "portraits"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      caption: "Sacred Ceremonies & Golden Blessings",
      category: "ceremony"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "Floral Elegance & Joyful Smiles",
      category: "memories"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "Hand in Hand, Ready for Forever",
      category: "engagement"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80",
      caption: "Intricate Henna & Joyous Festivities",
      category: "ceremony"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      caption: "Celebrations, Music & Laughter",
      category: "memories"
    }
  ],
  music: {
    title: "Mangalyam Thanthunanena (Royal Wedding Instrumental)",
    artist: "Shehnai & Flute Ensemble",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-flute-and-sitar-ambient-112199.mp3",
    autoPlay: true
  }
};
