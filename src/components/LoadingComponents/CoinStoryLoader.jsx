function CoinStoryLoader({ width }) {
  const storyCircles = (length) => {
    var numberArray = [];
    for (var i = 0; i < length; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };
  return (
    <div className="container mx-auto 2xl:max-w-6xl">
      <div className="bg-white-90 h-16 sm:h-20 w-full flex gap-x-2 sm:gap-x-4 items-center justify-between px-2 sm:px-4 overflow-y-auto overflow-x-hidden">
        {storyCircles(width).map((id) => (
          <div
            key={id}
            className="p-6 sm:p-8 rounded-full animate-pulse bg-secondary-600"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CoinStoryLoader;
