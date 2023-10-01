from rest_framework import serializers
from .models import Education, User
        
class Educationserializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__' 


class Userserializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'




