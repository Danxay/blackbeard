from database import SessionLocal
from models import Barber, Service

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
        
        for b in barbers_data:
            db.add(Barber(**b))
        
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
