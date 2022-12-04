from django.test import TestCase
from accounts.models import User


class TestUserModel(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(
            username = 'admin',
            email = 'admin@admin.com'
        )

    def test_user_can_be_created(self):
        user = self.user1
        self.assertEqual(user.username,'admin')

    def test_str_return(self):
        user = self.user1
        self.assertEqual(str(user), 'admin')

    def test_user_slug(self):
        user_slug = self.user1.slug
        self.assertEqual(user_slug[:6], 'admin-')
    
    def test_some_fields(self):
        user = self.user1
        self.assertEqual(user.ncs, 0)
        self.assertEqual(user.valuta, 0)
        self.assertEqual(user.background_color,'#FCFCFC')
    
    def test_code_generation(self):
        result = User.generate_user_string(10)
        self.assertEqual(type(result), str)