import { Vocabulary, Story, SentencePractice } from '../types';

export const unit6Vocab: Vocabulary[] = [
  { id: 'u6-1', word: 'Equality', definition: 'The state of being equal, especially in status, rights, and opportunities.', example: 'Gender equality is a fundamental human right.', pronunciation: '/iˈkwɒl.ə.ti/', category: 'Gender Equality', unit: 6 },
  { id: 'u6-2', word: 'Discrimination', definition: 'The unjust or prejudicial treatment of different categories of people.', example: 'We must fight against all forms of discrimination.', pronunciation: '/dɪˌskrɪm.ɪˈneɪ.ʃən/', category: 'Gender Equality', unit: 6 },
  { id: 'u6-3', word: 'Opportunity', definition: 'A set of circumstances that makes it possible to do something.', example: 'Everyone should have the same opportunity to succeed.', pronunciation: '/ˌɒp.əˈtʃuː.nə.ti/', category: 'Gender Equality', unit: 6 },
  { id: 'u6-4', word: 'Promote', definition: 'Support or actively encourage.', example: 'The campaign aims to promote gender equality in the workplace.', pronunciation: '/prəˈməʊt/', category: 'Gender Equality', unit: 6 },
  { id: 'u6-5', word: 'Eliminate', definition: 'Completely remove or get rid of something.', example: 'We need to eliminate gender bias in education.', pronunciation: '/iˈlɪm.ɪ.neɪt/', category: 'Gender Equality', unit: 6 },
];

export const unit6Stories: Story[] = [
  {
    id: 's6-1',
    title: 'Equal Opportunities',
    content: `In the past, many people **thought** that certain jobs **were** only for men or women. However, today, things **are changing**. Women **can become** pilots, and men **can work** as nurses. Everyone **should have** the same opportunities to follow their dreams. When we **promote** equality, our society **becomes** stronger and more diverse.`,
    grammarFocus: 'Modal Verbs & Present Simple',
    difficulty: 'Intermediate',
    unit: 6
  }
];

export const unit6Practice: SentencePractice[] = [
  {
    id: 'p6-1',
    correctSentence: 'Gender equality means that everyone has the same rights.',
    shuffledWords: ['equality', 'has', 'Gender', 'means', 'that', 'everyone', 'the', 'same', 'rights.'],
    hint: 'Defining a social concept.',
    unit: 6
  },
  {
    id: 'p6-2',
    correctSentence: 'We must fight against all forms of discrimination.',
    shuffledWords: ['fight', 'against', 'discrimination.', 'We', 'must', 'all', 'forms', 'of'],
    hint: 'Taking a stand for fairness.',
    unit: 6
  }
];
