import { Vocabulary, Story, SentencePractice } from './types';
import { unit1Vocab, unit1Stories, unit1Practice } from './data/unit1';
import { unit2Vocab, unit2Stories, unit2Practice } from './data/unit2';
import { unit3Vocab, unit3Stories, unit3Practice } from './data/unit3';
import { unit4Vocab, unit4Stories, unit4Practice } from './data/unit4';
import { unit5Vocab, unit5Stories, unit5Practice } from './data/unit5';
import { unit6Vocab, unit6Stories, unit6Practice } from './data/unit6';
import { unit7Vocab, unit7Stories, unit7Practice } from './data/unit7';
import { unit8Vocab, unit8Stories, unit8Practice } from './data/unit8';

export const mockVocab: Vocabulary[] = [
  ...unit1Vocab,
  ...unit2Vocab,
  ...unit3Vocab,
  ...unit4Vocab,
  ...unit5Vocab,
  ...unit6Vocab,
  ...unit7Vocab,
  ...unit8Vocab,
];

export const mockStories: Story[] = [
  ...unit1Stories,
  ...unit2Stories,
  ...unit3Stories,
  ...unit4Stories,
  ...unit5Stories,
  ...unit6Stories,
  ...unit7Stories,
  ...unit8Stories,
];

export const mockSentences: SentencePractice[] = [
  ...unit1Practice,
  ...unit2Practice,
  ...unit3Practice,
  ...unit4Practice,
  ...unit5Practice,
  ...unit6Practice,
  ...unit7Practice,
  ...unit8Practice,
];
