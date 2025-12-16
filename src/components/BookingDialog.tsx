import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface BookingDialogProps {
  tourTitle: string;
  tourPrice: number;
  tourDuration: number;
  children: React.ReactNode;
}

const BookingDialog = ({ tourTitle, tourPrice, tourDuration, children }: BookingDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState<string>('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const totalPrice = tourPrice * parseInt(participants || '1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !name || !email || !phone) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: `Мы свяжемся с вами в ближайшее время для подтверждения бронирования тура "${tourTitle}"`,
    });

    setOpen(false);
    setDate(undefined);
    setParticipants('1');
    setName('');
    setEmail('');
    setPhone('');
    setComment('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Забронировать тур</DialogTitle>
          <DialogDescription>
            {tourTitle} • {tourDuration} {tourDuration === 1 ? 'день' : tourDuration < 5 ? 'дня' : 'дней'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Дата начала тура *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Icon name="Calendar" className="mr-2" size={16} />
                    {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Количество участников *</Label>
              <Select value={participants} onValueChange={setParticipants}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'человек' : num < 5 ? 'человека' : 'человек'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Стоимость за человека:</span>
              <span className="font-medium">{tourPrice.toLocaleString()} ₽</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Количество участников:</span>
              <span className="font-medium">{participants}</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Итого:</span>
              <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Контактная информация</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Дополнительные пожелания или вопросы"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg" className="flex-1">
              <Icon name="Check" className="mr-2" size={18} />
              Отправить заявку
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => setOpen(false)}>
              Отмена
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая "Отправить заявку", вы соглашаетесь с условиями обработки персональных данных
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
