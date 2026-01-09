export interface Article {
    id: string;
    title: string;
    description: string;
    author: string;
    authorAvatar?: string;
    readTime: string;
    date: string;
    image: any;
    likes: number;
    comments: number;
    content: string;
}

export const articles: Article[] = [
    {
        id: '1',
        title: 'How Sunlight, the Immune System, and Covid-19 Interact',
        description: 'For thousands of years, humans have recognized that the sun plays a role in the emergence and transmission of viruses',
        author: 'Markham Heid',
        readTime: '10 min read',
        date: '20 Nov',
        image: require('../assets/articles/a1.png'),
        likes: 104,
        comments: 45,
        content: `Cognitive decline is inevitable as we get older. According to the American Psychological Association, "the brain's volume peaks in the early 20s and gradually declines for the rest of life".

But your lifestyle can slow the process. You can preserve and even enhance your mental capabilities as you age. Simple behaviour changes can help us stay sharp for as long as possible. What you do or don't do makes a huge difference to your memory skills.

Pursuing both intellectual and physical challenges, as uncomfortable as it may be, is one of the best ways to slow the natural memory decline process. New challenges are a great way to keep your brain active and healthy.`,
    },
    {
        id: '2',
        title: 'Get in Shape: Japanese Rule to a Healthy Diet',
        description: "I'm no dietician, but I have a profound interest in nutrition, food, and how we can optimize our health and well-being",
        author: 'Kaki Okumura',
        readTime: '7 min read',
        date: '12 Oct',
        image: require('../assets/articles/a2.png'),
        likes: 89,
        comments: 32,
        content: `The Japanese approach to healthy eating emphasizes balance, variety, and moderation. Traditional Japanese cuisine focuses on fresh, seasonal ingredients prepared in ways that preserve their natural flavors and nutritional value.

Key principles include eating until you're 80% full, incorporating a wide variety of foods in small portions, and making vegetables the star of every meal. This approach has contributed to Japan having one of the highest life expectancies in the world.`,
    },
    {
        id: '3',
        title: '3 Hobbies That Can Improve Your Memory',
        description: 'For thousands of years, humans have recognized that the sun plays a role in the emergence and transmission of viruses',
        author: 'Markham Heid',
        readTime: '5 min read',
        date: '23 Oct',
        image: require('../assets/articles/a3.png'),
        likes: 156,
        comments: 67,
        content: `Cognitive decline is inevitable as we get older. According to the American Psychological Association, "the brain's volume peaks in the early 20s and gradually declines for the rest of life".

But your lifestyle can slow the process. You can preserve and even enhance your mental capabilities as you age. Simple behaviour changes can help us stay sharp for as long as possible. What you do or don't do makes a huge difference to your memory skills.

Pursuing both intellectual and physical challenges, as uncomfortable as it may be, is one of the best ways to slow the natural memory decline process. New challenges are a great way to keep your brain active and healthy.`,
    },
    {
        id: '4',
        title: 'The Science Behind Improving Your Immune System',
        description: "Today I will talk about that science about your immune system that nobody ever talk about",
        author: 'Dr. Christine Bradstreet',
        readTime: '7 min read',
        date: '20 Nov',
        image: require('../assets/articles/a4.png'),
        likes: 92,
        comments: 28,
        content: `Your immune system is your body's defense mechanism against harmful pathogens. Understanding how it works can help you make better decisions about your health and wellness.

Recent research has shown that lifestyle factors like sleep, exercise, nutrition, and stress management play crucial roles in immune function. Small daily habits can have a significant impact on your body's ability to fight off infections.`,
    },
    {
        id: '5',
        title: '4 Habits Everyone Needs for Better Mental Health',
        description: 'You are what you habitually do',
        author: 'Rebeka Ratry',
        readTime: '13 min read',
        date: '23 Aug',
        image: require('../assets/articles/a5.png'),
        likes: 78,
        comments: 41,
        content: `Mental health is just as important as physical health, yet it often receives less attention. Developing healthy daily habits can significantly improve your mental well-being and overall quality of life.

These habits don't require major life changes. Simple, consistent practices like mindfulness, regular exercise, maintaining social connections, and prioritizing sleep can transform your mental health over time.`,
    },
];
