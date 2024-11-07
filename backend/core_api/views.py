from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import NotebookSerializer, NoteSerializer, ReminderSerializer
from .models import Notebook, Note, Reminder
from django.db.models.manager import BaseManager
from django.core.exceptions import PermissionDenied

class NotebookListCreate(generics.ListCreateAPIView):
    serializer_class = NotebookSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self) -> BaseManager[Notebook]:
        # Filter notebooks by the active user
        return Notebook.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user to the active user on creation
        serializer.save(user=self.request.user)

class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NotebookSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self) -> BaseManager[Notebook]:
        # Filter notebooks by the active user
        return Notebook.objects.filter(user=self.request.user)

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self) -> BaseManager[Note]:
        # Filter notes by the active user
        return Note.objects.filter(notebook__user=self.request.user)

    def perform_create(self, serializer):
        # Ensure the user owns the notebook before allowing note creation
        notebook = serializer.validated_data['notebook']
        if notebook.user != self.request.user:
            raise PermissionDenied("You do not have permission to add notes to this notebook.")
        serializer.save()

class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self) -> BaseManager[Note]:
        # Filter notes by the active user
        return Note.objects.filter(notebook__user=self.request.user)

class ReminderListCreate(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self) -> BaseManager[Reminder]:
        # Filter reminders by the active user
        return Reminder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Ensure the user owns the note before allowing reminder creation
        note = serializer.validated_data['note']
        if note.notebook.user != self.request.user:
            raise PermissionDenied("You do not have permission to add reminders to this note.")
        serializer.save(user=self.request.user)

class ReminderDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self) -> BaseManager[Reminder]:
        # Filter reminders by the active user
        return Reminder.objects.filter(user=self.request.user)
