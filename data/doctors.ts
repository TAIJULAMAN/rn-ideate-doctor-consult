export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    specialties: string[];
    image: any;
    rating: number;
    reviewsCount: number;
    yearsExperience: number;
    about: string;
    serviceCharge: number;
    hasInstantService: boolean;
}

export const doctors: Doctor[] = [
    {
        id: '1',
        name: 'Dr Rebbeka',
        specialty: 'Reproductive Psychiatry',
        specialties: ['Reproductive Psychiatry', 'Psychiatry'],
        image: require('../assets/girls/g1.png'),
        rating: 5.0,
        reviewsCount: 220,
        yearsExperience: 6,
        about: 'Dr. Rebbeka is a Clinical Professor of Psychiatry, Obstetrics, Gynecology, and Reproductive Science at the Icahn School of Medicine at Mount Sinai which she first joined in 2007. She is an Attending in Psychiatry at Mount Sinai Medical Center. She also maintains a private practice in New York City.',
        serviceCharge: 49,
        hasInstantService: true,
    },
    {
        id: '2',
        name: 'Shari I. Lusskin, MD',
        specialty: 'Psychology',
        specialties: ['Psychology', 'TeleMedicine'],
        image: require('../assets/girls/g2.png'),
        rating: 4.8,
        reviewsCount: 330,
        yearsExperience: 9,
        about: 'Dr. Shari I. Lusskin is a renowned psychologist specializing in TeleMedicine and modern therapeutic approaches. She has extensive experience in treating anxiety, depression, and stress-related disorders.',
        serviceCharge: 55,
        hasInstantService: true,
    },
    {
        id: '3',
        name: 'Dr. Bruce Scott Hoffman, PHD',
        specialty: 'Psychology',
        specialties: ['Psychology', 'Cognitive Therapy'],
        image: require('../assets/girls/g1.png'),
        rating: 4.9,
        reviewsCount: 575,
        yearsExperience: 15,
        about: 'Dr. Bruce Scott Hoffman is a Clinical Psychologist with over 15 years of experience. He specializes in cognitive behavioral therapy and has helped thousands of patients overcome mental health challenges.',
        serviceCharge: 65,
        hasInstantService: false,
    },
    {
        id: '4',
        name: 'Alnetta Hooper, PsyD',
        specialty: 'Psychology',
        specialties: ['Psychology', 'TeleMedicine'],
        image: require('../assets/girls/g2.png'),
        rating: 4.7,
        reviewsCount: 1100,
        yearsExperience: 13,
        about: 'Dr. Alnetta Hooper is a licensed psychologist specializing in teletherapy and digital mental health solutions. She is passionate about making mental health care accessible to everyone.',
        serviceCharge: 50,
        hasInstantService: true,
    },
    {
        id: '5',
        name: 'Dr. Kelly Geisler',
        specialty: 'Psychiatry',
        specialties: ['Psychiatry', 'Mental Health'],
        image: require('../assets/girls/g1.png'),
        rating: 4.6,
        reviewsCount: 765,
        yearsExperience: 12,
        about: 'Dr. Kelly Geisler is a board-certified psychiatrist with expertise in treating mood disorders, anxiety, and PTSD. She takes a holistic approach to mental health care.',
        serviceCharge: 60,
        hasInstantService: false,
    },
    {
        id: '6',
        name: 'Dr Fillmore',
        specialty: 'Psychology',
        specialties: ['Psychology', 'TeleMedicine'],
        image: require('../assets/girls/g2.png'),
        rating: 4.8,
        reviewsCount: 390,
        yearsExperience: 8,
        about: 'Dr. Fillmore is a dedicated psychologist who specializes in online therapy and counseling. He has a warm, empathetic approach that puts patients at ease.',
        serviceCharge: 45,
        hasInstantService: true,
    },
    {
        id: '7',
        name: 'Dr B. Sick',
        specialty: 'Reproductive Psychiatry',
        specialties: ['Reproductive Psychiatry', 'Psychiatry'],
        image: require('../assets/girls/g1.png'),
        rating: 4.5,
        reviewsCount: 111,
        yearsExperience: 4,
        about: 'Dr. B. Sick is a specialist in reproductive psychiatry, helping women navigate mental health challenges during pregnancy and postpartum periods.',
        serviceCharge: 52,
        hasInstantService: false,
    },
    {
        id: '8',
        name: 'Dr Benin',
        specialty: 'Psychology',
        specialties: ['Psychology', 'Family Therapy'],
        image: require('../assets/girls/g2.png'),
        rating: 4.9,
        reviewsCount: 445,
        yearsExperience: 11,
        about: 'Dr. Benin is an experienced psychologist specializing in family therapy and relationship counseling. She helps families build stronger, healthier connections.',
        serviceCharge: 58,
        hasInstantService: true,
    },
];
