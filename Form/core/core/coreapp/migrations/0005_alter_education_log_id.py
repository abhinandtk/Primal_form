# Generated by Django 4.1.1 on 2023-09-29 10:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coreapp', '0004_education_course_education_university_education_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='log_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='educations', to='coreapp.user'),
        ),
    ]
