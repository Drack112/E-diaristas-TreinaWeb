# Generated by Django 3.2.5 on 2021-08-18 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_alter_diaria_data_atendimento"),
    ]

    operations = [
        migrations.AlterField(
            model_name="diaria",
            name="complemento",
            field=models.CharField(blank=True, max_length=100),
        ),
    ]