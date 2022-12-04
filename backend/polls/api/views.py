from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from polls.models import *
from common.utils import get_token, get_user
from .serializers import *


@api_view(['GET'])
def get_polls(request):
    """Получение всех опросов."""
    polls = Poll.objects.filter(is_active=True)
    serializer = SimplePollSerializer(polls, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_polls_for_current_user(request):
    """
    Получение опросов, в которых проголосовал
    текущий пользователь.
    """
    token = get_token(request)
    if not token:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    user = get_user(token)
    if user:
        votes = Vote.objects.filter(voted_by=user, is_active=True)
        polls = []
        for vote in votes:
            polls.append(vote.poll)
        serializer = SimplePollSerializer(polls, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_one_poll(request, slug):
    """
    Получение одного опроса по его slug.
    Возвращается так же и информация о том,
    голосовал ли пользователь в этом опросе
    """
    is_voted = False
    main_vote = None

    token = get_token(request)
    if not token:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    user = get_user(token)

    if user:
        poll = Poll.objects.filter(slug=slug, is_active=True).first()
        user_votes = Vote.objects.filter(voted_by=user)

        for user_vote in user_votes:
            if user_vote.poll == poll:
                is_voted = True
                main_vote = user_vote
                break

        poll_serializer = PollSerializer(poll)
        vote_serializer = VoteSerializer(main_vote)
        
        return Response({
            'data': poll_serializer.data,
            'is_voted': is_voted,
            'main_vote': vote_serializer.data
        })
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def vote(request):
    """
    Голосование. Создание записи Vote по choice, poll и user
    """
    try:
        user = User.objects.filter(id=request.data['user_id'], is_active=True).first()
        choice = Choice.objects.filter(id=request.data['choice_id'], is_active=True).first()
        poll = Poll.objects.filter(id=request.data['poll_id'], is_active=True).first()
    except:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'error': 'Переданые некорректные ID или какие-то отсутствуют'})

    if user and choice and poll:
        vote = Vote.objects.create(voted_by=user, poll=poll, choice=choice)
        user.voted()
        serializer = VoteSerializer(vote)
        return Response(serializer.data)
    else:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'error': 'Переданы некорректные данные'})
