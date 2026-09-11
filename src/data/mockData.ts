import { CyrillicLetter, RussianCaseRule, Course, DialogueScenario, Badge } from '../types';

export const CYRILLIC_ALPHABET: CyrillicLetter[] = [
  { id: '1', symbol: 'А', lowercase: 'а', name: 'A', englishApprox: 'a in father', ipa: '[a]', category: 'vowel', sampleWord: 'Арбу́з', sampleTranslation: 'Watermelon', sampleTranslationEn: 'Watermelon', sampleStressIndex: 4 },
  { id: '2', symbol: 'Б', lowercase: 'б', name: 'Be', englishApprox: 'b in book', ipa: '[b]', category: 'consonant', sampleWord: 'Балала́йка', sampleTranslation: 'Balalaika', sampleTranslationEn: 'Balalaika', sampleStressIndex: 6 },
  { id: '3', symbol: 'В', lowercase: 'в', name: 'Ve', englishApprox: 'v in voice', ipa: '[v]', category: 'consonant', sampleWord: 'Волк', sampleTranslation: 'Wolf', sampleTranslationEn: 'Wolf', sampleStressIndex: 1 },
  { id: '4', symbol: 'Г', lowercase: 'г', name: 'Ge', englishApprox: 'g in go', ipa: '[ɡ]', category: 'consonant', sampleWord: 'Го́род', sampleTranslation: 'City / Town', sampleTranslationEn: 'City', sampleStressIndex: 1 },
  { id: '5', symbol: 'Д', lowercase: 'д', name: 'De', englishApprox: 'd in door', ipa: '[d]', category: 'consonant', sampleWord: 'Дом', sampleTranslation: 'House / Home', sampleTranslationEn: 'House', sampleStressIndex: 1 },
  { id: '6', symbol: 'Е', lowercase: 'е', name: 'Ye', englishApprox: 'ye in yes', ipa: '[je]', category: 'vowel', sampleWord: 'Ель', sampleTranslation: 'Spruce tree', sampleTranslationEn: 'Fir tree', sampleStressIndex: 1 },
  { id: '7', symbol: 'Ё', lowercase: 'ё', name: 'Yo', englishApprox: 'yo in yogurt', ipa: '[jo]', category: 'vowel', sampleWord: 'Ёж', sampleTranslation: 'Hedgehog', sampleTranslationEn: 'Hedgehog', sampleStressIndex: 1 },
  { id: '8', symbol: 'Ж', lowercase: 'ж', name: 'Zhe', englishApprox: 's in measure', ipa: '[ʐ]', category: 'consonant', sampleWord: 'Жук', sampleTranslation: 'Beetle / Bug', sampleTranslationEn: 'Beetle', sampleStressIndex: 1 },
  { id: '9', symbol: 'З', lowercase: 'з', name: 'Ze', englishApprox: 'z in zoo', ipa: '[z]', category: 'consonant', sampleWord: 'Зонт', sampleTranslation: 'Umbrella', sampleTranslationEn: 'Umbrella', sampleStressIndex: 1 },
  { id: '10', symbol: 'И', lowercase: 'и', name: 'Ee', englishApprox: 'ee in meet', ipa: '[i]', category: 'vowel', sampleWord: 'Игра́', sampleTranslation: 'Game / Play', sampleTranslationEn: 'Game', sampleStressIndex: 3 },
  { id: '11', symbol: 'Й', lowercase: 'й', name: 'Short Ee', englishApprox: 'y in boy', ipa: '[j]', category: 'consonant', sampleWord: 'Йо́гурт', sampleTranslation: 'Yogurt', sampleTranslationEn: 'Yogurt', sampleStressIndex: 1 },
  { id: '12', symbol: 'К', lowercase: 'к', name: 'Ka', englishApprox: 'k in kite', ipa: '[k]', category: 'consonant', sampleWord: 'Кот', sampleTranslation: 'Cat', sampleTranslationEn: 'Cat', sampleStressIndex: 1 },
  { id: '13', symbol: 'Л', lowercase: 'л', name: 'El', englishApprox: 'l in lamp', ipa: '[l]', category: 'consonant', sampleWord: 'Лимо́н', sampleTranslation: 'Lemon', sampleTranslationEn: 'Lemon', sampleStressIndex: 3 },
  { id: '14', symbol: 'М', lowercase: 'м', name: 'Em', englishApprox: 'm in mother', ipa: '[m]', category: 'consonant', sampleWord: 'Ма́ма', sampleTranslation: 'Mom / Mother', sampleTranslationEn: 'Mother', sampleStressIndex: 1 },
  { id: '15', symbol: 'Н', lowercase: 'н', name: 'En', englishApprox: 'n in net', ipa: '[n]', category: 'consonant', sampleWord: 'Ночь', sampleTranslation: 'Night', sampleTranslationEn: 'Night', sampleStressIndex: 1 },
  { id: '16', symbol: 'О', lowercase: 'о', name: 'O', englishApprox: 'o in more', ipa: '[o]', category: 'vowel', sampleWord: 'Окно́', sampleTranslation: 'Window', sampleTranslationEn: 'Window', sampleStressIndex: 3 },
  { id: '17', symbol: 'П', lowercase: 'п', name: 'Pe', englishApprox: 'p in park', ipa: '[p]', category: 'consonant', sampleWord: 'Па́па', sampleTranslation: 'Dad / Father', sampleTranslationEn: 'Father', sampleStressIndex: 1 },
  { id: '18', symbol: 'Р', lowercase: 'р', name: 'Er', englishApprox: 'rolled r', ipa: '[r]', category: 'consonant', sampleWord: 'Река́', sampleTranslation: 'River', sampleTranslationEn: 'River', sampleStressIndex: 3 },
  { id: '19', symbol: 'С', lowercase: 'с', name: 'Es', englishApprox: 's in sun', ipa: '[s]', category: 'consonant', sampleWord: 'Со́лнце', sampleTranslation: 'Sun', sampleTranslationEn: 'Sun', sampleStressIndex: 1 },
  { id: '20', symbol: 'Т', lowercase: 'т', name: 'Te', englishApprox: 't in top', ipa: '[t]', category: 'consonant', sampleWord: 'Таре́лка', sampleTranslation: 'Plate', sampleTranslationEn: 'Plate', sampleStressIndex: 3 },
  { id: '21', symbol: 'У', lowercase: 'у', name: 'Oo', englishApprox: 'oo in boot', ipa: '[u]', category: 'vowel', sampleWord: 'У́тка', sampleTranslation: 'Duck', sampleTranslationEn: 'Duck', sampleStressIndex: 1 },
  { id: '22', symbol: 'Ф', lowercase: 'ф', name: 'Ef', englishApprox: 'f in fish', ipa: '[f]', category: 'consonant', sampleWord: 'Флаг', sampleTranslation: 'Flag', sampleTranslationEn: 'Flag', sampleStressIndex: 1 },
  { id: '23', symbol: 'Х', lowercase: 'х', name: 'Kha', englishApprox: 'ch in loch / Bach', ipa: '[x]', category: 'consonant', sampleWord: 'Хлеб', sampleTranslation: 'Bread', sampleTranslationEn: 'Bread', sampleStressIndex: 1 },
  { id: '24', symbol: 'Ц', lowercase: 'ц', name: 'Tse', englishApprox: 'ts in cats', ipa: '[t͡s]', category: 'consonant', sampleWord: 'Цвето́к', sampleTranslation: 'Flower', sampleTranslationEn: 'Flower', sampleStressIndex: 4 },
  { id: '25', symbol: 'Ч', lowercase: 'ч', name: 'Che', englishApprox: 'ch in chair', ipa: '[t͡ɕ]', category: 'consonant', sampleWord: 'Ча́шка', sampleTranslation: 'Cup / Mug', sampleTranslationEn: 'Cup', sampleStressIndex: 1 },
  { id: '26', symbol: 'Ш', lowercase: 'ш', name: 'Sha', englishApprox: 'sh in shoe (hard)', ipa: '[ʂ]', category: 'consonant', sampleWord: 'Шарф', sampleTranslation: 'Scarf', sampleTranslationEn: 'Scarf', sampleStressIndex: 1 },
  { id: '27', symbol: 'Щ', lowercase: 'щ', name: 'Shcha', englishApprox: 'sh-ch in fresh cheese', ipa: '[ɕː]', category: 'consonant', sampleWord: 'Щу́ка', sampleTranslation: 'Pike fish', sampleTranslationEn: 'Pike fish', sampleStressIndex: 1 },
  { id: '28', symbol: 'Ъ', lowercase: 'ъ', name: 'Hard Sign', englishApprox: 'silent (separates consonant from vowel)', ipa: '[◌ʲ.j]', category: 'sign', isSoftOrHardSign: true, sampleWord: 'Объе́кт', sampleTranslation: 'Object', sampleTranslationEn: 'Object', sampleStressIndex: 3 },
  { id: '29', symbol: 'Ы', lowercase: 'ы', name: 'Yery', englishApprox: 'i in bit (guttural)', ipa: '[ɨ]', category: 'vowel', sampleWord: 'Ры́ба', sampleTranslation: 'Fish', sampleTranslationEn: 'Fish', sampleStressIndex: 1 },
  { id: '30', symbol: 'Ь', lowercase: 'ь', name: 'Soft Sign', englishApprox: 'silent (softens preceding consonant)', ipa: '[◌ʲ]', category: 'sign', isSoftOrHardSign: true, sampleWord: 'День', sampleTranslation: 'Day', sampleTranslationEn: 'Day', sampleStressIndex: 1 },
  { id: '31', symbol: 'Э', lowercase: 'э', name: 'Eh', englishApprox: 'e in met', ipa: '[e]', category: 'vowel', sampleWord: 'Э́хо', sampleTranslation: 'Echo', sampleTranslationEn: 'Echo', sampleStressIndex: 1 },
  { id: '32', symbol: 'Ю', lowercase: 'ю', name: 'Yoo', englishApprox: 'u in universe', ipa: '[ju]', category: 'vowel', sampleWord: 'Ю́бка', sampleTranslation: 'Skirt', sampleTranslationEn: 'Skirt', sampleStressIndex: 1 },
  { id: '33', symbol: 'Я', lowercase: 'я', name: 'Yah', englishApprox: 'ya in yard', ipa: '[ja]', category: 'vowel', sampleWord: 'Я́блоко', sampleTranslation: 'Apple', sampleTranslationEn: 'Apple', sampleStressIndex: 1 },
];

export const RUSSIAN_CASES: RussianCaseRule[] = [
  {
    caseName: 'Nominative',
    caseNameRu: 'Именительный падеж',
    questionRu: 'Кто? Что?',
    questionEn: 'Who? What? (Subject of sentence)',
    usageSummary: 'Used for the subject of a sentence. Dictionary form of words.',
    masculineEnding: '-Ø / -ь / -й (Студент, День)',
    feminineEnding: '-а / -я / -ь (Газета, Россия)',
    neuterEnding: '-о / -е / -мя (Окно, Море)',
    pluralEnding: '-ы / -и / -а (Студенты, Газеты)',
    exampleSentence: 'Студент читает интересную книгу.'
  },
  {
    caseName: 'Genitive',
    caseNameRu: 'Родительный падеж',
    questionRu: 'Кого? Чего?',
    questionEn: 'Of whom? Of what? (Possession, Absence, Quantity)',
    usageSummary: 'Shows possession ("of"), absence (нет...), numbers (2, 3, 4 + gen. sing; 5+ gen. plur), and after "у меня есть".',
    masculineEnding: '-а / -я (Студента, Дня)',
    feminineEnding: '-ы / -и (Газеты, России)',
    neuterEnding: '-а / -я (Окна, Моря)',
    pluralEnding: '-ов / -ев / -ей / -Ø (Студентов, Газет)',
    exampleSentence: 'У меня нет русского словаря.'
  },
  {
    caseName: 'Dative',
    caseNameRu: 'Дательный падеж',
    questionRu: 'Кому? Чему?',
    questionEn: 'To whom? To what? (Indirect Object, Giving, Age)',
    usageSummary: 'Used for indirect object (giving/telling to), age (Мне 20 лет), and expressions like "мне нравится".',
    masculineEnding: '-у / -ю (Студенту, Дню)',
    feminineEnding: '-е / -и (Газете, России)',
    neuterEnding: '-у / -ю (Окну, Морю)',
    pluralEnding: '-ам / -ям (Студентам, Газетам)',
    exampleSentence: 'Я звоню моему другу в Москву.'
  },
  {
    caseName: 'Accusative',
    caseNameRu: 'Винительный падеж',
    questionRu: 'Кого? Что?',
    questionEn: 'Whom? What? (Direct Object of Action)',
    usageSummary: 'Used for direct object of transitive verbs (Я люблю...), and direction of motion (в/на + acc).',
    masculineEnding: 'Inanimate: = Nom | Animate: = Gen (-а/-я)',
    feminineEnding: '-у / -ю (Газету, Россию)',
    neuterEnding: '= Nominative (-о / -е)',
    pluralEnding: 'Inanimate: = Nom | Animate: = Gen',
    exampleSentence: 'Я вижу красивую девушку на улице.'
  },
  {
    caseName: 'Instrumental',
    caseNameRu: 'Творительный падеж',
    questionRu: 'Кем? Чем?',
    questionEn: 'With whom? By means of what? (Instrument, Companion)',
    usageSummary: 'Used for instruments/means of doing something, companionship (с + inst), professions with "быть/работать".',
    masculineEnding: '-ом / -ем (Студентом, Днём)',
    feminineEnding: '-ой / -ей (Газетой, Россией)',
    neuterEnding: '-ом / -ем (Окном, Морем)',
    pluralEnding: '-ами / -ями (Студентами, Газетами)',
    exampleSentence: 'Анна пишет письмо новой ручкой.'
  },
  {
    caseName: 'Prepositional',
    caseNameRu: 'Предложный падеж',
    questionRu: 'О ком? О чём? Где?',
    questionEn: 'About whom? About what? Where? (Location)',
    usageSummary: 'Used exclusively with prepositions (в/на for location "where", о/об for "about").',
    masculineEnding: '-е / -и (о Студенте, в Музее)',
    feminineEnding: '-е / -и (в Газете, в России)',
    neuterEnding: '-е / -и (в Окне, о Море)',
    pluralEnding: '-ах / -ях (о Студентах, в Городах)',
    exampleSentence: 'Мы думаем о путешествии в Санкт-Петербург.'
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-a1',
    title: 'A1 Starter: Russian Essentials',
    titleRu: 'A1: Русский с нуля',
    level: 'A1',
    description: 'Master Cyrillic alphabet, essential greetings, numbers, gender of nouns, and basic everyday phrases.',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'a1-l1',
        courseId: 'course-a1',
        level: 'A1',
        title: 'First Words & Greetings',
        titleRu: 'Приветствия и знакомство',
        description: 'Learn formal and informal greetings, saying goodbye, and introducing your name.',
        durationMinutes: 12,
        xpReward: 50,
        grammarFocus: 'Personal pronouns (Я, Ты, Он, Она) & Present tense verb "Быть"',
        vocabulary: [
          { word: 'Привет', translation: 'Hi / Hello (informal)', pronunciation: 'Pree-vyet' },
          { word: 'Здравствуйте', translation: 'Hello (formal)', pronunciation: 'Zdrav-stvooy-tye' },
          { word: 'Меня зовут...', translation: 'My name is...', pronunciation: 'Mye-nya za-voot' },
          { word: 'Как дела?', translation: 'How are you?', pronunciation: 'Kak dye-la?' },
          { word: 'Спасибо', translation: 'Thank you', pronunciation: 'Spa-see-ba' },
          { word: 'До свидания', translation: 'Goodbye', pronunciation: 'Do svee-da-nee-ya' }
        ],
        exercises: [
          {
            id: 'e1',
            type: 'multiple_choice',
            question: 'How do you say "Thank you" formally in Russian?',
            options: [
              { id: '1', text: 'Пожалуйста (Pozhaluysta)', isCorrect: false },
              { id: '2', text: 'Спасибо (Spasibo)', isCorrect: true },
              { id: '3', text: 'Привет (Privet)', isCorrect: false },
              { id: '4', text: 'До свидания (Do svidaniya)', isCorrect: false }
            ],
            explanation: 'Спасибо (Spasibo) is the universal Russian word for "Thank you".'
          },
          {
            id: 'e2',
            type: 'drag_order',
            question: 'Assemble the sentence: "Hello, my name is Anna."',
            wordsToOrder: ['Меня', 'Здравствуйте,', 'Анна.', 'зовут'],
            correctSentence: 'Здравствуйте, Меня зовут Анна.',
            explanation: 'Sentence order: Greeting + Меня зовут (My name is) + Name.'
          },
          {
            id: 'e3',
            type: 'audio_listen',
            question: 'Listen to the audio clip. What phrase is being spoken?',
            audioPrompt: 'Как дела?',
            options: [
              { id: '1', text: 'Good morning', isCorrect: false },
              { id: '2', text: 'How are you?', isCorrect: true },
              { id: '3', text: 'Where are you from?', isCorrect: false }
            ],
            explanation: '"Как дела?" literally translates to "How are things / How are you?".'
          }
        ],
        isUnlocked: true,
        isCompleted: false
      },
      {
        id: 'a1-l2',
        courseId: 'course-a1',
        level: 'A1',
        title: 'Nouns & Gender System',
        titleRu: 'Род имён существительных',
        description: 'Understand how Russian nouns are categorized into Masculine, Feminine, and Neuter genders.',
        durationMinutes: 15,
        xpReward: 60,
        grammarFocus: 'Gender endings: -Consonant (M), -А/-Я (F), -О/-Е (N)',
        vocabulary: [
          { word: 'Дом', translation: 'House (Masculine)', pronunciation: 'Dom' },
          { word: 'Книга', translation: 'Book (Feminine)', pronunciation: 'Knee-ga' },
          { word: 'Окно', translation: 'Window (Neuter)', pronunciation: 'Ak-no' },
          { word: 'Стол', translation: 'Table (Masculine)', pronunciation: 'Stol' },
          { word: 'Семья', translation: 'Family (Feminine)', pronunciation: 'Syem-ya' }
        ],
        exercises: [
          {
            id: 'e4',
            type: 'multiple_choice',
            question: 'What is the grammatical gender of the Russian word "Книга" (Book)?',
            options: [
              { id: '1', text: 'Masculine (Мужской род)', isCorrect: false },
              { id: '2', text: 'Feminine (Женский род)', isCorrect: true },
              { id: '3', text: 'Neuter (Средний род)', isCorrect: false }
            ],
            explanation: 'Words ending in -А (like Книга) belong to the Feminine gender.'
          }
        ],
        isUnlocked: true,
        isCompleted: false
      }
    ]
  },
  {
    id: 'course-a2',
    title: 'A2 Elementary: Daily Life & Travel',
    titleRu: 'A2: Путешествия и разговорная речь',
    level: 'A2',
    description: 'Order food, navigate Russian transportation, ask for directions, and express past/future events.',
    iconName: 'Compass',
    lessons: []
  },
  {
    id: 'course-b1',
    title: 'B1 Intermediate: Mastery of Motion & Cases',
    titleRu: 'B1: Глаголы движения и падежи',
    level: 'B1',
    description: 'Master Verbs of Motion (Идти/Ехать), express complex nuances, and gain fluency in all 6 cases.',
    iconName: 'BookOpen',
    lessons: []
  },
  {
    id: 'course-b2',
    title: 'B2 Advanced: Culture, Literature & Business',
    titleRu: 'B2: Литература, культура и бизнес',
    level: 'B2',
    description: 'Explore Pushkin & Tolstoy excerpts, business negotiations, and rich Russian idioms.',
    iconName: 'Award',
    lessons: []
  }
];

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    id: 'sc1',
    title: 'Ordering at a Moscow Cafe',
    titleRu: 'В московском кафе',
    location: 'Cafe Pushkin, Moscow',
    description: 'Practice ordering coffee, pastries, and asking for the bill in Russian.',
    avatarName: 'Елена (Elena)',
    avatarRole: 'Barista / Waitress',
    messages: [
      {
        id: 'm1',
        speaker: 'avatar',
        textRu: 'Здравствуйте! Добро пожаловать! Что вы хотите заказать?',
        textEn: 'Hello! Welcome! What would you like to order?',
        audioText: 'Здравствуйте! Добро пожаловать! Что вы хотите заказать?',
        options: [
          { id: 'o1', textRu: 'Здравствуйте! Я хочу капучино и круассан, пожалуйста.', textEn: 'Hello! I want a cappuccino and a croissant, please.', isCorrect: true },
          { id: 'o2', textRu: 'До свидания, спасибо!', textEn: 'Goodbye, thank you!', isCorrect: false }
        ]
      },
      {
        id: 'm2',
        speaker: 'avatar',
        textRu: 'Отличный выбор! Кофе с сахаром или без?',
        textEn: 'Great choice! Coffee with sugar or without?',
        audioText: 'Отличный выбор! Кофе с сахаром или без?',
        options: [
          { id: 'o1', textRu: 'Без сахара, спасибо. Сколько это стоит?', textEn: 'Without sugar, thank you. How much does it cost?', isCorrect: true },
          { id: 'o2', textRu: 'Я живу в Лондоне.', textEn: 'I live in London.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'sc2',
    title: 'Buying Trans-Siberian Train Tickets',
    titleRu: 'Покупка билета на поезд',
    location: 'Yaroslavsky Railway Station, Moscow',
    description: 'Book a train ticket to Baikal and Saint Petersburg at the station window.',
    avatarName: 'Дмитрий (Dmitry)',
    avatarRole: 'Ticket Agent',
    messages: [
      {
        id: 'tm1',
        speaker: 'avatar',
        textRu: 'Добрый день! Куда вы хотите поехать?',
        textEn: 'Good day! Where do you want to travel?',
        audioText: 'Добрый день! Куда вы хотите поехать?',
        options: [
          { id: 'to1', textRu: 'Добрый день! Один билет до Санкт-Петербурга на завтра, пожалуйста.', textEn: 'Good day! One ticket to St. Petersburg for tomorrow, please.', isCorrect: true }
        ]
      }
    ]
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  selectedLanguage: 'en' as const,
  xp: 450,
  streak: 5,
  lastActiveDate: new Date().toISOString(),
  levelTitle: 'Знаток (Learner)',
  completedLessonIds: [],
  bookmarkedWords: ['Здравствуйте', 'Спасибо', 'Балалайка'],
  badges: [
    { id: 'b1', name: 'Cyrillic Explorer', nameRu: 'Исследователь Азбуки', description: 'Explored all 33 Cyrillic letters with audio soundboard.', icon: '🔤', unlockedAt: '2026-09-10' },
    { id: 'b2', name: '5-Day Streak', nameRu: '5 дней подряд', description: 'Practiced Russian 5 days in a row without missing.', icon: '🔥', unlockedAt: '2026-09-11' }
  ]
};
