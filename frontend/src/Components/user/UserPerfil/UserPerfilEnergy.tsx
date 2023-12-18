import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const UserPerfilEnergy = ({ dato }) => {
    // Agrupa los datos por año y suma las emisiones y la energía generada
    const dataByYear = dato.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear().toLocaleString('en-US', { useGrouping: false });
      if (!acc[year]) {
        acc[year] = { year, carbonfootprint: 0, generatedenergy: 0 };
      }
      acc[year].carbonfootprint += item.carbonfootprint;
      acc[year].generatedenergy += item.generatedenergy;
      return acc;
    }, {});
  
    // Convierte el objeto agrupado nuevamente a un array de objetos
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

  return (
    <LineChart
      xAxis={[{ data: years }]}
      series={[
        { data: carbon, label: 'Carbon' },
        { data: energy, label: 'Energy' },
      ]}
      width={screenWidth - 40}
      height={screenWidth / 3}
    />
  );
}

export default UserPerfilEnergy;

