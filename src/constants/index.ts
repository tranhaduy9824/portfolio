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
