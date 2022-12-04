from uuid import UUID
from django.test import TestCase
from polls.models import *
from accounts.models import User


class TestPollModel(TestCase):
    def setUp(self):
        self.poll1 = Poll.objects.create(
            title='Some Title 1',
            description='Some Description 1',
        )

    def test_poll_can_be_created(self):
        poll = self.poll1
        self.assertEqual(poll.title, 'Some Title 1')
        self.assertEqual(poll.description, 'Some Description 1')
    
    def test_poll_uuid(self):
        poll = self.poll1
        self.assertEqual(type(poll.id), UUID)
    
    def test_str_return(self):
        poll = self.poll1
        self.assertEqual(str(poll), 'Some Title 1')
    
    def test_poll_slug(self):
        poll_slug = self.poll1.slug
        self.assertEqual(poll_slug[:5], 'poll-')
        slug_str = Poll.generate_slug(10)
        self.assertEqual(len(slug_str), 15)
        self.assertEqual(type(slug_str), str)


class TestChoiceModel(TestCase):
    def setUp(self):
        self.poll1 = Poll.objects.create(
            title='Some Title 1',
            description='Some Description 1'
        )

        self.choice1 = Choice.objects.create(
            choice_text='Some Text 1',
            poll=self.poll1
        )

    def test_choice_can_be_created(self):
        choice = self.choice1
        self.assertEqual(choice.choice_text, 'Some Text 1')
        self.assertEqual(choice.poll, self.poll1)
    
    def test_uuid(self):
        choice_uuid = self.choice1.id
        self.assertEqual(type(choice_uuid), UUID)

    def test_str_return(self):
        choice_text = self.choice1.choice_text
        poll_title = self.poll1.title
        choice_str = str(self.choice1)
        self.assertEqual(choice_str[:len(choice_text)], choice_text)
        self.assertEqual(choice_str[-len(poll_title):], poll_title)


class TestVoteModel(TestCase):
    
    def setUp(self):
        self.poll1 = Poll.objects.create(
            title='Some Title 1',
            description='Some Description 1'
        )

        self.choice1 = Choice.objects.create(
            choice_text='Some Text 1',
            poll=self.poll1
        )

        self.user1 = User.objects.create(
            username='admin',
            email='admin@admin.com'
        )

        self.vote1 = Vote.objects.create(
            choice=self.choice1,
            voted_by=self.user1,
            poll=self.poll1
        )
    
    def test_vote_creation(self):
        vote = self.vote1
        self.assertEqual(vote.choice, self.choice1)
        self.assertEqual(vote.poll, self.poll1)
        self.assertEqual(vote.voted_by, self.user1)

    def test_str_return(self):
        vote_str = str(self.vote1)
        choice_text = self.vote1.choice.choice_text
        username = self.vote1.voted_by.username
        self.assertEqual(vote_str[:len(choice_text)], choice_text)
        self.assertEqual(vote_str[-len(username):], username)

    def test_vote_uuid(self):
        vote_uuid = self.vote1.id
        self.assertEqual(type(vote_uuid), UUID)
