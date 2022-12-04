from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('polls/', get_polls, name='all_polls'),
    path('polls/vote/', vote, name='vote'),
    path('polls/for-current-user/', get_polls_for_current_user, name='get_polls_for_current_user'),
    path('polls/<slug:slug>', get_one_poll, name='one_poll'),    
]