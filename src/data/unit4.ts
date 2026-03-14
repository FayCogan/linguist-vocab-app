import { Vocabulary, Story, SentencePractice } from '../types';

export const unit4Vocab: Vocabulary[] = [
  { id: 'u4-1', word: 'Volunteer', definition: 'A person who freely offers to take part in a task.', example: 'Many students volunteer at the local food bank.', pronunciation: '/ˌvɒl.ənˈtɪər/', category: 'Community', unit: 4 },
  { id: 'u4-2', word: 'Charity', definition: 'An organization set up to provide help and raise money for those in need.', example: 'The charity provides food and shelter for the homeless.', pronunciation: '/ˈtʃær.ə.ti/', category: 'Community', unit: 4 },
  { id: 'u4-3', word: 'Donation', definition: 'Something that is given to a charity, especially money.', example: 'We made a small donation to the children\'s hospital.', pronunciation: '/dəʊˈneɪ.ʃən/', category: 'Community', unit: 4 },
  { id: 'u4-4', word: 'Disadvantaged', definition: 'Lacking in the basic resources or conditions believed to be necessary for an equal position in society.', example: 'The program helps disadvantaged children in remote areas.', pronunciation: '/ˌdɪs.ədˈvɑːn.tɪdʒd/', category: 'Community', unit: 4 },
  { id: 'u4-5', word: 'Meaningful', definition: 'Having a serious, relevant, or useful purpose or value.', example: 'Volunteering is a meaningful way to spend your free time.', pronunciation: '/ˈmiː.nɪŋ.fəl/', category: 'Community', unit: 4 },
];

export const unit4Stories: Story[] = [
  {
    id: 's4-1',
    title: 'Helping Others',
    content: `Last summer, I **volunteered** at a local charity. I **helped** distribute food to disadvantaged families. It **was** a very meaningful experience for me. I **met** many kind people who **dedicated** their time to helping others. We **collected** many donations from the community. I **realized** that even small actions **can make** a big difference in someone's life.`,
    grammarFocus: 'Past Simple & Modals',
    difficulty: 'Intermediate',
    unit: 4
  }
];

export const unit4Practice: SentencePractice[] = [
  {
    id: 'p4-1',
    correctSentence: 'Volunteering is a meaningful way to spend your time.',
    shuffledWords: ['meaningful', 'way', 'time.', 'Volunteering', 'is', 'a', 'to', 'spend', 'your'],
    hint: 'A positive activity for the community.',
    unit: 4
  },
  {
    id: 'p4-2',
    correctSentence: 'We made a donation to the local charity.',
    shuffledWords: ['donation', 'to', 'charity.', 'We', 'made', 'a', 'the', 'local'],
    hint: 'Giving money to help others.',
    unit: 4
  }
];
