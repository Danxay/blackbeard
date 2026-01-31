from database import SessionLocal
from models import Barber, Service, User, Booking, BookingStatus
from datetime import datetime, timedelta
import random

def seed_database():
    """Seed database with initial data"""
    db = SessionLocal()
    
    try:
        # Check if already seeded
        if db.query(Service).first():
            print("Database already seeded")
            return
            
        # Services
        services_data = [
            {
                "name": "Классическая стрижка",
                "description": "Стрижка машинкой и ножницами, укладка",
                "price": 2500,
                "duration": 45,
                "category": "haircut",
                "icon": "Scissors",
                "popular": True
            },
            {
                "name": "Фейд",
                "description": "Плавный переход от кожи",
                "price": 2800,
                "duration": 50,
                "category": "haircut",
                "icon": "Blend",
                "popular": False
            },
            {
                "name": "Кроп",
                "description": "Короткая текстурная стрижка",
                "price": 2500,
                "duration": 40,
                "category": "haircut",
                "icon": "Eraser",
                "popular": False
            },
            {
                "name": "Моделирование бороды",
                "description": "Стрижка и оформление бороды",
                "price": 1500,
                "duration": 30,
                "category": "beard",
                "icon": "Sparkles",
                "popular": False
            },
            {
                "name": "Королевское бритьё",
                "description": "Опасная бритва, горячие полотенца",
                "price": 2000,
                "duration": 40,
                "category": "beard",
                "icon": "Crown",
                "popular": True
            },
            {
                "name": "Стрижка + борода",
                "description": "Полный уход: стрижка и оформление бороды",
                "price": 3500,
                "duration": 75,
                "category": "complex",
                "icon": "Star",
                "popular": True
            },
            {
                "name": "Отец и сын",
                "description": "Две стрижки по специальной цене",
                "price": 4000,
                "duration": 90,
                "category": "complex",
                "icon": "Scissors",
                "popular": False
            },
            {
                "name": "Мытьё и укладка",
                "description": "Мытьё головы и стайлинг",
                "price": 800,
                "duration": 20,
                "category": "additional",
                "icon": "Droplets",
                "popular": False
            },
            {
                "name": "Камуфляж седины",
                "description": "Лёгкое тонирование",
                "price": 1500,
                "duration": 30,
                "category": "additional",
                "icon": "Wind",
                "popular": False
            },
        ]
        
        for s in services_data:
            db.add(Service(**s))
        
        # Барберы — реалистичные имена
        barbers_data = [
            {
                "name": "Артём",
                "role": "Топ-мастер",
                "rating": 4.9,
                "reviews_count": 347,
                "experience": "9 лет",
                "image": "/barbers/barber-1.png",
                "is_available": True
            },
            {
                "name": "Кирилл",
                "role": "Старший барбер",
                "rating": 4.8,
                "reviews_count": 264,
                "experience": "7 лет",
                "image": "/barbers/barber-2.png",
                "is_available": True
            },
            {
                "name": "Денис",
                "role": "Барбер",
                "rating": 4.7,
                "reviews_count": 189,
                "experience": "5 лет",
                "image": "/barbers/barber-3.png",
                "is_available": True
            },
            {
                "name": "Макс",
                "role": "Барбер",
                "rating": 4.6,
                "reviews_count": 124,
                "experience": "4 года",
                "image": "/barbers/barber-4.png",
                "is_available": True
            },
            {
                "name": "Егор",
                "role": "Младший барбер",
                "rating": 4.5,
                "reviews_count": 67,
                "experience": "2 года",
                "image": "/barbers/barber-5.png",
                "is_available": False
            }
        ]
        
        barbers = []
        for b in barbers_data:
            barber = Barber(**b)
            db.add(barber)
            barbers.append(barber)
        
        db.commit()  # Commit to get barber IDs
        
        # Create demo user for fake bookings
        demo_user = User(
            telegram_id=123456789,
            chat_id=123456789,
            first_name="Demo",
            last_name="User",
            username="demo_user"
        )
        db.add(demo_user)
        db.commit()
        
        # Get services for bookings
        services = db.query(Service).all()
        
        # Create demo bookings for the next 7 days
        # This makes the calendar look realistic with some occupied slots
        demo_bookings = []
        
        # Available time slots (30-min intervals)
        time_slots = [
            "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
            "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
            "20:00", "20:30", "21:00"
        ]
        
        # For each barber, create 2-4 bookings per day for next 7 days
        for day_offset in range(7):
            target_date = datetime.now() + timedelta(days=day_offset)
            
            for barber in barbers[:4]:  # Only available barbers
                # Random number of bookings per barber per day (2-4)
                num_bookings = random.randint(2, 4)
                
                # Pick random non-overlapping time slots
                used_slot_indices = set()
                
                for _ in range(num_bookings):
                    # Pick a random service
                    service = random.choice(services)
                    duration = service.duration
                    
                    # Calculate how many 30-min slots this service needs
                    slots_needed = (duration + 29) // 30
                    
                    # Find a starting slot that doesn't overlap
                    attempts = 0
                    while attempts < 20:
                        start_idx = random.randint(0, len(time_slots) - slots_needed)
                        
                        # Check if these slots are free
                        slot_indices = set(range(start_idx, start_idx + slots_needed))
                        if not slot_indices & used_slot_indices:
                            # Mark slots as used
                            used_slot_indices |= slot_indices
                            
                            # Create booking
                            booking = Booking(
                                user_id=demo_user.id,
                                barber_id=barber.id,
                                date=target_date,
                                time=time_slots[start_idx],
                                status=BookingStatus.CONFIRMED,
                                total_price=service.price,
                                total_duration=duration,
                                reminder_sent=True  # Don't send reminders for demo
                            )
                            db.add(booking)
                            demo_bookings.append(booking)
                            break
                        
                        attempts += 1
        
        db.commit()
        print(f"Database seeded successfully! Created {len(demo_bookings)} demo bookings.")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
