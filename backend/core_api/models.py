from django.db import models
from django.contrib.auth.models import User
from django.db.models.manager import BaseManager

class Notebook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Reminder(models.Model):
    title = models.CharField(max_length=200)
    deadline = models.DateTimeField()
    confidence_score = models.FloatField()
    is_reminder = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} -- {self.deadline}'

