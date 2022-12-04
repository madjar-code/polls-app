import string, random
from django.db import models
from accounts.models import User
from common.models import *


class Poll(UUIDModel, TimeStampedModel):
    """
    Модель самого опроса.
    """
    title = models.CharField(max_length=200)
    description =  models.TextField()
    slug = models.SlugField(
        max_length=255,
        unique=True, 
        null=True, 
        blank=True)

    class Meta:
        verbose_name = 'Опрос'
        verbose_name_plural = 'Опросы'

    def __str__(self):
        return self.title

    @staticmethod
    def generate_slug(length=6):
        """
        Генерирование slug для опроса
        """
        letters = string.ascii_letters
        random_string = ''.join(random.choice(letters) for _ in range(length))
        return f'poll-{random_string}'

    def save(self, *args, **kwargs):
        """
        Генерирование slug. Slug генерируется
        только если он еще не был создан.
        """
        if not self.slug:
            self.slug = Poll.generate_slug()
        super().save(*args, **kwargs)


class Choice(UUIDModel, TimeStampedModel):
    """
    Модель варианта выбора в голосовании
    """
    poll = models.ForeignKey(
        Poll, related_name='choices', on_delete=models.CASCADE
    )
    choice_text = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Вариант выбора'
        verbose_name_plural = 'Варианты выбора'

    def __str__(self):
        return f'{self.choice_text} <-> {self.poll}'


class Vote(UUIDModel, TimeStampedModel):
    """
    Модель голоса пользователя.
    """
    choice = models.ForeignKey(
        Choice, related_name='votes', on_delete=models.CASCADE
    )
    poll = models.ForeignKey(
        Poll, on_delete=models.CASCADE, related_name='votes'
    )
    voted_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('poll', 'voted_by',)
        verbose_name = 'Голос'
        verbose_name_plural = 'Голоса'

    def __str__(self):
        return f'{self.choice.choice_text} <-> {self.voted_by}'
