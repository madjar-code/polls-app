from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('', get_all_users, name='all_users'),
    path('current/', get_current_user, name='current_user'),
    path('change-color/', change_color, name='change_color'),
    path('change-current/', put_current_user, name='current_user'),
    path('create/', create_user, name='create_user'),
    path('<slug:slug>/', get_user_by_slug, name='some_user'),
]