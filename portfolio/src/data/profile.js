export const PROFILE = {
  name: "Maryam Ahmed Adel",
  role: "AI Engineer",
   summary:
    "A third-level Information Systems student at Cairo University passionate about Artificial Intelligence and building practical solutions. I enjoy learning through hands-on projects and internships, exploring new technologies, and turning ideas into intelligent systems.",
   photo: "https://res.cloudinary.com/lrmifkhy/image/upload/v1790859583/IMG_20260929_110959_2.jpg",
  cvLink: "/cv.pdf",
  github: "https://github.com/maryamahmedadel365-bit",
  linkedin: "https://www.linkedin.com/in/maryam-ahmed-298875327/",
  email: "maryamahmedadel365@gmail.com",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "Experience", to: "/", hash: "#about" },
  { label: "Certificates", to: "/certificates" },
  { label: "Projects", to: "/projects" },
];

// Internships are loaded from Portfolio_2.xlsx (see data/internships.js)
export const ABOUT = {
 skills: [
    { group: "AI & Machine Learning", icon: "brain", items: ["Python", "scikit-learn", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"] },
    { group: "Computer Vision", icon: "eye", items: ["OpenCV", "YOLO", "CNNs", "Face Recognition", "Image Processing"] },
    { group: "Generative AI", icon: "spark", items: ["LLMs", "Prompting", "RAG", "AI Agents", "Crew AI","LangChain", "LangGraph"] },
    { group: "Tools & Development", icon: "code", items: ["Git", "Streamlit", "React", "FastAPI", "Docker", "GitHub"] },
  ],
};
