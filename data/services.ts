export interface ServiceCategory {
    id: string;
    name: string;
    icon: any;
    doctorIds: string[];
}

export const serviceCategories: ServiceCategory[] = [
    {
        id: '1',
        name: 'Psychologist',
        icon: require('../assets/services/s1.png'),
        doctorIds: ['3', '2', '4', '6', '8'],
    },
    {
        id: '2',
        name: 'Ophthalmologist',
        icon: require('../assets/services/s2.png'),
        doctorIds: [],
    },
    {
        id: '3',
        name: 'Dentist',
        icon: require('../assets/services/s3.png'),
        doctorIds: [],
    },
    {
        id: '4',
        name: 'Cardiologist',
        icon: require('../assets/services/s4.png'),
        doctorIds: [],
    },
    {
        id: '5',
        name: 'Nose specialist',
        icon: require('../assets/services/s5.png'),
        doctorIds: [],
    },
    {
        id: '6',
        name: 'Heart specialist',
        icon: require('../assets/services/s6.png'),
        doctorIds: [],
    },
    {
        id: '7',
        name: 'Pulmonologist',
        icon: require('../assets/services/s7.png'),
        doctorIds: [],
    },
    {
        id: '8',
        name: 'Hematologist',
        icon: require('../assets/services/s8.png'),
        doctorIds: [],
    },
    {
        id: '9',
        name: 'Hepatologist',
        icon: require('../assets/services/s9.png'),
        doctorIds: [],
    },
    {
        id: '10',
        name: 'Pancreatologist',
        icon: require('../assets/services/s10.png'),
        doctorIds: [],
    },
    {
        id: '11',
        name: 'Nephrology',
        icon: require('../assets/services/s11.png'),
        doctorIds: [],
    },
    {
        id: '12',
        name: 'gastrologist',
        icon: require('../assets/services/s12.png'),
        doctorIds: [],
    },
];
