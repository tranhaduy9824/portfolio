import { useAppStore } from "../store/useAppStore";

const SuggestScroll = () => {
  const { isLampOn } = useAppStore();
  return (
    <div className="suggest-scroll">
      <div className={`scroll-border ${isLampOn ? "isLampOn" : ""}`}>
        <div className={`scroll-wheel ${isLampOn ? "isLampOn" : ""}`} />
      </div>
    </div>
  );
};

export default SuggestScroll;
