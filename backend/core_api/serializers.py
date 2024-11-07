from .models import Notebook, Note, Reminder

from rest_framework import serializers

class NotebookSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Notebook
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Note 

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Reminder
