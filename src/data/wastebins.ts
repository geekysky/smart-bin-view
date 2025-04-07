
import { WasteBin } from '@/types/wastebin';

// Sample data for waste bins in Pune, India
export const wasteBinData: WasteBin[] = [
  {
    id: 'bin-001',
    name: 'Shivaji Nagar Bin 1',
    location: {
      latitude: 18.5308,
      longitude: 73.8478,
      address: 'Shivaji Nagar, Pune, Maharashtra'
    },
    fillLevel: 75,
    lastUpdated: '2025-04-07T08:30:00Z',
    binType: 'general',
    status: 'operational'
  },
  {
    id: 'bin-002',
    name: 'Koregaon Park Bin 2',
    location: {
      latitude: 18.5362,
      longitude: 73.8902,
      address: 'Koregaon Park, Pune, Maharashtra'
    },
    fillLevel: 25,
    lastUpdated: '2025-04-07T09:15:00Z',
    binType: 'recyclable',
    status: 'operational'
  },
  {
    id: 'bin-003',
    name: 'Swargate Bin 3',
    location: {
      latitude: 18.5018,
      longitude: 73.8636,
      address: 'Swargate, Pune, Maharashtra'
    },
    fillLevel: 90,
    lastUpdated: '2025-04-07T07:45:00Z',
    binType: 'general',
    status: 'maintenance'
  },
  {
    id: 'bin-004',
    name: 'Kothrud Bin 4',
    location: {
      latitude: 18.5074,
      longitude: 73.8077,
      address: 'Kothrud, Pune, Maharashtra'
    },
    fillLevel: 15,
    lastUpdated: '2025-04-07T10:00:00Z',
    binType: 'organic',
    status: 'operational'
  },
  {
    id: 'bin-005',
    name: 'Aundh Bin 5',
    location: {
      latitude: 18.5590,
      longitude: 73.8353,
      address: 'Aundh, Pune, Maharashtra'
    },
    fillLevel: 95,
    lastUpdated: '2025-04-07T06:30:00Z',
    binType: 'general',
    status: 'operational'
  },
  {
    id: 'bin-006',
    name: 'Viman Nagar Bin 6',
    location: {
      latitude: 18.5679,
      longitude: 73.9143,
      address: 'Viman Nagar, Pune, Maharashtra'
    },
    fillLevel: 55,
    lastUpdated: '2025-04-07T11:15:00Z',
    binType: 'recyclable',
    status: 'offline'
  },
  {
    id: 'bin-007',
    name: 'Camp Bin 7',
    location: {
      latitude: 18.5126,
      longitude: 73.8791,
      address: 'Camp, Pune, Maharashtra'
    },
    fillLevel: 68,
    lastUpdated: '2025-04-07T09:45:00Z',
    binType: 'organic',
    status: 'operational'
  },
  {
    id: 'bin-008',
    name: 'Hadapsar Bin 8',
    location: {
      latitude: 18.5089,
      longitude: 73.9260,
      address: 'Hadapsar, Pune, Maharashtra'
    },
    fillLevel: 35,
    lastUpdated: '2025-04-07T10:30:00Z',
    binType: 'hazardous',
    status: 'operational'
  },
  {
    id: 'bin-009',
    name: 'Baner Bin 9',
    location: {
      latitude: 18.5612,
      longitude: 73.7868,
      address: 'Baner, Pune, Maharashtra'
    },
    fillLevel: 82,
    lastUpdated: '2025-04-07T08:00:00Z',
    binType: 'general',
    status: 'maintenance'
  },
  {
    id: 'bin-010',
    name: 'Hinjewadi Bin 10',
    location: {
      latitude: 18.5918,
      longitude: 73.7380,
      address: 'Hinjewadi, Pune, Maharashtra'
    },
    fillLevel: 42,
    lastUpdated: '2025-04-07T11:00:00Z',
    binType: 'recyclable',
    status: 'operational'
  }
];
