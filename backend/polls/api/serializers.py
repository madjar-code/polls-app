from rest_framework.serializers import \
    ModelSerializer,\
    SerializerMethodField

from polls.models import *


class ChoiceSerializer(ModelSerializer):
    
    class Meta:
        model = Choice
        fields = ('id', 'choice_text')


class VoteSerializer(ModelSerializer):

    class Meta:
        model = Vote
        fields = '__all__'


class SimplePollSerializer(ModelSerializer):
    number_of_votes = SerializerMethodField()

    class Meta:
        model = Poll
        fields = (
            'title', 'number_of_votes',
            'created_at', 'slug')

    def get_number_of_votes(self, obj):
        votes = Vote.objects.filter(poll=obj)
        return len(votes)


class PollSerializer(ModelSerializer):
    number_of_votes = SerializerMethodField()
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Poll
        fields = (
            'id', 'number_of_votes', 'created_at',
            'title', 'description', 'slug', 'choices',)
    
    def get_number_of_votes(self, obj):
        votes = Vote.objects.filter(poll=obj)
        return len(votes)
    