from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Note, Reminder
from openai import OpenAI
from datetime import datetime
import json
from django.conf import Settings
from load_dotenv import load_dotenv
import os
from django.core.exceptions import ValidationError
from django.utils import timezone

# Initialize the OpenAI client with your API key
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@receiver(post_save, sender=Note)
def create_reminder_from_note(sender, instance: Note, created: bool, **kwargs):

    current_date = datetime.now().isoformat()
    
    prompt =  f"""
                    You are a reminder extraction agent. Today's date is {current_date}.
                    Interpret any date mentioned in the user input in the context of the current date and year.

                    Always return your final answer as a valid JSON object with these fields:
                    {{
                        "title": "str",
                        "deadline": ISO datetime string,
                        "confidence_score": float,
                        "is_reminder": boolean
                    }}

                    If a time isn't mentioned in the note, use a default time of 15:59 PM.
                    """
    
    if created or instance.content:
        try:
            response = client.chat.completions.create(
                model="chatgpt-4o-latest",
                messages=[
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": instance.content
                            }
                        ]
                    }
                ],
                temperature=1,
                max_tokens=2048,
                top_p=1,
                frequency_penalty=1,
                presence_penalty=0,
                response_format={
                    "type": "text"
                }
            )
            response_text: str = response.choices[0].to_dict()["message"]["content"].strip()
            reminder_data = json.loads(response_text)

            if reminder_data['is_reminder']:
                naive_deadline = datetime.fromisoformat(reminder_data["deadline"])
                true_deadline = timezone.make_aware(naive_deadline)
                
                new_reminder = Reminder.objects.create(
                    title=reminder_data["title"],
                    deadline=true_deadline,
                    confidence_score=reminder_data["confidence_score"],
                    is_reminder=reminder_data["is_reminder"],
                    user=instance.notebook.user,
                    note=instance
                )
                
                print(new_reminder)
            
        except Exception as e:
           ValidationError("Unable to create reminder", e) 