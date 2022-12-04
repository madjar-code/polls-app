from django.contrib import admin
from .models import *


@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    search_fields = ('title', 'description',)
    list_display = ('title', 'slug', 'is_active',)
    list_filter = ('is_active', 'title',)
    ordering = ('-created_at', '-updated_at',)
    readonly_fields = ('created_at', 'updated_at', 'slug')


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    search_fields = ('choice_text', 'poll',)
    list_display = ('choice_text', 'poll',)
    list_filter = ('poll',)
    ordering = ('-created_at', '-updated_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    search_fields = ('voted_by',)
    list_display = ('choice', 'voted_by')
    list_filter = ('poll', )
    ordering = ('-created_at', '-updated_at',)
    readonly_fields = ('created_at', 'updated_at')
