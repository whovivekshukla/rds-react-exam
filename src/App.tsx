import React, { useEffect } from 'react';
import './App.css';

const Bucket = ({ waterLevel, onAddWater, onEmptyTank }) => {
  return (
    <div>
      <div className="button-container">
        <button className="add-water-btn" onClick={onAddWater}>
          Add Water
        </button>
        <button className="empty-tank-btn" onClick={onEmptyTank}>
          Empty Tank
        </button>
      </div>
      <div className="bucket">
        <div
          className="water"
          style={{ height: `${(waterLevel / 1000) * 100}%` }}
        ></div>
      </div>
      <div className="water-level-text">
        {`Water Level: ${waterLevel.toFixed(2)}L`}
      </div>
    </div>
  );
};

const App = () => {
  const [bucketLevels, setBucketLevels] = React.useState([0, 0, 0, 0, 0]);

  const addWater = (index) => {
    const totalAddedWater = 200; // Change this value as needed

    setBucketLevels((prevLevels) => {
      const updatedLevels = prevLevels.map(
        (level, i) =>
          i === index
            ? Math.min(level + totalAddedWater, 1000)
            : Math.min(level, 1000) // Ensure water level doesn't exceed 1000
      );

      // After 1 second, calculate the average and update all buckets
      setTimeout(() => {
        const averageLevel =
          updatedLevels.reduce((sum, current) => sum + current, 0) /
          updatedLevels.length;

        setBucketLevels(Array(updatedLevels.length).fill(averageLevel));
      }, 1000); // 1000ms = 1 second

      return updatedLevels;
    });
  };

  const emptyTank = (index) => {
    setBucketLevels((prevLevels) => {
      const updatedLevels = prevLevels.map((level, i) =>
        i === index ? 0 : level
      );

      // After 1 second, calculate the average and update all buckets
      setTimeout(() => {
        const averageLevel =
          updatedLevels.reduce((sum, current) => sum + current, 0) /
          updatedLevels.length;

        setBucketLevels(Array(updatedLevels.length).fill(averageLevel));
      }, 1000); // 1000ms = 1 second

      return updatedLevels;
    });
  };

  // useEffect to clear timeouts when component unmounts
  useEffect(() => {
    return () => {
      for (let i = 0; i < bucketLevels.length; i++) {
        clearTimeout(i);
      }
    };
  }, [bucketLevels]);

  return (
    <div className="app-container">
      <div className="buckets-container">
        {bucketLevels.map((level, index) => (
          <Bucket
            key={index}
            waterLevel={level}
            onAddWater={() => addWater(index)}
            onEmptyTank={() => emptyTank(index)}
            bucketNumber={index}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
