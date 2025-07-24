import { useState } from "react";
import { projects, techIcons } from "../constants";
import { useAppStore } from "../store/useAppStore";

interface Project {
  id: number;
  name: string;
  description: string;
  techStack: number[];
  color: string;
  liveUrl?: string;
  demoImages?: string[];
}

const ProjectList = () => {
  const { isLampOn, showNetwork, selectedProject, setSelectedProject } =
    useAppStore();

  if (!showNetwork) return null;

  return (
    <div
      className={`fixed top-1/2 left-24 -translate-y-1/2 z-50 w-96 rounded-xl p-6 border transition-all duration-500 transform project-list-enter ${
        !isLampOn
          ? "backdrop-blur-lg border-gray-200/30 shadow-2xl shadow-black/10"
          : "backdrop-blur-lg border-white/10 shadow-2xl shadow-black/50"
      } ${
        showNetwork
          ? "translate-x-0 opacity-100 scale-100"
          : "-translate-x-full opacity-0 scale-95"
      }`}
      style={{ backgroundColor: "#ffffff1a" }}
    >
      {/* Project List */}
      <div
        className={`space-y-4 overflow-y-auto custom-scrollbar ${
          !isLampOn ? "light-scrollbar" : "dark-scrollbar"
        }`}
        style={{ maxHeight: "calc(100vh - 8rem)" }}
      >
        {projects.map((project: Project) => (
          <ProjectItem
            key={project.id}
            project={project}
            isSelected={selectedProject === project.id}
            onSelect={() => {
              setSelectedProject(project.id);
            }}
            isLampOn={isLampOn}
          />
        ))}
      </div>
    </div>
  );
};

interface ProjectItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  isLampOn: boolean;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isSelected,
  onSelect,
  isLampOn,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const baseClasses = !isLampOn
    ? "bg-gray-50/80 hover:bg-white/90 border-gray-200/50 hover:border-gray-300/70"
    : "bg-gray-800/60 hover:bg-gray-700/80 border-white/10 hover:border-white/20";

  const selectedClasses = !isLampOn
    ? "bg-blue-50/90 shadow-lg hover:shadow-xl"
    : "bg-gray-700/80 shadow-lg hover:shadow-xl";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ 
      x: rect.right + 20,
      y: rect.top 
    });
  };

  return (
    <div className="relative group" onMouseMove={handleMouseMove}>
      <div
        className={`
          relative p-5 rounded-xl cursor-pointer transition-all duration-500 transform border overflow-hidden
          ${isSelected ? selectedClasses : baseClasses}
          ${hovered ? "shadow-2xl -translate-y-1" : ""}
        `}
        onClick={onSelect}
        onMouseEnter={() => {
          setHovered(true);
          setShowDemo(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setShowDemo(false);
          setAvatarHovered(false);
        }}
        style={{
          borderColor: isSelected
            ? project.color
            : hovered
            ? project.color + "60"
            : undefined,
          boxShadow: isSelected
            ? `0 0 30px ${project.color}25, 0 10px 40px rgba(0,0,0,0.1)`
            : hovered
            ? `0 0 25px ${project.color}20, 0 8px 32px rgba(0,0,0,0.15)`
            : undefined,
        }}
      >
        {/* Floating particles */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-1.5 h-1.5 rounded-full opacity-80 animate-bounce"
              style={{
                backgroundColor: project.color,
                top: "20%",
                left: "10%",
                animationDelay: "0s",
                animationDuration: "2s",
              }}
            />
            <div
              className="absolute w-1 h-1 rounded-full opacity-60 animate-bounce"
              style={{
                backgroundColor: project.color,
                top: "60%",
                right: "15%",
                animationDelay: "0.5s",
                animationDuration: "2.5s",
              }}
            />
            <div
              className="absolute w-0.5 h-0.5 rounded-full opacity-90 animate-ping"
              style={{
                backgroundColor: project.color,
                top: "80%",
                left: "20%",
                animationDelay: "1s",
                animationDuration: "1.5s",
              }}
            />
          </div>
        )}

        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at 30% 20%, ${project.color}12, transparent 60%)`,
          }}
        />

        {/* Project Avatar */}
        <div className="flex items-start gap-4 mb-4 relative z-10">
          <div
            className={`relative w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold shrink-0 cursor-pointer transition-all duration-300 transform-gpu ${
              avatarHovered ? "rotate-6 scale-110" : ""
            }`}
            style={{
              backgroundColor: `${project.color}${avatarHovered ? "30" : "20"}`,
              color: project.color,
              border: `2px solid ${project.color}${
                avatarHovered ? "60" : "40"
              }`,
            }}
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
          >
            {project.name.charAt(0)}

            {/* Avatar glow */}
            {avatarHovered && (
              <div
                className="absolute inset-0 rounded-lg animate-pulse opacity-50"
                style={{
                  background: `linear-gradient(45deg, ${project.color}30, transparent, ${project.color}30)`,
                  boxShadow: `0 0 20px ${project.color}40`,
                }}
              />
            )}
          </div>

          {/* Project Info */}
          <div className="flex-1 min-w-0">
            <h4
              className="font-bold text-lg mb-1 transition-all duration-300 truncate"
              style={{
                color: isSelected
                  ? project.color
                  : !isLampOn
                  ? "#1f2937"
                  : "#ffffff",
              }}
            >
              {project.name}
            </h4>

            {/* Live Website Badge */}
            {project.liveUrl && (
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    !isLampOn ? "bg-green-500" : "bg-green-400"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    !isLampOn ? "text-green-600" : "text-green-400"
                  }`}
                >
                  Live Website
                </span>
              </div>
            )}
          </div>

          {/* Status Indicator */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 shrink-0 transform-gpu ${
              hovered ? "animate-pulse scale-125" : ""
            }`}
            style={{
              backgroundColor: isSelected 
                ? project.color 
                : !isLampOn 
                  ? "#9ca3af" 
                  : "#6b7280",
            }}
          />
        </div>

        {/* Description */}
        <p
          className={`text-sm mb-4 leading-relaxed transition-colors duration-300 ${
            !isLampOn ? "text-gray-600" : "text-gray-300"
          }`}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {project.techStack
              .slice(0, 3)
              .map((techIndex: number, i: number) => {
                const tech = techIcons[techIndex];
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 transform-gpu hover:scale-105 ${
                      !isLampOn
                        ? "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                        : "bg-gray-700/80 text-gray-200 border border-gray-600 hover:bg-gray-600/80"
                    }`}
                    title={tech?.name || "Unknown"}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    <span className="text-xs">{tech?.icon || "🔧"}</span>
                    <span>{tech?.name || "Tech"}</span>
                  </div>
                );
              })}

            {project.techStack.length > 3 && (
              <span
                className={`text-xs transition-colors duration-300 ${
                  !isLampOn ? "text-gray-500" : "text-gray-400"
                }`}
              >
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Animated border */}
        {isSelected && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-60"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${project.color}20, transparent 120deg, ${project.color}10, transparent)`,
              animation: "spin 8s linear infinite",
            }}
          />
        )}
      </div>

      {/* Modal */}
      {showDemo && hovered && project.demoImages && (
        <div
          className={`fixed rounded-xl p-4 border z-[60] transition-all duration-300 overflow-hidden transform-gpu ${
            !isLampOn
              ? "bg-white/95 backdrop-blur-lg border-gray-200/50 shadow-2xl"
              : "bg-gray-900/95 backdrop-blur-lg border-white/20 shadow-2xl"
          } ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            width: "280px",
            maxWidth: "calc(100vw - 40px)",
          }}
        >
          <h5
            className={`font-semibold text-sm mb-3 ${
              !isLampOn ? "text-gray-800" : "text-white"
            }`}
          >
            Project Preview
          </h5>

          <div className="grid grid-cols-1 gap-2">
            {project.demoImages
              .slice(0, 2)
              .map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.name} demo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 py-2 px-3 rounded-lg font-medium text-sm text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                backgroundColor: project.color,
                boxShadow: `0 4px 12px ${project.color}30`
              }}
            >
              Live Website →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectList;