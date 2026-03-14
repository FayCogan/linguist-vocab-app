import { Vocabulary, Story, SentencePractice } from '../types';

export const unit8Vocab: Vocabulary[] = [
  { id: 'u8-1', word: 'Blended learning', definition: 'A style of education combining online and face-to-face teaching.', example: 'Blended learning allows students to study at their own pace.', pronunciation: '/ˌblen.dɪd ˈlɜː.nɪŋ/', category: 'New Ways to Learn', unit: 8 },
  { id: 'u8-2', word: 'Digital', definition: 'Involving or relating to the use of computer technology.', example: 'Digital tools can enhance the learning experience.', pronunciation: '/ˈdɪdʒ.ɪ.təl/', category: 'New Ways to Learn', unit: 8 },
  { id: 'u8-3', word: 'Platform', definition: 'A standard for the hardware of a computer system.', example: 'The online platform provides many resources for students.', pronunciation: '/ˈplæt.fɔːm/', category: 'New Ways to Learn', unit: 8 },
  { id: 'u8-4', word: 'Flexible', definition: 'Able to be easily modified to respond to altered circumstances.', example: 'Online learning offers a flexible schedule for students.', pronunciation: '/ˈflek.sə.bəl/', category: 'New Ways to Learn', unit: 8 },
  { id: 'u8-5', word: 'Interaction', definition: 'Reciprocal action or influence.', example: 'Face-to-face interaction is still important in education.', pronunciation: '/ˌin.təˈræk.ʃən/', category: 'New Ways to Learn', unit: 8 }
];

export const unit8Stories: Story[] = [
  {
    id: 's8-1',
    title: 'New Ways to Learn',
    content: `Today, students **have** many new ways to learn. Blended learning **is** a popular method that **combines** traditional teaching with online resources. Digital platforms **allow** students to access materials anytime and anywhere. This **makes** learning more flexible and personalized. However, face-to-face interaction **remains** important for developing social skills.`,
    grammarFocus: 'Present Simple Tense',
    difficulty: 'Intermediate',
    unit: 8
  }
];

export const unit8Practice: SentencePractice[] = [
  {
    id: 'p8-1',
    correctSentence: 'Blended learning combines online and face-to-face study.',
    shuffledWords: ['learning', 'online', 'and', 'face-to-face', 'Blended', 'combines', 'study.'],
    hint: 'A modern educational approach.',
    unit: 8
  },
  {
    id: 'p8-2',
    correctSentence: 'Digital tools can enhance the learning experience.',
    shuffledWords: ['tools', 'can', 'experience.', 'Digital', 'enhance', 'the', 'learning'],
    hint: 'Technology in the classroom.',
    unit: 8
  }
];
