from django.urls import path
from .import views

urlpatterns = [
    path('Register',views.Register.as_view(),name='Register'),
    path('Getalldata',views.Getalldata.as_view(),name='Getalldata'),
    path('Getedu',views.Getedu.as_view(),name='Getedu'),
    path('GetCombinedData',views.GetCombinedData.as_view(),name='GetCombinedData'),
    path('Deleteproduct/<int:id>',views.Deleteproduct.as_view(),name='Deleteproduct'),
    path('Getsingleproduct/<int:id>',views.Getsingleproduct.as_view(),name='Getsingleproduct'),
    path('UpdateEducation/<int:id>',views.UpdateEducation.as_view(),name='UpdateEducation'),
    path('Updatetwo/<int:id>',views.Updatetwo.as_view(),name='Updatetwo'),
]
