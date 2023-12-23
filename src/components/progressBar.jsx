const ProgressBar = ({ normalizedPercentage, data, func }) => {
  // Ensure the percentage is within the range [0, 100]
    // console.log(percentage)
    // const normalizedPercentage = Math.min(100, Math.max(0, percentage));
    console.log(normalizedPercentage);
    let go = data !== null
    // go ? console.log("initialized") : console.log("not Initi");
    return (
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            
              {`${normalizedPercentage}%`} 
            </span>
          </div>
        </div>
        <div className="flex w-full h-2 mb-4 overflow-hidden mt-1 bg-gray-200 rounded">
            <div
              style={{ width: `${normalizedPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
            ></div>
        </div>
      </div>
    );
};

export default ProgressBar;
