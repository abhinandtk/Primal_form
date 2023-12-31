from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.response import Response
from .models import User,Education
from .serializers import Userserializer,Educationserializer
from rest_framework.generics import UpdateAPIView

class Register(GenericAPIView):
    serializer_class = Userserializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        print(serializer)
        abc_data = data.get('abc', [])
        if serializer.is_valid():
            user=serializer.save()
            for entry in abc_data:
                course = entry.get('Course')
                university = entry.get('University')
                date = entry.get('date')
                user_id = User.objects.get(id=user.id)
                
                education = Education.objects.create(Course=course, University=university, date=date, log_id=user_id)

            return Response({'data': serializer.data, 'message': 'Data registered successfully', 'success': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Registration failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class GetCombinedData(GenericAPIView):
    serializer_class = Userserializer
    seializer_edu=Educationserializer
    def get(self, request):
        queryset = User.objects.all()
        users = []
        for user in queryset:
            education=user.education_set.all()
            user_data = self.serializer_class(user).data
            user_data['education'] = self.seializer_edu(user.education_set.all(), many=True).data
            # print(user_data)
            users.append(user_data)
        return Response({'data': users, 'message': 'All data retrieved successfully', 'success': True}, status=status.HTTP_200_OK)
    
class Deleteproduct(GenericAPIView):
    def delete(self,request,id):
        data=User.objects.get(pk=id)
        data.delete()
        return Response({'message':'Deleted successfully','success':True},status=status.HTTP_200_OK)





class Getsingleproduct(GenericAPIView):
    def get(self, request, id):
        try:
            user = User.objects.get(pk=id)
            user_data = Userserializer(user).data
            education = Education.objects.filter(log_id=user)
            education_data = Educationserializer(education, many=True).data

            response_data = {
                'data': {
                    'user': user_data,
                    'education': education_data
                },
                'message': 'Single product data',
                'success': True
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found', 'success': False}, status=status.HTTP_404_NOT_FOUND)
    

        
        


class Updatetwo(UpdateAPIView):
    serializer_class = Userserializer

    def put(self, request, id):
        user = User.objects.get(id=id)
        education = Education.objects.filter(log_id=id)
        abc = request.data.get('abc', [])
        
        existing_ids = [e.id for e in education]
        ids_to_delete = [education_id for education_id in existing_ids if education_id not in [data.get('id') for data in abc]]
        Education.objects.filter(id__in=ids_to_delete).delete()

        for data in abc:
            education_id = data.get('id')
            if education_id:
                education_record = Education.objects.get(id=education_id)
                if not data.get('Course'):
                 raise serializer.ValidationError({'Course': 'Course field cannot be blank.'})
                if not data.get('University'):
                  raise serializer.ValidationError({'University': 'University field cannot be blank.'})
                if not data.get('date'):
                  raise serializer.ValidationError({'date': 'Date field cannot be blank.'})
                education_record.Course = data['Course']
                education_record.University = data['University']
                education_record.date = data['date']
        
                # Save the updated education_record
                education_record.save()
            else:
                 if not data.get('Course'):
                  raise serializer.ValidationError({'Course': 'Course field cannot be blank.'})
                 if not data.get('University'):
                  raise serializer.ValidationError({'University': 'University field cannot be blank.'})
                 if not data.get('date'):
                  raise serializer.ValidationError({'date': 'Date field cannot be blank.'})
                 Education.objects.create(log_id=user, Course=data['Course'], University=data['University'], date=data['date'])

        user.Name = request.data.get('Name', user.Name)
        user.Email = request.data.get('Email', user.Email)
        user.save()

        serializer = self.serializer_class(instance=user,  data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Product updated successfully', 'success': True}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
