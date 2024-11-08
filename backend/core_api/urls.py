from django.urls import path
from .views import (
    NotebookListCreate, 
    NotebookDetail, 
    NoteListCreate, 
    NoteDetail, 
    ReminderListCreate, 
    ReminderDetail
)

urlpatterns = [
    path("notebooks/", NotebookListCreate.as_view()),
    path("notebooks/<int:pk>/", NotebookDetail.as_view()),
    path("notebooks/<int:notebook_id>/notes/", NoteListCreate.as_view()),
    path("notebooks/<int:notebook_id>/notes/<int:pk>", NoteDetail.as_view()),
    path("reminders/", ReminderListCreate.as_view()),
    path("reminders/<int:pk>/", ReminderDetail.as_view()),
]
