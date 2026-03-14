import { Vocabulary, Story, SentencePractice } from '../types';

export const unit5Vocab: Vocabulary[] = [
  { id: 'u5-1', word: 'Invention', definition: 'The action of inventing something, typically a process or device.', example: 'The invention of the internet changed the world.', pronunciation: '/ɪnˈven.ʃən/', category: 'Inventions', unit: 5 },
  { id: 'u5-2', word: 'Device', definition: 'A thing made or adapted for a particular purpose, especially a piece of mechanical or electronic equipment.', example: 'A smartphone is a versatile electronic device.', pronunciation: '/dɪˈvaɪs/', category: 'Inventions', unit: 5 },
  { id: 'u5-3', word: 'Versatile', definition: 'Able to adapt or be adapted to many different functions or activities.', example: 'This tool is very versatile and can be used for many tasks.', pronunciation: '/ˈvɜː.sə.taɪl/', category: 'Inventions', unit: 5 },
  { id: 'u5-4', word: 'Portable', definition: 'Able to be easily carried or moved.', example: 'Laptops are portable computers that you can take anywhere.', pronunciation: '/ˈpɔː.tə.bəl/', category: 'Inventions', unit: 5 },
  { id: 'u5-5', word: 'Innovative', definition: 'Featuring new methods; advanced and original.', example: 'The company is known for its innovative products.', pronunciation: '/ˈɪn.ə.və.tɪv/', category: 'Inventions', unit: 5 },
];

export const unit5Stories: Story[] = [
  {
    id: 's5-1',
    title: 'The Future of Education',
    content: `In the future, technology **will change** how we learn. Students **will use** virtual reality to visit historical sites. Teachers **will be** more like mentors, guiding students through online projects. We **will not have** to carry heavy textbooks because everything **will be** on our tablets. This **will make** learning more interactive and fun for everyone.`,
    grammarFocus: 'Future Simple (Will)',
    difficulty: 'Intermediate',
    unit: 5
  }
];

export const unit5Practice: SentencePractice[] = [
  {
    id: 'p5-1',
    correctSentence: 'The internet is one of the greatest inventions of all time.',
    shuffledWords: ['greatest', 'of', 'The', 'internet', 'is', 'one', 'of', 'inventions', 'the', 'all', 'time.'],
    hint: 'A statement about modern technology.',
    unit: 5
  },
  {
    id: 'p5-2',
    correctSentence: 'A smartphone is a versatile and portable device.',
    shuffledWords: ['versatile', 'and', 'device.', 'A', 'smartphone', 'is', 'a', 'portable'],
    hint: 'Describing a common electronic gadget.',
    unit: 5
  }
];
