import { Vocabulary, Story, SentencePractice } from '../types';

export const unit7Vocab: Vocabulary[] = [
  { id: 'u7-1', word: 'International', definition: 'Existing, occurring, or carried on between two or more nations.', example: 'The United Nations is an international organization.', pronunciation: '/ˌɪn.təˈnæʃ.ən.əl/', category: 'Viet Nam & Int. Org.', unit: 7 },
  { id: 'u7-2', word: 'Participate', definition: 'Take part in an action or endeavor.', example: 'Viet Nam participates in many international activities.', pronunciation: '/pɑːˈtɪs.ɪ.peɪt/', category: 'Viet Nam & Int. Org.', unit: 7 },
  { id: 'u7-3', word: 'Cooperation', definition: 'The process of working together to the same end.', example: 'International cooperation is essential for global peace.', pronunciation: '/kəʊˌɒp.ərˈeɪ.ʃən/', category: 'Viet Nam & Int. Org.', unit: 7 },
  { id: 'u7-4', word: 'Development', definition: 'The process of developing or being developed.', example: 'The organization supports the economic development of the region.', pronunciation: '/dɪˈvel.əp.mənt/', category: 'Viet Nam & Int. Org.', unit: 7 },
  { id: 'u7-5', word: 'Relationship', definition: 'The way in which two or more concepts, objects, or people are connected.', example: 'The two countries have a strong diplomatic relationship.', pronunciation: '/rɪˈleɪ.ʃən.ʃɪp/', category: 'Viet Nam & Int. Org.', unit: 7 },
];

export const unit7Stories: Story[] = [
  {
    id: 's7-1',
    title: 'Viet Nam and the UN',
    content: `Viet Nam **joined** the United Nations in 1977. Since then, the relationship between Viet Nam and the UN **has developed** significantly. Viet Nam **participates** actively in UN activities, including peacekeeping missions. The UN **provides** support for Viet Nam's socio-economic development. This cooperation **helps** promote peace and stability in the region and the world.`,
    grammarFocus: 'Present Perfect & Present Simple',
    difficulty: 'Intermediate',
    unit: 7
  }
];

export const unit7Practice: SentencePractice[] = [
  {
    id: 'p7-1',
    correctSentence: 'Viet Nam participates in many international activities.',
    shuffledWords: ['participates', 'in', 'activities.', 'Viet', 'Nam', 'many', 'international'],
    hint: 'Our country\'s involvement in the world.',
    unit: 7
  },
  {
    id: 'p7-2',
    correctSentence: 'International cooperation is essential for global peace.',
    shuffledWords: ['cooperation', 'is', 'peace.', 'International', 'essential', 'for', 'global'],
    hint: 'Working together for a better world.',
    unit: 7
  }
];
