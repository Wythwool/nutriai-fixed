window.NUTRIAI_DATA = {
  chapters: [
    { id: 'hero', number: '01', title: 'Старт' },
    { id: 'story', number: '02', title: 'Проблема' },
    { id: 'sport', number: '03', title: 'Спорт' },
    { id: 'coach', number: '04', title: 'Тренер' },
    { id: 'challenge', number: '05', title: 'Виклик' },
    { id: 'app', number: '06', title: 'Додаток' },
    { id: 'results', number: '07', title: 'Результат' },
    { id: 'progress', number: '08', title: 'Графік' },
    { id: 'voice', number: '09', title: 'Відгук' },
    { id: 'future', number: '10', title: 'Плани' },
    { id: 'download', number: '11', title: 'Скачати' },
    { id: 'final', number: '12', title: 'Фінал' }
  ],

  features: {
    scan: {
      icon: '🥗',
      kicker: 'камера і аналіз',
      title: 'Фото їжі і розрахунок КБЖУ',
      text: 'Користувач робить фото. Додаток показує приблизні калорії, білки, жири і вуглеводи.',
      tags: ['калорії', 'білки', 'жири', 'вуглеводи']
    },
    menu: {
      icon: '🍽️',
      kicker: 'меню на тиждень',
      title: 'Меню під ціль',
      text: 'Список страв під ціль, вік, активність і звички користувача.',
      tags: ['сніданок', 'обід', 'вечеря', 'перекуси']
    },
    water: {
      icon: '💧',
      kicker: 'норма і нагадування',
      title: 'Контроль води протягом дня',
      text: 'Додаток рахує норму води, зберігає напої і нагадує про питний режим.',
      tags: ['вода', 'чай', 'кава', 'нагадування']
    },
    steps: {
      icon: '🚶',
      kicker: 'рух щодня',
      title: 'Кроки і денна ціль',
      text: 'Шагомір показує активність за день, ціль і стабільність користувача.',
      tags: ['кроки', 'цілі', 'дні', 'нагороди']
    }
  },

  weights: [
    { label: 'Старт', month: '0', weight: 103 },
    { label: 'Міс. 1', month: '1', weight: 99 },
    { label: 'Міс. 2', month: '2', weight: 95 },
    { label: 'Міс. 3', month: '3', weight: 92 },
    { label: 'Міс. 4', month: '4', weight: 89 },
    { label: 'Міс. 5', month: '5', weight: 87 },
    { label: 'Міс. 6', month: '6', weight: 85 },
    { label: 'Міс. 7', month: '7', weight: 84 },
    { label: 'Зараз', month: '8', weight: 83 }
  ]
};
