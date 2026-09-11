import { SRSCardItem } from '../types';

export const calculateNextSRSReview = (
  card: SRSCardItem,
  rating: 'again' | 'hard' | 'good' | 'easy'
): SRSCardItem => {
  let newBox = card.box;
  let daysToAdd = 1;

  if (rating === 'again') {
    newBox = 1;
    daysToAdd = 0.5; // Review again today / half day
  } else if (rating === 'hard') {
    newBox = Math.max(1, card.box);
    daysToAdd = 1;
  } else if (rating === 'good') {
    newBox = Math.min(5, card.box + 1);
    const intervals = [1, 2, 4, 7, 15];
    daysToAdd = intervals[newBox - 1] || 1;
  } else if (rating === 'easy') {
    newBox = Math.min(5, card.box + 2);
    const intervals = [1, 3, 7, 14, 30];
    daysToAdd = intervals[newBox - 1] || 1;
  }

  const now = new Date();
  const nextDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  return {
    ...card,
    box: newBox,
    lastReviewed: now.toISOString(),
    nextReviewDate: nextDate.toISOString()
  };
};

export const INITIAL_SRS_CARDS: SRSCardItem[] = [
  {
    id: 'srs-1',
    word: 'Здравствуйте',
    translation: 'Hello (Formal)',
    pronunciation: 'Zdrav-stvooy-tye',
    exampleRu: 'Здравствуйте, профессор!',
    exampleEn: 'Hello, professor!',
    box: 1,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'srs-2',
    word: 'Спасибо',
    translation: 'Thank you',
    pronunciation: 'Spa-see-ba',
    exampleRu: 'Большое спасибо за помощь.',
    exampleEn: 'Thank you very much for your help.',
    box: 2,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'srs-3',
    word: 'Пожалуйста',
    translation: 'You are welcome / Please',
    pronunciation: 'Po-zha-loy-sta',
    exampleRu: 'Скажите, пожалуйста, где метро?',
    exampleEn: 'Tell me, please, where is the metro?',
    box: 1,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'srs-4',
    word: 'Балалайка',
    translation: 'Balalaika (Russian musical instrument)',
    pronunciation: 'Ba-la-lay-ka',
    exampleRu: 'Он отлично играет на балалайке.',
    exampleEn: 'He plays the balalaika excellently.',
    box: 1,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: new Date().toISOString()
  },
  {
    id: 'srs-5',
    word: 'До свидания',
    translation: 'Goodbye',
    pronunciation: 'Do svee-da-nee-ya',
    exampleRu: 'До свидания, до скорой встречи!',
    exampleEn: 'Goodbye, see you soon!',
    box: 2,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: new Date().toISOString()
  }
];
