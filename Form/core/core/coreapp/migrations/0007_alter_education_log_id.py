# Generated by Django 4.1.1 on 2023-10-04 05:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coreapp', '0006_alter_education_log_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='log_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coreapp.user'),
        ),
    ]