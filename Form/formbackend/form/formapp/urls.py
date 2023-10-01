from django.urls import path
from .import views

urlpatterns = [
    path('Register',views.Register.as_view(),name='Register'),
    path('GetCombinedData',views.GetCombinedData.as_view(),name='GetCombinedData'),
    path('Deleteproduct/<int:id>',views.Deleteproduct.as_view(),name='Deleteproduct'),
    path('Getsingleproduct/<int:id>',views.Getsingleproduct.as_view(),name='Getsingleproduct'),
    path('Updatetwo/<int:id>',views.Updatetwo.as_view(),name='Updatetwo'),
]
