from django.test import TestCase
from accounts.models import User
import json

test_users = [
  {'email': 'test@test.com', 'password': 'testpassword1'},
  {'email': 'admin@admin.com', 'password': 'testpassword2'},
]

not_logged = [
  {'email': 'some@some.com', 'password': 'testpassword2'},
]


class LoginTest(TestCase):
    def setUp(self):
        # создаем пользователей
        for user in test_users:
            new_user = User.objects.create(email=user['email'])
            new_user.set_password(user['password'])
            new_user.save()
    
    def test_login(self):
        # зарегистрированный пользователь
        USER1 = test_users[0]
        res = self.client.post(
            '/api/token/',
            data=json.dumps({
                'email': USER1['email'],
                'password': USER1['password'],
            }),
            content_type='application/json',
            )
        result = json.loads(res.content)
        self.assertTrue('access' in result)

        # незарегистрированный пользователь
        USER2 = not_logged[0]
        res = self.client.post(
            '/api/token/',
            data=json.dumps({
                'email': USER2['email'],
                'password': USER2['password'],
            }),
            content_type='application/json',
            )
        result = json.loads(res.content)
        self.assertTrue('access' not in result)