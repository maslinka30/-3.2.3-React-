import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image, Text, Space } from '@mantine/core';
import { Launch } from '../types/launch';

interface LaunchModalProps {
  launch: Launch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchModal({ launch, isOpen, onClose }: LaunchModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !launch) return null;

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#666',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ×
        </button>

        <Text size="xl" fw={700} style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#000' }}>
          {launch.mission_name}
        </Text>

        {launch.links.mission_patch && (
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Image
              src={launch.links.mission_patch}
              height={180}
              fit="contain"
              alt={launch.mission_name}
              fallbackSrc="https://placehold.co/300x180?text=No+Image"
            />
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <Text fw={600} size="md" style={{ marginBottom: '0.25rem', color: '#000' }}>
            Mission name:
          </Text>
          <Text size="sm" style={{ marginBottom: '1rem', color: '#666' }}>
            {launch.mission_name}
          </Text>

          <Text fw={600} size="md" style={{ marginBottom: '0.25rem', color: '#000' }}>
            Rocket name:
          </Text>
          <Text size="sm" style={{ marginBottom: '1rem', color: '#666' }}>
            {launch.rocket.rocket_name}
          </Text>
        </div>

        {launch.details && (
          <div style={{ marginBottom: '1.5rem' }}>
            <Text fw={600} size="md" style={{ marginBottom: '0.5rem', color: '#000' }}>
              Details:
            </Text>
            <Text size="sm" style={{ lineHeight: '1.5', color: '#666' }}>
              {launch.details}
            </Text>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}