const SuggestScroll = ({isLampOn} : {isLampOn: boolean}) => {
  return (
    <div className="suggest-scroll">
      <div className={`scroll-border ${isLampOn ? "isLampOn" : ""}`}>
        <div className={`scroll-wheel ${isLampOn ? "isLampOn" : ""}`} />
      </div>
    </div>
  );
};

export default SuggestScroll;
