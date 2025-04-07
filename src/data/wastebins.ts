
import { WasteBin } from '@/types/wastebin';

// Sample data for waste bins
export const wasteBinData: WasteBin[] = [
  {
    id: 'bin-001',
    name: 'Central Park Bin 1',
    location: {
      latitude: 40.7812,
      longitude: -73.9665,
      address: 'Central Park, New York, NY'
    },
    fillLevel: 75,
    lastUpdated: '2025-04-07T08:30:00Z',
    binType: 'general',
    status: 'operational'
  },
  {
    id: 'bin-002',
    name: 'Times Square Bin 2',
    location: {
      latitude: 40.7580,
      longitude: -73.9855,
      address: 'Times Square, New York, NY'
    },
    fillLevel: 25,
    lastUpdated: '2025-04-07T09:15:00Z',
    binType: 'recyclable',
    status: 'operational'
  },
  {
    id: 'bin-003',
    name: 'Brooklyn Bridge Bin 3',
    location: {
      latitude: 40.7061,
      longitude: -73.9969,
      address: 'Brooklyn Bridge, New York, NY'
    },
    fillLevel: 90,
    lastUpdated: '2025-04-07T07:45:00Z',
    binType: 'general',
    status: 'maintenance'
  },
  {
    id: 'bin-004',
    name: 'Empire State Bin 4',
    location: {
      latitude: 40.7484,
      longitude: -73.9857,
      address: 'Empire State Building, New York, NY'
    },
    fillLevel: 15,
    lastUpdated: '2025-04-07T10:00:00Z',
    binType: 'organic',
    status: 'operational'
  },
  {
    id: 'bin-005',
    name: 'Grand Central Bin 5',
    location: {
      latitude: 40.7527,
      longitude: -73.9772,
      address: 'Grand Central Terminal, New York, NY'
    },
    fillLevel: 95,
    lastUpdated: '2025-04-07T06:30:00Z',
    binType: 'general',
    status: 'operational'
  },
  {
    id: 'bin-006',
    name: 'Battery Park Bin 6',
    location: {
      latitude: 40.7032,
      longitude: -74.0153,
      address: 'Battery Park, New York, NY'
    },
    fillLevel: 55,
    lastUpdated: '2025-04-07T11:15:00Z',
    binType: 'recyclable',
    status: 'offline'
  },
  {
    id: 'bin-007',
    name: 'Chinatown Bin 7',
    location: {
      latitude: 40.7159,
      longitude: -73.9970,
      address: 'Chinatown, New York, NY'
    },
    fillLevel: 68,
    lastUpdated: '2025-04-07T09:45:00Z',
    binType: 'organic',
    status: 'operational'
  },
  {
    id: 'bin-008',
    name: 'SoHo Bin 8',
    location: {
      latitude: 40.7233,
      longitude: -74.0023,
      address: 'SoHo, New York, NY'
    },
    fillLevel: 35,
    lastUpdated: '2025-04-07T10:30:00Z',
    binType: 'hazardous',
    status: 'operational'
  },
  {
    id: 'bin-009',
    name: 'Madison Square Bin 9',
    location: {
      latitude: 40.7420,
      longitude: -73.9890,
      address: 'Madison Square Garden, New York, NY'
    },
    fillLevel: 82,
    lastUpdated: '2025-04-07T08:00:00Z',
    binType: 'general',
    status: 'maintenance'
  },
  {
    id: 'bin-010',
    name: 'Central Park North Bin 10',
    location: {
      latitude: 40.7892,
      longitude: -73.9545,
      address: 'Central Park North, New York, NY'
    },
    fillLevel: 42,
    lastUpdated: '2025-04-07T11:00:00Z',
    binType: 'recyclable',
    status: 'operational'
  }
];
