import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const UserPerfilEnergy = ({ dato }) => {
  const dataByYear = dato.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear().toLocaleString('en-US', { useGrouping: false });
    if (!acc[year]) {
      acc[year] = { year, carbonfootprint: 0, generatedenergy: 0 };
    }
    acc[year].carbonfootprint += item.carbonfootprint;
    acc[year].generatedenergy += item.generatedenergy;
    return acc;
  }, {});

  const aggregatedData = Object.values(dataByYear);

  const years = aggregatedData.map(item => item.year);
  const carbon = aggregatedData.map(item => item.carbonfootprint);
  const energy = aggregatedData.map(item => item.generatedenergy);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Aplica la escala logarítmica a los datos acumulativos de carbon y energy
  const logCarbon = carbon.map((value, index) => {
    const cumulativeValue = carbon.slice(0, index + 1).reduce((acc, currentValue) => acc + currentValue, 0);
    return cumulativeValue > 0 ? Math.log10(cumulativeValue) : 0;
  });

  const logEnergy = energy.map((value, index) => {
    const cumulativeValue = energy.slice(0, index + 1).reduce((acc, currentValue) => acc + currentValue, 0);
    return cumulativeValue > 0 ? Math.log10(cumulativeValue) : 0;
  });

  return (
    <LineChart
      xAxis={[{ data: years }]}
      series={[
        { data: logCarbon, label: 'Co2' },
        { data: logEnergy, label: 'kW' },
      ]}
      width={screenWidth - 40}
      height={screenWidth / 3}
    />
  );
}

export default UserPerfilEnergy;
