import json
from django.test import TestCase
from accounts.models import User


test_user = {
    'email': 'admin@admin.com',
    'username': 'admin',
    "password": "testpassword"}


class UsersTest(TestCase):
    def setUp(self):
        self.new_user = User.objects.create(
            email=test_user['email'],
            username=test_user['username'])
        self.new_user.set_password(test_user['password'])
        self.new_user.save()

    def get_token(self):
        result = self.client.post('/api/token/',
                               data=json.dumps({
                                   'email': test_user["email"],
                                   'password': test_user["password"],
                               }),
                               content_type='application/json',
                               )
        result = json.loads(result.content)
        self.assertTrue("access" in result)
        return result["access"]
    
    def test_get_users(self):
        result = self.client.get('/api/users/',
                                 content_type='application/json')
        self.assertEqual(result.status_code, 200)

    def test_user_creation(self):
        result = self.client.post('/api/users/create/',
                                  data=json.dumps({
                                      'email': 'test@test.com',
                                      'username': 'test',
                                      'password': '12345'
                                  }),
                                  content_type='application/json')
        self.assertEqual(result.status_code, 201)
    
    def test_user_creation_wrong_data(self):
        result = self.client.post('/api/users/create/',
                                  data=json.dumps({
                                      'email': 'test@test.com',
                                      'username': 'test',
                                      'password': ''
                                  }),
                                  content_type='application/json')
        self.assertEqual(result.status_code, 400)

        result = self.client.post('/api/users/create/',
                                  data=json.dumps({
                                      'email': 'test@test.com',
                                      'username': '',
                                      'password': '12345'
                                  }),
                                  content_type='application/json')
        self.assertEqual(result.status_code, 400)

        result = self.client.post('/api/users/create/',
                                  data=json.dumps({
                                      'email': 'test@tes',
                                      'password': '12345'
                                  }),
                                  content_type='application/json')
        self.assertEqual(result.status_code, 400)
      
    def test_get_current_user(self):
        token = self.get_token()
        result = self.client.get('/api/users/current/',
                                  content_type='application/json',
                                  HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(result.status_code, 200)
    
    def test_get_current_user_wrong_data(self):
        token = '23po4ipjelkjql'
        result = self.client.get('/api/users/current/',
                                  content_type='application/json',
                                  HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(result.status_code, 401)

        result = self.client.get('/api/users/current/',
                                  content_type='application/json',)
        self.assertEqual(result.status_code, 400)

    def test_change_color(self):
        token = self.get_token()
        self.new_user.valuta = 4;
        self.new_user.save()
        result = self.client.put('/api/users/change-color/',
                                 data=json.dumps({
                                    'color': '#FCFCFC',
                                 }),
                                 content_type='application/json',
                                 HTTP_AUTHORIZATION=f'Bearer {token}'
                                 )
        self.assertEqual(result.status_code, 200)
    
    def test_change_color_wrong_data(self):
        token = self.get_token()

        # недостаточно валюты
        self.new_user.valuta = 0;
        self.new_user.save()
        result = self.client.put('/api/users/change-color/',
                                 data=json.dumps({
                                    'color': '#FCFCFC',
                                 }),
                                 content_type='application/json',
                                 HTTP_AUTHORIZATION=f'Bearer {token}'
                                 )
        self.assertEqual(result.data['error'], 'Не указан цвет или не хватает валюты')
        self.assertEqual(result.status_code, 400)
      
        # не передан токен в заголовке
        result = self.client.put('/api/users/change-color/',
                                 data=json.dumps({
                                    'color': '#FCFCFC',
                                 }),
                                 content_type='application/json',
                                 )
        self.assertEqual(result.status_code, 400)

        # не указано поле
        result = self.client.put('/api/users/change-color/',
                                 data=json.dumps({
                                 }),
                                 content_type='application/json',
                                 HTTP_AUTHORIZATION=f'Bearer {token}'
                                 )
        self.assertEqual(result.status_code, 400)
        self.assertEqual(result.data['error'], 'Нет поля color!')
      
        # неверный токен
        token = 'welrkds'
        result = self.client.put('/api/users/change-color/',
                                 data=json.dumps({
                                    'color': '#FCFCFC',
                                 }),
                                 content_type='application/json',
                                 HTTP_AUTHORIZATION=f'Bearer {token}'
                                 )
        self.assertEqual(result.status_code, 401)
  