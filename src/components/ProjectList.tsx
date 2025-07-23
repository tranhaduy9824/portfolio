import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { projects } from "../constants";
import { useAppStore } from "../store/useAppStore";

interface ProjectListProps {
  showNetwork: boolean;
  onProjectSelect: (techStack: number[]) => void;
  selectedProject: number | null;
}

const ProjectList = ({
  showNetwork,
  onProjectSelect,
  selectedProject,
}: ProjectListProps) => {
  const { isLampOn } = useAppStore();
  const { position } = useSpring({
    position: showNetwork ? [-6, -8, -3] : [-3, -10, -3],
    config: { tension: 120, friction: 25 },
  });

  return (
    <animated.group position={position as unknown as [number, number, number]}>
      <Html
        position={[0, 0, 0]}
        transform={false}
        style={{
          position: "fixed",
          top: showNetwork ? "50px" : "-500px",
          left: "50px",
          pointerEvents: showNetwork ? "auto" : "none",
          opacity: showNetwork ? 1 : 0,
          transition: "all 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <div className="w-80 bg-gray-900/90 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          {/* Project List */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                isSelected={selectedProject === project.id}
                onSelect={() => onProjectSelect(project.techStack)}
              />
            ))}
          </div>
        </div>
      </Html>
    </animated.group>
  );
};

const ProjectItem = ({ project, isSelected, onSelect }: { project: any, isSelected: boolean, onSelect: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all duration-300 transform
        ${isSelected
          ? "bg-gray-700/80 border-2 border-blue-400 shadow-lg shadow-blue-400/20"
          : hovered
            ? "bg-gray-700/60 scale-[1.02]"
            : "bg-gray-800/60"
        }
        hover:shadow-xl border border-transparent
      `}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: isSelected ? project.color : "transparent",
        boxShadow: isSelected ? `0 0 20px ${project.color}40` : undefined,
      }}
    >
      {/* Project Name */}
      <h4
        className="font-bold text-base mb-2 transition-colors"
        style={{ color: isSelected ? "#ffffff" : project.color }}
      >
        {project.name}
      </h4>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Indicators */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          {project.techStack.slice(0, 4).map((techIndex: number, i: number) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: isSelected ? "#00ff88" : project.color,
                boxShadow: isSelected
                  ? `0 0 8px ${project.color}80`
                  : undefined,
              }}
            />
          ))}
        </div>

        {project.techStack.length > 4 && (
          <span className="text-gray-400 text-xs ml-1">
            +{project.techStack.length - 4} more
          </span>
        )}

        {/* Status indicator */}
        <div className="ml-auto">
          <div
            className={`
            w-3 h-3 rounded-full transition-all duration-300
            ${isSelected
                ? "bg-green-400 shadow-lg shadow-green-400/50"
                : "bg-gray-500"
              }
          `}
          />
        </div>
      </div>

      {/* Animated border */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none animate-pulse"
          style={{
            background: `linear-gradient(45deg, transparent, ${project.color}20, transparent)`,
            border: `1px solid ${project.color}60`,
          }}
        />
      )}
    </div>
  );
};

export default ProjectList;
