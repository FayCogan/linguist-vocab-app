import { Vocabulary, Story, SentencePractice } from '../types';

export const unit1Vocab: Vocabulary[] = [
  { id: 'u1-1', word: 'Breadwinner', definition: 'A person who earns money to support their family.', example: 'In many families, both parents are now breadwinners.', pronunciation: '/ˈbredˌwɪn.ər/', category: 'Family Life', unit: 1 },
  { id: 'u1-2', word: 'Homemaker', definition: 'A person who manages a home and takes care of the family.', example: 'My father is a great homemaker; he cooks delicious meals every day.', pronunciation: '/ˈhəʊmˌmeɪ.kər/', category: 'Family Life', unit: 1 },
  { id: 'u1-3', word: 'Chores', definition: 'Routine tasks, especially household ones.', example: 'We all share the household chores to keep the house clean.', pronunciation: '/tʃɔːrz/', category: 'Family Life', unit: 1 },
  { id: 'u1-4', word: 'Heavy lifting', definition: 'The act of lifting or carrying heavy objects.', example: 'My brother usually does the heavy lifting in our family.', pronunciation: '/ˌhev.i ˈlɪf.tɪŋ/', category: 'Family Life', unit: 1 },
  { id: 'u1-5', word: 'Gratitude', definition: 'The quality of being thankful.', example: 'We should show gratitude to our parents for their hard work.', pronunciation: '/ˈɡræt.ɪ.tʃuːd/', category: 'Family Life', unit: 1 },
];

export const unit1Stories: Story[] = [
  {
    id: 's1-1',
    title: 'Sharing the Chores',
    content: `In my family, everyone **shares** the household chores. My father **is** the breadwinner, but he also **helps** with the cooking. My mother **is** a homemaker, and she **manages** everything at home. I **take out** the rubbish, and my sister **washes** the dishes. We **believe** that sharing chores **makes** our family stronger and happier.`,
    grammarFocus: 'Present Simple Tense',
    difficulty: 'Beginner',
    unit: 1
  }
];

export const unit1Practice: SentencePractice[] = [
  {
    id: 'p1-1',
    correctSentence: 'My mother does the laundry every weekend.',
    shuffledWords: ['laundry', 'every', 'mother', 'does', 'weekend.', 'My', 'the'],
    hint: 'A common household chore.',
    unit: 1
  },
  {
    id: 'p1-2',
    correctSentence: 'We should show gratitude to our parents.',
    shuffledWords: ['gratitude', 'to', 'parents.', 'We', 'should', 'show', 'our'],
    hint: 'Being thankful for what they do.',
    unit: 1
  }
];
