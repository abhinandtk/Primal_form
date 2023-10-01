from rest_framework import serializers
from .models import Education, User

class NestedEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('Course', 'University', 'date')

class EducationSerializer(serializers.ModelSerializer):
    abc = NestedEducationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('Name', 'Email', 'abc')

class CombinedUserDataSerializer(serializers.ModelSerializer):
    education = NestedEducationSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = '__all__'

class EducationSerializertwo(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'  # This includes all fields in the Education model


