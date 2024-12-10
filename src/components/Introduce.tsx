import gsap from "gsap";
import { useEffect, useRef } from "react";

const Introduce = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

  const hoverEffect = (scale: number, gradient: string) => {
    gsap.to(buttonRef.current, {
      scale,
      background: gradient,
      duration: 0.4,
    });
  };

  return (
    <div
      className="w-max mx-auto flex flex-col sm:mt-44 mt-20 gap-3 absolute ps-10 z-10"
      style={{ userSelect: "none" }}
    >
      <p className="sm:text-7xl text-2xl font-medium font-generalsans">
        Hi, my <br />
        name is Ha Duy.<span className="waving-hand">👋</span>
      </p>
      <p className="text-gray-500 text-xl my-3">
        I love creating beautiful user experiences.
      </p>
      <button
        ref={buttonRef}
        className="w-max mt-6 px-8 py-3 text-white text-lg font-medium rounded-3xl"
        style={{ background: "linear-gradient(90deg, #0284c7, #38bdf8)" }}
        onMouseEnter={() =>
          hoverEffect(1.1, "linear-gradient(90deg, #38bdf8, #06b6d4)")
        }
        onMouseLeave={() =>
          hoverEffect(1, "linear-gradient(90deg, #0284c7, #38bdf8)")
        }
      >
        Get in touch
      </button>
    </div>
  );
};

export default Introduce;
