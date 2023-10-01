from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.response import Response
from .models import User,Education
from .serializers import EducationSerializer,NestedEducationSerializer,CombinedUserDataSerializer,EducationSerializertwo
from rest_framework.generics import UpdateAPIView  # Import UpdateAPIView from rest_framework.generics



# Create your views here.

class Register(GenericAPIView):
    serializer_class = EducationSerializer

    def post(self, request):
        data = request.data
        Name = data.get('Name')
        Email = data.get('Email')
        abc_data = data.get('abc', [])

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            user = User.objects.create(Name=Name, Email=Email)

            education_entries = []

            for entry in abc_data:
                course = entry.get('Course')
                university = entry.get('University')
                date = entry.get('date')
                
                # Retrieve the User instance
                user_instance = User.objects.get(id=user.id)
                
                # Create Education objects with the associated User instance
                education = Education.objects.create(Course=course, University=university, date=date, log_id=user_instance)
                education_entries.append(education)

            return Response({'data': serializer.data, 'message': 'Data registered successfully', 'success': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Registration failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class Getalldata(GenericAPIView):
    serializer_class = EducationSerializer
    
    def get(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'all set', 'success': True}, status=status.HTTP_200_OK)


class Getedu(GenericAPIView):
    serializer_class = NestedEducationSerializer
    
    def get(self, request):
        queryset = Education.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'all set', 'success': True}, status=status.HTTP_200_OK)
    

class GetCombinedData(GenericAPIView):
    serializer_class = CombinedUserDataSerializer
    
    def get(self, request):
        queryset = User.objects.all()
        # print(queryset)
        # for user in queryset:
        #  print(f"User ID: {user.id}")
        #  print(f"Username: {user.Name}")
        #  print(f"Email: {user.Email}")
        users = []
        
        for user in queryset:
            user_data = self.serializer_class(user).data
           

            user_data['education'] = NestedEducationSerializer(user.education_set.all(), many=True).data
            print(user_data)
            user_data['id'] = user.id 
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
            user_data = CombinedUserDataSerializer(user).data
            
            education = Education.objects.filter(log_id=user)
            education_data = EducationSerializertwo(education, many=True).data

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
    
class UpdateEducation(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CombinedUserDataSerializer

    def update(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = User.objects.prefetch_related('educations').get(pk=user_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found', 'success': False}, status=status.HTTP_404_NOT_FOUND)

        user_serializer = CombinedUserDataSerializer(instance=user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()

            # Update the nested "education" objects
            education_data = request.data.get('education', [])  # Assuming 'education' is the key for nested data
            for index, education_item in enumerate(education_data):
                education_id = education_item.get('id')  # Assuming there's an 'id' field in the nested data
                if education_id:
                    education_obj = Education.objects.get(pk=education_id)
                    education_serializer = NestedEducationSerializer(instance=education_obj, data=education_item, partial=True)
                    if education_serializer.is_valid():
                        education_serializer.save()
                else:
                    # Handle case where a new education item needs to be created
                    education_serializer = NestedEducationSerializer(data=education_item)
                    if education_serializer.is_valid():
                        education_serializer.save(log_id=user)

            return Response({'message': 'Education updated successfully', 'success': True})
        else:
            return Response({'message': 'Update failed', 'errors': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        


class Updatetwo(UpdateAPIView):
    serializer_class = EducationSerializer

    def put(self, request, id):
        # Get the user and education records for the provided id
        user = User.objects.get(id=id)
        education = Education.objects.filter(log_id=id)

        # Extract the 'abc' data from the request
        abc = request.data.get('abc', [])

        # Collect IDs of education records to delete
        existing_ids = [e.id for e in education]
        ids_to_delete = [education_id for education_id in existing_ids if education_id not in [data.get('id') for data in abc]]

        # Delete education records that are not in the updated 'abc' list
        Education.objects.filter(id__in=ids_to_delete).delete()

        # Update or create education records
        for data in abc:
            education_id = data.get('id')
            if education_id:
                # Update existing education record
                education_record = Education.objects.get(id=education_id)
                education_record.Course = data['Course']
                education_record.University = data['University']
                education_record.date = data['date']
                education_record.save()
            else:
                # Create new education record
                Education.objects.create(log_id=user, Course=data['Course'], University=data['University'], date=data['date'])

        # Update user data
        user.Name = request.data.get('Name', user.Name)
        user.Email = request.data.get('Email', user.Email)
        user.save()

        serializer = self.serializer_class(instance=user, partial=True, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Product updated successfully', 'success': True}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
