import { Vocabulary, Story, SentencePractice } from '../types';

export const unit2Vocab: Vocabulary[] = [
  { id: 'u2-1', word: 'Eco-friendly', definition: 'Not harmful to the environment.', example: 'We should use eco-friendly products to protect our planet.', pronunciation: '/ˌiː.kəʊˈfrend.li/', category: 'Environment', unit: 2 },
  { id: 'u2-2', word: 'Carbon footprint', definition: 'The amount of carbon dioxide released due to someone\'s activities.', example: 'Walking to school helps reduce your carbon footprint.', pronunciation: '/ˌkɑː.bən ˈfʊt.prɪnt/', category: 'Environment', unit: 2 },
  { id: 'u2-3', word: 'Sustainable', definition: 'Able to be maintained at a certain rate or level.', example: 'Sustainable development is crucial for the future of our planet.', pronunciation: '/səˈsteɪ.nə.bəl/', category: 'Environment', unit: 2 },
  { id: 'u2-4', word: 'Awareness', definition: 'Knowledge or perception of a situation or fact.', example: 'We need to raise awareness about environmental protection.', pronunciation: '/əˈweə.nəs/', category: 'Environment', unit: 2 },
  { id: 'u2-5', word: 'Litter', definition: 'Trash, such as paper, cans, and bottles, that is left lying in an open or public place.', example: 'Don\'t leave your litter in the park; put it in the bin.', pronunciation: '/ˈlɪt.ər/', category: 'Environment', unit: 2 },
];

export const unit2Stories: Story[] = [
  {
    id: 's2-1',
    title: 'A Green Weekend',
    content: `Last weekend, my family **decided** to have a green weekend. We **did not use** any plastic bags when we **went** shopping. Instead, we **brought** our own reusable bags. My brother **picked up** litter in the park, and I **planted** some flowers in the garden. We **felt** very happy because we **helped** protect the environment. It **was** a small step, but it **made** a big difference.`,
    grammarFocus: 'Past Simple Tense',
    difficulty: 'Beginner',
    unit: 2
  }
];

export const unit2Practice: SentencePractice[] = [
  {
    id: 'p2-1',
    correctSentence: 'We should reduce our carbon footprint to protect the Earth.',
    shuffledWords: ['reduce', 'carbon', 'to', 'protect', 'We', 'should', 'footprint', 'our', 'the', 'Earth.'],
    hint: 'Advice for environmental protection.',
    unit: 2
  },
  {
    id: 'p2-2',
    correctSentence: 'Sustainable development is crucial for our future.',
    shuffledWords: ['development', 'crucial', 'future.', 'Sustainable', 'is', 'for', 'our'],
    hint: 'Long-term planning for the planet.',
    unit: 2
  }
];
