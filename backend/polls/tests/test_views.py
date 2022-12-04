import json
from django.test import TestCase
from accounts.models import User
from polls.models import *


test_user = {
    'email': 'admin@admin.com',
    'username': 'admin',
    "password": "testpassword"}


class PollsTest(TestCase):
    def setUp(self):
        self.new_user = User.objects.create(
            email=test_user['email'],
            username=test_user['username'])
        self.new_user.set_password(test_user['password'])
        self.new_user.save()

        self.new_poll = Poll.objects.create(
            title='Some Title',
            description='Some Description'
        )

        self.new_choice = Choice.objects.create(
            choice_text='Some Text',
            poll=self.new_poll
        )

    def get_token(self):
        res = self.client.post('/api/token/',
                               data=json.dumps({
                                   'email': test_user["email"],
                                   'password': test_user["password"],
                               }),
                               content_type='application/json',
                               )
        result = json.loads(res.content)
        self.assertTrue("access" in result)
        return result["access"]
    
    def test_get_polls(self):
        result = self.client.get('/api/polls/',
                                 content_type='application/json')
        self.assertEqual(result.status_code, 200)

    def test_get_polls_for_current_user(self):
        token = self.get_token()
        result = self.client.get('/api/polls/for-current-user/',
                                 content_type='application/json',
                                 HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(result.status_code, 200)

    def test_get_polls_for_current_user_wrong_data(self):
        token = 'werwera'
        result = self.client.get('/api/polls/for-current-user/',
                                 content_type='application/json',
                                 HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(result.status_code, 401)

        result = self.client.get('/api/polls/for-current-user/',
                                 content_type='application/json')
        self.assertEqual(result.status_code, 400)

    def test_vote(self):
        result = self.client.post('/api/polls/vote/',
                                  data=json.dumps({
                                      'user_id': str(self.new_user.id),
                                      'choice_id': str(self.new_choice.id),
                                      'poll_id': str(self.new_poll.id)
                                  }),
                                  content_type='application/json',
                                  )
        self.assertEqual(result.status_code, 200)

    def test_vote_wrong_data(self):
        result = self.client.post('/api/polls/vote/',
                                  data=json.dumps({
                                      'user_id': '2343432',
                                      'choice_id': '1232131',
                                      'poll_id': '132131'
                                  }),
                                  content_type='application/json',
                                  )
        self.assertEqual(result.status_code, 400)
        self.assertEqual(
            result.data['error'],
            'Переданые некорректные ID или какие-то отсутствуют')

        result = self.client.post('/api/polls/vote/',
                                  data=json.dumps({
                                      'user_id': str(self.new_user.id),
                                  }),
                                  content_type='application/json',
                                  )
        self.assertEqual(result.status_code, 400)
        self.assertEqual(
            result.data['error'],
            'Переданые некорректные ID или какие-то отсутствуют')        
