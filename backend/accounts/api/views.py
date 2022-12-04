from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.models import User
from .serializers import \
    RegisterUserSerializer,\
    UserSerializer
from common.utils import get_token, get_user


@api_view(['GET'])
def get_all_users(request):
    """Получение всех пользователей."""
    users = User.objects.filter(is_active=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    """Созданиие пользователя."""
    register_serializer = RegisterUserSerializer(data=request.data)
    if register_serializer.is_valid():
        new_user = register_serializer.save()
        if new_user:
            return Response(status=status.HTTP_201_CREATED)
    return Response(
        register_serializer.errors,
        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_by_slug(request, slug):
    """Получение пользователя по его slug"""
    user = User.objects.filter(slug=slug, is_active=True).first()
    if user:
        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_current_user(request):
    """Получение текущего пользователя по токену"""
    token = get_token(request)
    if not token:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    user = get_user(token)
    if user:
        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def put_current_user(request):
    """Редактирование текущего пользователя"""
    data = request.data
    token = get_token(request)
    if not token:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    user = get_user(token)

    if user:
        user.username = data['username']
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def change_color(request):
    """Изменение цвета фона для текущего пользователя"""
    data = request.data
    token = get_token(request)
    if not token:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    user = get_user(token)
    if user:
        try:
            color = data['color']
        except KeyError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'error': 'Нет поля color!'}
            )
        if color and user.valuta >= 3:
            user.background_color = color
            user.valuta -= 3
            user.save()
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'error': 'Не указан цвет или не хватает валюты'})

        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)