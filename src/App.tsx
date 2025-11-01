import React from 'react';
import { Container, Title, LoadingOverlay, Alert } from '@mantine/core';
import { useLaunches } from './hooks/useLaunches';
import { LaunchCard } from './components/LaunchCard';
import { LaunchModal } from './components/LaunchModal';

function App() {
  const { launches, isLoading, error, selectedLaunch, isModalOpen, selectLaunch, closeModal } =
    useLaunches();

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title 
        order={1} 
        ta="center" 
        style={{ 
          fontSize: '2rem',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: '30px'
        }}
      >
        SpaceX Launches 2020
      </Title>

      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 300px)',
          gap: '24px',
          justifyContent: 'center',
          width: '100%'
        }}>
          {launches.map((launch) => (
            <LaunchCard key={launch.flight_number} launch={launch} onSeeMore={selectLaunch} />
          ))}
        </div>
      </div>

      <LaunchModal launch={selectedLaunch} isOpen={isModalOpen} onClose={closeModal} />
    </Container>
  );
}

export default App;