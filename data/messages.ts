export interface Message {
    id: string;
    doctorName: string;
    doctorImage: any;
    lastMessage: string;
    timestamp: string;
    isOnline: boolean;
    unread: boolean;
}

export const messages: Message[] = [
    {
        id: '1',
        doctorName: 'Dr Rebbeka',
        doctorImage: require('../assets/message/m1.png'),
        lastMessage: 'You have to be more carefull...',
        timestamp: 'Just Now',
        isOnline: true,
        unread: false,
    },
    {
        id: '2',
        doctorName: 'Dr Rafsan jani',
        doctorImage: require('../assets/message/m2.png'),
        lastMessage: 'You: See you soon',
        timestamp: 'Tue',
        isOnline: true,
        unread: true,
    },
    {
        id: '3',
        doctorName: 'Dr Fillmore',
        doctorImage: require('../assets/message/m1.png'),
        lastMessage: 'You: Thanks doctor...',
        timestamp: '27 Oct',
        isOnline: false,
        unread: false,
    },
    {
        id: '4',
        doctorName: 'Dr B. Sick',
        doctorImage: require('../assets/message/m2.png'),
        lastMessage: 'You: Soon i will make an appointment...',
        timestamp: '15 Oct',
        isOnline: false,
        unread: false,
    },
    {
        id: '5',
        doctorName: 'Dr Watamaniuk',
        doctorImage: require('../assets/message/m1.png'),
        lastMessage: 'Okay got it...',
        timestamp: '1 Sep',
        isOnline: false,
        unread: false,
    },
];

export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    senderImage?: any;
    message: string;
    timestamp: string;
    type: 'text' | 'image' | 'video-call';
    duration?: string;
}

export const chatMessages: ChatMessage[] = [
    {
        id: '1',
        senderId: 'doctor',
        senderName: 'Dr Rafsan jani',
        senderImage: require('../assets/message/m2.png'),
        message: 'Hello Zesan, how can I help you ?',
        timestamp: 'Tue 12:30',
        type: 'text',
    },
    {
        id: '2',
        senderId: 'user',
        senderName: 'You',
        message: 'Hey Rafsan, thanks for your instant response. I am going through a lot of problems, I want to share my situation by giving a video call.',
        timestamp: 'Tue 12:32',
        type: 'text',
    },
    {
        id: '3',
        senderId: 'doctor',
        senderName: 'Dr Rafsan jani',
        senderImage: require('../assets/message/m2.png'),
        message: 'I see, sure you can',
        timestamp: 'Tue 12:32',
        type: 'text',
    },
    {
        id: '4',
        senderId: 'user',
        senderName: 'You',
        message: 'Video chat',
        timestamp: 'Tue 12:33',
        type: 'video-call',
        duration: '40 mins',
    },
    {
        id: '5',
        senderId: 'doctor',
        senderName: 'Dr Rafsan jani',
        senderImage: require('../assets/message/m2.png'),
        message: 'Here is your prescription',
        timestamp: 'Tue 01:13',
        type: 'image',
    },
    {
        id: '6',
        senderId: 'user',
        senderName: 'You',
        message: 'Thank for your help , See you soon.',
        timestamp: 'Tue 01:14',
        type: 'text',
    },
];
