import { uid } from "../lib/cvUtils";

export const emptyCv = () => ({
  personal: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: [],
  languages: [],
  projects: [],
  certificates: [],
});

export const sampleCv = () => ({
  personal: {
    firstName: "Ahmet",
    lastName: "Yılmaz",
    title: "Kıdemli Yazılım Geliştirici",
    email: "ahmet.yilmaz@ornek.com",
    phone: "+90 532 123 45 67",
    location: "İstanbul, Türkiye",
    linkedin: "linkedin.com/in/ahmetyilmaz",
    github: "github.com/ahmetyilmaz",
    website: "ahmetyilmaz.dev",
  },
  summary:
    "8 yıllık deneyime sahip, ölçeklenebilir web uygulamaları geliştirme konusunda uzman kıdemli yazılım geliştiricisi. React, Node.js ve bulut mimarileri konusunda güçlü bir geçmişe sahip. Ekip liderliği ve çevik yazılım süreçleri konusunda kanıtlanmış başarı.",
  education: [
    {
      id: uid(),
      school: "Boğaziçi Üniversitesi",
      degree: "Bilgisayar Mühendisliği, Lisans",
      city: "İstanbul",
      startDate: "2012-09",
      endDate: "2016-06",
      current: false,
      gpa: "3.45 / 4.00",
    },
  ],
  experience: [
    {
      id: uid(),
      company: "TechNova Yazılım A.Ş.",
      position: "Kıdemli Yazılım Geliştirici",
      city: "İstanbul",
      startDate: "2020-03",
      endDate: "",
      current: true,
      bullets: [
        "Mikroservis mimarisine geçişi yönettim; sistem yanıt süresini %40 iyileştirdim.",
        "5 kişilik geliştirici ekibine teknik liderlik yaptım ve kod inceleme süreçlerini kurdum.",
        "CI/CD boru hatlarını kurarak dağıtım süresini 2 saatten 15 dakikaya düşürdüm.",
      ],
    },
    {
      id: uid(),
      company: "Dijital Çözümler Ltd.",
      position: "Yazılım Geliştirici",
      city: "Ankara",
      startDate: "2016-07",
      endDate: "2020-02",
      current: false,
      bullets: [
        "React ve Redux kullanarak müşteri yönetim panelini baştan geliştirdim.",
        "REST API'ler tasarladım ve 100.000+ aktif kullanıcıya hizmet verdim.",
      ],
    },
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Python",
    "PostgreSQL", "MongoDB", "Docker", "AWS", "Git",
  ],
  languages: [
    { id: uid(), name: "Türkçe", level: "Ana Dil" },
    { id: uid(), name: "İngilizce", level: "İleri (C1)" },
    { id: uid(), name: "Almanca", level: "Başlangıç (A2)" },
  ],
  projects: [
    {
      id: uid(),
      name: "OpenTask - Açık Kaynak Görev Yöneticisi",
      role: "Kurucu & Geliştirici",
      startDate: "2021-01",
      endDate: "2022-05",
      current: false,
      link: "github.com/ahmetyilmaz/opentask",
      bullets: [
        "3.000+ GitHub yıldızı alan açık kaynak proje yönetim aracı geliştirdim.",
        "Gerçek zamanlı iş birliği özelliğini WebSocket ile ekledim.",
      ],
    },
  ],
  certificates: [
    {
      id: uid(),
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issueDate: "2022-04",
      expiryDate: "2025-04",
      credential: "AWS-ASA-123456",
    },
    {
      id: uid(),
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      issueDate: "2021-09",
      expiryDate: "",
      credential: "",
    },
  ],
});
