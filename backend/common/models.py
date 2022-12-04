import uuid
from django.db import models


class UUIDModel(models.Model):
    """
    Абстрактная модель для uuid
    """
    id = models.UUIDField(
        primary_key = True,
        default = uuid.uuid4,
        editable = False)
    
    class Meta:
        abstract = True


class TimeStampedModel(models.Model):
    """
    Абстрактная модель с меткой времени
    """
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True
