import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Tour {
  id: number;
  title: string;
  region: string;
  activity: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  duration: number;
  price: number;
  season: string[];
  image: string;
  description: string;
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Горные вершины Алтая',
    region: 'Алтай',
    activity: 'Треккинг',
    difficulty: 'Сложный',
    duration: 7,
    price: 45000,
    season: ['Лето', 'Осень'],
    image: 'https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/97a8ae89-6454-4f7f-8ba0-e59b7e3e94d1.jpg',
    description: 'Покорение высочайших вершин с профессиональными гидами',
  },
  {
    id: 2,
    title: 'Сплав по диким рекам',
    region: 'Карелия',
    activity: 'Сплав',
    difficulty: 'Средний',
    duration: 5,
    price: 28000,
    season: ['Лето'],
    image: 'https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/7108b63a-0f5d-4e75-aefb-d7a571067f71.jpg',
    description: 'Адреналин и живописные пейзажи северных рек',
  },
  {
    id: 3,
    title: 'Фрирайд в Хибинах',
    region: 'Кольский полуостров',
    activity: 'Лыжи',
    difficulty: 'Средний',
    duration: 4,
    price: 35000,
    season: ['Зима'],
    image: 'https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/faf23756-ed42-4a07-a3c9-974f74c702c2.jpg',
    description: 'Катание по нетронутым склонам заполярных гор',
  },
  {
    id: 4,
    title: 'Велотур по Байкалу',
    region: 'Байкал',
    activity: 'Велосипед',
    difficulty: 'Легкий',
    duration: 6,
    price: 32000,
    season: ['Лето', 'Осень'],
    image: 'https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/97a8ae89-6454-4f7f-8ba0-e59b7e3e94d1.jpg',
    description: 'Путешествие вдоль священного озера на велосипеде',
  },
  {
    id: 5,
    title: 'Треккинг к вулканам',
    region: 'Камчатка',
    activity: 'Треккинг',
    difficulty: 'Сложный',
    duration: 10,
    price: 85000,
    season: ['Лето'],
    image: 'https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/97a8ae89-6454-4f7f-8ba0-e59b7e3e94d1.jpg',
    description: 'Экспедиция к действующим вулканам полуострова',
  },
  {
    id: 6,
    title: 'Прогулка по тайге',
    region: 'Алтай',
    activity: 'Пеший поход',
    difficulty: 'Легкий',
    duration: 3,
    price: 18000,
    season: ['Лето', 'Осень', 'Весна'],
    image: 'https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/97a8ae89-6454-4f7f-8ba0-e59b7e3e94d1.jpg',
    description: 'Спокойный маршрут для первого знакомства с природой',
  },
];

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [durationRange, setDurationRange] = useState<number[]>([1, 14]);

  const filteredTours = tours.filter((tour) => {
    if (selectedRegion !== 'all' && tour.region !== selectedRegion) return false;
    if (selectedActivity !== 'all' && tour.activity !== selectedActivity) return false;
    if (selectedDifficulty !== 'all' && tour.difficulty !== selectedDifficulty) return false;
    if (selectedSeason !== 'all' && !tour.season.includes(selectedSeason)) return false;
    if (tour.price < priceRange[0] || tour.price > priceRange[1]) return false;
    if (tour.duration < durationRange[0] || tour.duration > durationRange[1]) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легкий':
        return 'bg-secondary text-secondary-foreground';
      case 'Средний':
        return 'bg-accent text-accent-foreground';
      case 'Сложный':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/8af0ec18-2b42-426c-b156-46c6109bac11/files/97a8ae89-6454-4f7f-8ba0-e59b7e3e94d1.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Ваш идеальный тур
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Активный отдых по самым красивым уголкам России
          </p>
          <Button size="lg" className="text-lg px-8 py-6 animate-scale-in">
            Подобрать тур
            <Icon name="ArrowDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Найдите свое приключение</h2>
          <p className="text-muted-foreground text-lg">
            Используйте фильтры для поиска идеального маршрута
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12 p-6 bg-card rounded-xl shadow-sm">
          <div>
            <label className="text-sm font-medium mb-2 block">Регион</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Все регионы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все регионы</SelectItem>
                <SelectItem value="Алтай">Алтай</SelectItem>
                <SelectItem value="Карелия">Карелия</SelectItem>
                <SelectItem value="Кольский полуостров">Кольский полуостров</SelectItem>
                <SelectItem value="Байкал">Байкал</SelectItem>
                <SelectItem value="Камчатка">Камчатка</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Тип активности</label>
            <Select value={selectedActivity} onValueChange={setSelectedActivity}>
              <SelectTrigger>
                <SelectValue placeholder="Все виды" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все виды</SelectItem>
                <SelectItem value="Треккинг">Треккинг</SelectItem>
                <SelectItem value="Сплав">Сплав</SelectItem>
                <SelectItem value="Лыжи">Лыжи</SelectItem>
                <SelectItem value="Велосипед">Велосипед</SelectItem>
                <SelectItem value="Пеший поход">Пеший поход</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Сложность</label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Любая" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая</SelectItem>
                <SelectItem value="Легкий">Легкий</SelectItem>
                <SelectItem value="Средний">Средний</SelectItem>
                <SelectItem value="Сложный">Сложный</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Сезон</label>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Любой" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой</SelectItem>
                <SelectItem value="Лето">Лето</SelectItem>
                <SelectItem value="Зима">Зима</SelectItem>
                <SelectItem value="Весна">Весна</SelectItem>
                <SelectItem value="Осень">Осень</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 block">
              Бюджет: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={100000}
              step={5000}
              className="mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 block">
              Продолжительность: {durationRange[0]} - {durationRange[1]} дней
            </label>
            <Slider
              value={durationRange}
              onValueChange={setDurationRange}
              min={1}
              max={14}
              step={1}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-muted-foreground">
            Найдено туров: <span className="font-semibold text-foreground">{filteredTours.length}</span>
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedRegion('all');
              setSelectedActivity('all');
              setSelectedDifficulty('all');
              setSelectedSeason('all');
              setPriceRange([0, 100000]);
              setDurationRange([1, 14]);
            }}
          >
            <Icon name="RotateCcw" className="mr-2" size={16} />
            Сбросить фильтры
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, index) => (
            <Card
              key={tour.id}
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(tour.difficulty)}>
                    {tour.difficulty}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {tour.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {tour.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    {tour.region}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="Activity" size={16} className="mr-2" />
                    {tour.activity}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {tour.duration} {tour.duration === 1 ? 'день' : tour.duration < 5 ? 'дня' : 'дней'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {tour.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Подробнее
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-16">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Туры не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить параметры поиска
            </p>
            <Button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedActivity('all');
                setSelectedDifficulty('all');
                setSelectedSeason('all');
                setPriceRange([0, 100000]);
                setDurationRange([1, 14]);
              }}
            >
              Сбросить все фильтры
            </Button>
          </div>
        )}
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Award" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Опытные гиды</h3>
              <p className="text-muted-foreground">
                Профессионалы с многолетним опытом организации туров
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Безопасность</h3>
              <p className="text-muted-foreground">
                Современное снаряжение и страховка для каждого участника
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Heart" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Незабываемые эмоции</h3>
              <p className="text-muted-foreground">
                Приключения, которые останутся с вами навсегда
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">О компании</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Наша команда</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Туры</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Специальные предложения</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Календарь туров</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Полезное</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Подготовка к туру</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-2" />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2" />
                  info@tours.ru
                </li>
                <li className="flex items-center">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Москва, Россия
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2024 Активный отдых. Ваш идеальный тур по России</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
