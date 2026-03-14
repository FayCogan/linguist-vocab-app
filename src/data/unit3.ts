import { Vocabulary, Story, SentencePractice } from '../types';

export const unit3Vocab: Vocabulary[] = [
  { id: 'u3-1', word: 'Talented', definition: 'Having a natural ability to do something well.', example: 'She is a talented musician who plays the piano beautifully.', pronunciation: '/ˈtæl.ən.tɪd/', category: 'Music', unit: 3 },
  { id: 'u3-2', word: 'Performance', definition: 'An act of staging or presenting a play, concert, or other form of entertainment.', example: 'The band gave a fantastic performance last night.', pronunciation: '/pəˈfɔː.məns/', category: 'Music', unit: 3 },
  { id: 'u3-3', word: 'Instrument', definition: 'An object or device for producing musical sounds.', example: 'The guitar is a popular musical instrument.', pronunciation: '/ˈɪn.strə.mənt/', category: 'Music', unit: 3 },
  { id: 'u3-4', word: 'Audience', definition: 'The assembled spectators or listeners at a public event.', example: 'The audience cheered loudly at the end of the concert.', pronunciation: '/ˈɔː.di.əns/', category: 'Music', unit: 3 },
  { id: 'u3-5', word: 'Judge', definition: 'A person who decides the results of a competition.', example: 'The judges were impressed by the young singer\'s voice.', pronunciation: '/dʒʌdʒ/', category: 'Music', unit: 3 },
];

export const unit3Stories: Story[] = [
  {
    id: 's3-1',
    title: 'The Talent Show',
    content: `Next month, our school **will host** a talent show. Many students **will participate** and **showcase** their skills. I **will play** the guitar, and my friend **will sing** a popular song. We **hope** the audience **will enjoy** our performance. The judges **will decide** the winner at the end of the night. It **will be** an exciting event for everyone.`,
    grammarFocus: 'Future Simple (Will)',
    difficulty: 'Beginner',
    unit: 3
  }
];

export const unit3Practice: SentencePractice[] = [
  {
    id: 'p3-1',
    correctSentence: 'She is a talented musician who plays the piano.',
    shuffledWords: ['talented', 'musician', 'plays', 'piano.', 'She', 'is', 'a', 'who', 'the'],
    hint: 'Describing someone with musical skills.',
    unit: 3
  },
  {
    id: 'p3-2',
    correctSentence: 'The audience cheered loudly after the performance.',
    shuffledWords: ['cheered', 'loudly', 'performance.', 'The', 'audience', 'after', 'the'],
    hint: 'Reaction to a good show.',
    unit: 3
  }
];
