import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = ['Главная', 'Команда', 'Услуги', 'События', 'Блог', 'Контакты'];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 right-0 h-1 bg-border/30 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Button
        onClick={scrollToTop}
        size="icon"
        className={`fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg glow-effect transition-all duration-300 ${
          scrollY > 400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Наверх"
      >
        <Icon name="ArrowUp" size={24} />
      </Button>
      <nav className="fixed top-1 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">VibeTime41</h1>
            
            <div className="hidden md:flex gap-6">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90">Связаться</Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background border-primary/20">
                <div className="flex flex-col gap-6 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-lg font-medium hover:text-primary transition-colors text-left py-2 border-b border-border hover:border-primary"
                    >
                      {item}
                    </button>
                  ))}
                  <Button className="bg-primary hover:bg-primary/90 mt-4" onClick={() => scrollToSection('контакты')}>
                    Связаться
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="главная" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-float"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.4}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.3}px)` }}
        />
        
        <div 
          className="container mx-auto px-4 z-10"
          style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: Math.max(0, 1 - scrollY / 500) }}
        >
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
              Создаём Незабываемые События
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Креативная команда организаторов, превращающая идеи в яркие эмоции
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Наши проекты
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Icon name="Calendar" className="mr-2" size={20} />
                Заказать событие
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="команда" className={`py-24 bg-card/30 transition-all duration-1000 ${visibleSections.has('команда') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Наша Команда</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Профессионалы своего дела</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Анна Волкова', role: 'Арт-директор', icon: 'Palette' },
              { name: 'Михаил Сергеев', role: 'Менеджер проектов', icon: 'Briefcase' },
              { name: 'Елена Смирнова', role: 'Event-дизайнер', icon: 'Sparkles' },
              { name: 'Дмитрий Козлов', role: 'Технический директор', icon: 'Settings' }
            ].map((member, index) => (
              <Card 
                key={member.name} 
                className="p-6 text-center transition-all duration-300 bg-card border-primary/20 hover:border-primary/50 animate-slide-up hover:shadow-2xl hover:-translate-y-2 hover:shadow-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect">
                  <Icon name={member.icon as any} size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="услуги" className={`py-24 transition-all duration-1000 ${visibleSections.has('услуги') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Наши Услуги</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Полный спектр организации мероприятий</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Корпоративные события', description: 'Тимбилдинги, конференции, презентации продуктов', icon: 'Building2' },
              { title: 'Частные мероприятия', description: 'Дни рождения, свадьбы, юбилеи в уникальном стиле', icon: 'Heart' },
              { title: 'Фестивали и концерты', description: 'Музыкальные и культурные события любого масштаба', icon: 'Music' },
              { title: 'Брендинг событий', description: 'Разработка айдентики и визуального стиля мероприятия', icon: 'Paintbrush' },
              { title: 'Техническое сопровождение', description: 'Свет, звук, видео, интерактивные инсталляции', icon: 'Lightbulb' },
              { title: 'Кейтеринг и декор', description: 'Организация питания и художественное оформление', icon: 'Cake' }
            ].map((service, index) => (
              <Card 
                key={service.title} 
                className="p-8 transition-all duration-300 bg-card border-primary/20 hover:border-accent/50 animate-fade-in group hover:shadow-2xl hover:-translate-y-2 hover:shadow-accent/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={service.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="события" className={`py-24 bg-card/30 transition-all duration-1000 ${visibleSections.has('события') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Портфолио</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Наши успешные проекты</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Tech Summit 2024', category: 'Конференция', image: 'https://cdn.poehali.dev/projects/a3188ba2-7e5e-44ce-8580-14a210eb3dde/files/582c995d-fe6e-4c6f-824a-61a89dea4b89.jpg' },
              { title: 'Art Gallery Opening', category: 'Культурное событие', image: 'https://cdn.poehali.dev/projects/a3188ba2-7e5e-44ce-8580-14a210eb3dde/files/8d893137-b407-4b50-94bc-b9577d482e22.jpg' },
              { title: 'Summer Music Fest', category: 'Фестиваль', image: 'https://cdn.poehali.dev/projects/a3188ba2-7e5e-44ce-8580-14a210eb3dde/files/28f5d353-329a-4111-a864-af372d3d92c5.jpg' },
              { title: 'Corporate New Year', category: 'Корпоратив', image: 'https://cdn.poehali.dev/projects/a3188ba2-7e5e-44ce-8580-14a210eb3dde/files/582c995d-fe6e-4c6f-824a-61a89dea4b89.jpg' },
              { title: 'Wedding Dreams', category: 'Свадьба', image: 'https://cdn.poehali.dev/projects/a3188ba2-7e5e-44ce-8580-14a210eb3dde/files/8d893137-b407-4b50-94bc-b9577d482e22.jpg' },
              { title: 'Fashion Show 2024', category: 'Показ мод', image: 'https://cdn.poehali.dev/projects/a3188ba2-7e5e-44ce-8580-14a210eb3dde/files/28f5d353-329a-4111-a864-af372d3d92c5.jpg' }
            ].map((project, index) => (
              <div 
                key={project.title} 
                className="group relative overflow-hidden rounded-2xl cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/80 text-white mb-2 inline-block">{project.category}</span>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="блог" className={`py-24 transition-all duration-1000 ${visibleSections.has('блог') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Блог и Тренды</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Идеи и вдохновение для ваших событий</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: '10 трендов event-индустрии 2024', date: '15 октября 2024', icon: 'TrendingUp' },
              { title: 'Как создать незабываемый корпоратив', date: '10 октября 2024', icon: 'Users' },
              { title: 'Экологичные события: новый стандарт', date: '5 октября 2024', icon: 'Leaf' },
              { title: 'Интерактивные инсталляции на мероприятиях', date: '1 октября 2024', icon: 'Zap' },
              { title: 'Цветовые схемы для весенних событий', date: '28 сентября 2024', icon: 'Palette' },
              { title: 'Digital-инструменты для организаторов', date: '25 сентября 2024', icon: 'Smartphone' }
            ].map((post, index) => (
              <Card 
                key={post.title} 
                className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 bg-card border-primary/20 hover:border-secondary/50 animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={post.icon as any} size={24} className="text-white" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-secondary">
                  Читать далее <Icon name="ArrowRight" className="ml-1" size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className={`py-24 bg-card/30 transition-all duration-1000 ${visibleSections.has('контакты') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Свяжитесь с нами</h2>
            <p className="text-center text-muted-foreground mb-16 text-lg">Расскажите о своём событии мечты</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@vibetime41.ru</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Адрес</h3>
                    <p className="text-muted-foreground">Москва, ул. Креативная, 41</p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Мы в соцсетях</h3>
                  <div className="flex gap-4">
                    {['Instagram', 'Facebook', 'Youtube', 'Linkedin'].map((social) => (
                      <button 
                        key={social}
                        className="w-12 h-12 rounded-xl bg-card border border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      >
                        <Icon name={social as any} size={20} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="p-8 bg-card border-primary/20">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="ivan@example.com" className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Тип события</label>
                    <Input placeholder="Корпоратив, свадьба, концерт..." className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea placeholder="Расскажите о вашей идее..." className="bg-background border-border min-h-32" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 glow-effect">
                    <Icon name="Send" className="mr-2" size={20} />
                    Отправить заявку
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">© 2024 VibeTime41. Все права защищены.</p>
            <p className="text-sm text-muted-foreground">Создано с ❤️ для незабываемых событий</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;