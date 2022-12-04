import jwt
from accounts.models import User
from backend.settings import SECRET_KEY


def get_token(request):
    try:
        token = request.headers['Authorization'].split()[1]
    except KeyError:
        return None
    return token


def get_user(token):
    user_id = jwt.decode(
        token,
        key=SECRET_KEY,
        algorithms="HS256")['user_id']
    return User.objects.filter(id=user_id).first()