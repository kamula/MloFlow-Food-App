# Generated by Django 4.2.4 on 2023-08-22 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authapp", "0004_rename_is_first_time_login_user_if_first_time_login"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="category",
            field=models.CharField(
                choices=[
                    ("customer", "Customer"),
                    ("admin", "admin"),
                    ("chef", "Chef"),
                    ("vendor", "Vendor"),
                ],
                max_length=50,
            ),
        ),
    ]