function RatesTableLoader({ height }) {
  const numberOfSingleCoins = (length) => {
    var numberArray = [];
    for (var i = 0; i < length; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };

  return (
    <div className="container 2xl:max-w-6xl mx-auto">
      <div id="wrapper" className="w-full mt-4 bg-secondary-100">
        <div className="flex-1">
          <div className="bg-secondary-300 animate-pulse flex justify-between px-4 py-2">
            <p className="bg-white-90 w-10 h-5 rounded-md animate-pulse flex justify-start"></p>
            <p className="bg-white-90 w-10 h-5 rounded-md animate-pulse flex justify-center"></p>
            <p className="bg-white-90 w-10 h-5 rounded-md animate-pulse flex justify-end"></p>
          </div>
          <div>
            {numberOfSingleCoins(height).map((id) => (
              <div
                key={id}
                className="bg-white-90 w-full h-12 flex justify-between items-center px-4 border-b-2 border-secondary-100"
              >
                <div className="w-1/4 h-10 flex items-center">
                  <div className="bg-secondary-300 h-10 w-10 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 bg-secondary-300 animate-pulse h-5 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatesTableLoader;
