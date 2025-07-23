import * as THREE from "three";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Work",
    href: "#work",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

export const createRoundedRectShape = (
  width: number,
  height: number,
  radius: number
) => {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2 + radius, -height / 2);
  shape.lineTo(width / 2 - radius, -height / 2);
  shape.quadraticCurveTo(
    width / 2,
    -height / 2,
    width / 2,
    -height / 2 + radius
  );
  shape.lineTo(width / 2, height / 2 - radius);
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  shape.lineTo(-width / 2 + radius, height / 2);
  shape.quadraticCurveTo(
    -width / 2,
    height / 2,
    -width / 2,
    height / 2 - radius
  );
  shape.lineTo(-width / 2, -height / 2 + radius);
  shape.quadraticCurveTo(
    -width / 2,
    -height / 2,
    -width / 2 + radius,
    -height / 2
  );
  return shape;
};

export const responsive = {
  mobile: {
    introducePosition: [-6, 1.2, 4],
    introduceScale: 0.35,
    groupScale: 1.4,
  },
  smallTablet: {
    introducePosition: [-6.3, 1.2, 4],
    introduceScale: 0.4,
    groupScale: 1.5,
  },
  tablet: {
    introducePosition: [-6.3, 1.2, 4],
    introduceScale: 0.4,
    groupScale: 1.55,
  },
  smallDesktop: {
    introducePosition: [-6.8, 1.2, 4],
    introduceScale: 0.4,
    groupScale: 1.55,
  },
  desktop: {
    introducePosition: [-7, 1.2, 4],
    introduceScale: 0.45,
    groupScale: 1.6,
  },
};

export const logoModels = [
  { model: "/models/logos/vscode.glb", scale: 1 },
  { model: "/models/logos/html.glb", scale: 0.02, position: [0.02, -0.06, 0] },
  { model: "/models/logos/javascript.glb", scale: 1 },
  { model: "/models/logos/typescript.glb", scale: 1 },
  { model: "/models/logos/react.glb", scale: 1 },
  { model: "/models/logos/threejs.glb", scale: 0.0013 },
  { model: "/models/logos/github.glb", scale: 0.08 },
  { model: "/models/logos/java.glb", scale: 1 },
  { model: "/models/logos/mongodb.glb", scale: 1 },
  { model: "/models/logos/kotlin.glb", scale: 1 },
  { model: "/models/logos/mysql.glb", scale: 1 },
  { model: "/models/logos/nestjs.glb", scale: 1 },
  { model: "/models/logos/nodejs.glb", scale: 1 },
  { model: "/models/logos/php.glb", scale: 1 },
  { model: "/models/logos/python.glb", scale: 0.08 },
  { model: "/models/logos/css.glb", scale: 0.00095, position: [0.065, -0.19, 0] },
];

export const listProject = [
  {
    name: "Project 1",
    description: "Description of project 1",
    image: "/images/project1.jpg",
    link: "https://example.com/project1",
    github: "https://github.com/user/project1",
    video: "https://www.youtube.com/watch?v=example1",
    tags: ["React", "JavaScript"],
  },
  {
    name: "Project 2",
    description: "Description of project 2",
    image: "/images/project2.jpg",
    link: "https://example.com/project2",
    github: "https://github.com/user/project2",
    video: "https://www.youtube.com/watch?v=example2",
    tags: ["HTML", "CSS"],
  },
  {
    name: "Project 3",
    description: "Description of project 3",
    image: "/images/project3.jpg",
    link: "https://example.com/project3",
    github: "https://github.com/user/project3",
    video: "https://www.youtube.com/watch?v=example3",
    tags: ["Node.js", "Express"],
  },
];

export const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Full-stack web application",
    techStack: [0, 1, 2, 4],
    color: "#ff6b6b",
    image: "/project1.jpg"
  },
  {
    id: 2,
    name: "Real-time Chat App",
    description: "WebSocket-based messaging",
    techStack: [0, 1, 3, 5],
    color: "#4ecdc4",
    image: "/project2.jpg"
  },
  {
    id: 3,
    name: "Data Visualization Dashboard",
    description: "Interactive charts and analytics",
    techStack: [0, 1, 6, 7],
    color: "#45b7d1",
    image: "/project3.jpg"
  },
  {
    id: 4,
    name: "Mobile App (React Native)",
    description: "Cross-platform mobile solution",
    techStack: [0, 1, 8, 9],
    color: "#96ceb4",
    image: "/project4.jpg"
  }
];

interface TechIcon {
  name: string;
  icon: string;
  color: string;
}

export const techIcons: { [key: number]: TechIcon } = {
  0: { name: "React", icon: "⚛️", color: "#61DAFB" },
  1: { name: "TypeScript", icon: "🔷", color: "#3178C6" },
  2: { name: "Node.js", icon: "🟢", color: "#339933" },
  3: { name: "Python", icon: "🐍", color: "#3776AB" },
  4: { name: "MongoDB", icon: "🍃", color: "#47A248" },
  5: { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  6: { name: "AWS", icon: "☁️", color: "#FF9900" },
  7: { name: "Docker", icon: "🐳", color: "#2496ED" },
  8: { name: "Next.js", icon: "▲", color: "#000000" },
  9: { name: "Vue.js", icon: "💚", color: "#4FC08D" },
  10: { name: "Express", icon: "🚂", color: "#000000" },
  11: { name: "GraphQL", icon: "🔺", color: "#E10098" },
};