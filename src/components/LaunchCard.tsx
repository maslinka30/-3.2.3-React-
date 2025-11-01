import { Card, Image, Text, Button } from '@mantine/core';
import { Launch } from '../types/launch';

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: (launch: Launch) => void;
}

export function LaunchCard({ launch, onSeeMore }: LaunchCardProps) {
  return (
    <Card 
      padding="lg" 
      radius="md" 
      style={{ 
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #dee2e6',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderRadius:'12px'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '20px',
        minHeight: '100px'
      }}>
        <Image
          src={launch.links.mission_patch_small!}
          height={80}
          alt={launch.mission_name}
          fit="contain"
        />
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        flex: 1
      }}>
        <Text fw={700} size="lg" style={{ marginBottom: '8px' }}>
          {launch.mission_name}
        </Text>
      <Text size="sm" style={{ color: '#666' }}>
          {launch.rocket.rocket_name}
        </Text>
      </div>

   
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        marginTop: 'auto', 
        paddingBottom: '30px'
      }}>
        <Button
          variant="filled"
          color="#228be6"
          radius="md"
          onClick={() => onSeeMore(launch)}
          styles={{
            root: {
              fontWeight: 600,
              fontSize: '14px',
              padding: '10px 30px',
              minWidth: '130px',
              backgroundColor: '#228be6',
              color: 'white',
              border: 'none',
              borderRadius: '8px'
            }
          }}
        >
          See more
        </Button>
      </div>
    </Card>
  );
}