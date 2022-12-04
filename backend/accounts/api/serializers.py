from rest_framework.serializers import ModelSerializer
from accounts.models import User


class RegisterUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(ModelSerializer):
  
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email',
            'password', 'slug', 'valuta',
            'ncs', 'background_color')

        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
