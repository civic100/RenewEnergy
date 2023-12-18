import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const UserPerfilEnergy = ({ dato }) => {
  const years = dato.map(item => new Date(item.date).getFullYear().toLocaleString('en-US', { useGrouping: false }));
  const carbon = dato.map(item => item.carbonfootprint);
  const energy = dato.map(item => item.generatedenergy);

  
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

